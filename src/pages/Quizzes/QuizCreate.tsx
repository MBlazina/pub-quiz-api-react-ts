import { addQuiz } from "@/api/quiz-Api";
import { QuestionsDto } from "@/dto/QuizDto";
import { useEffect, useRef, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

const QuizCreate = () => {
  const allQuestions = useLoaderData() as QuestionsDto[];
  const [inputs, setInputs] = useState([[]]);

  const handleAdd = () => {
    const newInputs = [...inputs, []];
    setInputs(newInputs);
  };
  const handleDelete = (index: number) => {
    const deleteValue = [...inputs];
    deleteValue.splice(index, 1);
    setInputs(deleteValue);
  };
  /*  const handleOpenQuestions = () => {}; */
  function containsValue(array: QuestionsDto[], value: string, index: number) {
    for (var i = 0; i < array.length; i++) {
      /* for (var key in array[i]) { */
      const answer = document.querySelector(`[name="answer-${index + 1}"]`);
      if (array[i].question === value) {
        answer?.setAttribute("value", array[i].answer);
        answer?.setAttribute("disabled", "");
        answer;

        return true;
      } else {
        answer?.setAttribute("value", "");
        answer?.removeAttribute("disabled");
      }
      /*  } */
    }
    return false;
  }

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const isQuestionDuplicate = containsValue(allQuestions, event.target.value, index);
    if (isQuestionDuplicate) {
      console.log(event.target);
      console.log(isQuestionDuplicate);
      event.target.classList.add("existing");
    } else {
      event.target.classList.remove("existing");
    }
  };

  const [quizName, setQuizName] = useState();

  function generateRandom64BitInt() {
    const randomInt = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    console.log("random: " + randomInt);
    return randomInt;
  }

  async function generateUniqueQuizId() {
    const response = await fetch("http://localhost:3004/quizzes/");
    const quizzes = await response.json();
    let newId = generateRandom64BitInt().toString();
    while (quizzes.some((quiz: any) => quiz.id === newId)) {
      newId = generateRandom64BitInt().toString();
    }
    console.log(newId);
    return newId;
  }

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;

    const questionsInputs: HTMLInputElement[] = Array.from(form.querySelectorAll("input[name^='question-']"));
    const answersInputs: HTMLInputElement[] = Array.from(form.querySelectorAll("input[name^='answer-']"));

    let questionsArray = [];
    for (let i = 0; i < questionsInputs.length; i++) {
      questionsArray.push({ question: questionsInputs[i].value, answer: answersInputs[i].value });
    }

    const dataToSubmit = {
      id: parseInt(await generateUniqueQuizId()),
      name: quizName,
      questions: questionsArray,
    };
    console.log("data");
    console.log(dataToSubmit);
    addQuiz(dataToSubmit);
  };

  const formRef = useRef(null);

  useEffect(() => {
    handleAdd();
  }, []);

  return (
    <>
      <datalist id="list">
        {allQuestions.map((question) => (
          <option value={question.question} key={question.id}></option>
        ))}
      </datalist>

      <h1>New Quiz</h1>
      <Form method="post" action="/quizzes/create" ref={formRef} onSubmit={handleQuizSubmit}>
        <label htmlFor="quiz-name">Quiz Name</label>
        <input type="text" name="name" onChange={(event) => setQuizName(event.target.value)} />
        <h2>Questions</h2>
        {inputs.map((input, index) => {
          return (
            <div key={index}>
              <label htmlFor={`question-${index + 1}`}>
                <a href="#" role="button" onClick={() => handleDelete(index)}>
                  X
                </a>
                <h3>Question {index + 1}</h3>
              </label>
              <input type="text" name={`question-${index + 1}`} list="list" autoComplete="off" onChange={(event) => handleQuestionChange(event, index)} />
              <label htmlFor={`answer-${index + 1}`}>Answer {index + 1}</label>
              <input type="text" name={`answer-${index + 1}`} />
            </div>
          );
        })}
        <a href="#" role="button" onClick={handleAdd}>
          Add question
        </a>

        <button type="submit">Create</button>
      </Form>
    </>
  );
};

export default QuizCreate;

export const action = async ({ request }: any) => {
  const data = Object.fromEntries(await request.formData());
  console.log(data);

  /*   const data = await request.formData();
  const submit = {
    name: data.name,
    question: data.question,
    answer: data.answer,
  }; */

  return data;
};
