import { QuestionsDto, QuizDto } from "@/dto/QuizDto";

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

export const createQuiz = async ({ request }: any) => {
  const data = await request.formData();

  return data;
};

export const quizDetailLoader = async ({ params }: any) => {
  const { id } = params;
  const response = await fetch(fetchURL + id);
  return response.json();
};

async function addQuestions(newQuestion: QuestionsDto) {
  // Check if the question already exists in the DB
  const response = await fetch(questionsUrl);
  const existingQuestions = await response.json();
  const exists = existingQuestions.some((question: any) => question.id === newQuestion.id);

  // Post the data if it doesn't already exist in the DB
  if (!exists) {
    const postResponse = await fetch(questionsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });
    if (!postResponse.ok) {
      throw new Error("Failed to post data to API");
    }
  }
}

export async function addQuiz(data: QuizDto, questions: QuestionsDto) {
  await fetch(fetchURL, {
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
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  for (let i = 0; i < questions.length; i++) {
    await addQuestions(questions[i]);
  }
}

export async function deleteQuiz(id: number) {
  await fetch(`${fetchURL}/${id}`, { method: "DELETE" });
  const response = await fetch(fetchURL);
  const body = await response.json();
  return body;
}
