import { QuizDto } from "@/dto/QuizDto";

const fetchURL = import.meta.env.VITE_API_QUIZZES;

export async function getQuizzes() {
  const response = await fetch(fetchURL);
  if (!response.ok) {
    throw { message: "Failed to load Quizzes" };
  }
  const body = await response.json();

  return body;
}

const questionsUrl = import.meta.env.VITE_API_QUESTIONS;

export async function getQuestions() {
  const response = await fetch(questionsUrl);
  const body = await response.json();
  return body;
}

export const createQuiz = async ({ request }) => {
  const data = await request.formData();
  const submission = {
    name: data.name,
  };

  return data;
};
/* export const careerDetailLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch("http://localhost:3000/careers/" + id);
  return res.json();
}; */

/* export const quizDetailLoader = async (id: string) => {
  const response = await fetch(fetchURL + id.toString());
  console.log(fetchURL + id);
  return response.json();
}; */
export const quizDetailLoader = async ({ params }) => {
  const { id } = params;
  const response = await fetch(fetchURL + id);
  return response.json();
};
export async function addQuiz(data) {
  /* await fetch(fetchURL, { method: "POST" });
  const response = await fetch(fetchURL);
  const body = await response.json();
  return body; */

  fetch(fetchURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Process the response data
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
export async function deleteQuiz(id: number) {
  await fetch(`${fetchURL}/${id}`, { method: "DELETE" });
  const response = await fetch(fetchURL);
  const body = await response.json();
  return body;
}
