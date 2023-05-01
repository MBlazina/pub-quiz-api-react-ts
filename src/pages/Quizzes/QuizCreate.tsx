import { addQuiz, getQuizzes } from "@/api/quiz-Api";
import { QuestionsDto } from "@/dto/QuizDto";
import { generateUniqueIdCheckArray } from "@/utils/utils";
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

  async function questionAlreadyInDB(array: QuestionsDto[], inputFieldValue: string, index: number) {
    /* MATCHING ANSWER INPUT ELEMENT */
    const answer = document.querySelector(`[name="answer-${index + 1}"]`);
    /* MATCHING QUESTION ID ELEMENT */
    const questionId = document.querySelector(`[name="id-question-${index + 1}"]`) as HTMLInputElement;

    for (var i = 0; i < array.length; i++) {
      /* EXISTING QUESTION */
      if (array[i].question === inputFieldValue) {
        /* SET QUESTION ID FROM DB */
        questionId.value = array[i].id;
        /* SET MATCHING ANSWER AND DISABLE INPUT*/
        answer?.setAttribute("value", array[i].answer);
        answer?.setAttribute("disabled", "");

        return true;
      } else {
        /* NEW QUESTION */
        const questionsIDsElements = document.querySelectorAll(`[name^="id-question-"]`);
        /* CONVERT TO ARRAY */
        const questionsIDsArray = [];
        for (let i = 0; i < questionsIDsElements.length; i++) {
          questionsIDsArray.push(questionsIDsElements[i].value);
        }
        /* questionsIDsArray = Array.from(questionsIDsElements); */
        const questionsIDsinDB = allQuestions.map((question) => {
          return question.id;
        });

        const allIDs = questionsIDsArray.concat(questionsIDsinDB);
        console.log(allIDs);
        const uniqueQuestionID = await generateUniqueIdCheckArray(allIDs);
        console.log(uniqueQuestionID);
        questionId.value = parseInt(uniqueQuestionID);
        console.log(questionId.value);
        answer?.setAttribute("value", "");
        answer?.removeAttribute("disabled");
      }
    }
    return false;
  }
  const [questions, setQuestions] = useState([]);
  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const isQuestionDuplicate = questionAlreadyInDB(allQuestions, event.target.value, index);
    if (isQuestionDuplicate) {
      event.target.classList.add("existing");
    } else {
      event.target.classList.remove("existing");
    }
  };

  const [quizName, setQuizName] = useState();

  /*   function generateRandom64BitInt() {
    const randomInt = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    console.log("random: " + randomInt);
    return randomInt;
  }

  async function generateUniqueQuizId() {
    const quizzes = await getQuizzes();
    let newId = generateRandom64BitInt().toString();
    while (quizzes.some((quiz: any) => quiz.id === newId)) {
      newId = generateRandom64BitInt().toString();
    }
    console.log(newId);
    return newId;
  } */

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
      id: await generateUniqueIdCheckArray(await getQuizzes()),
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
              <label htmlFor={`question-${index + 1}-id`}>id</label>
              <input type="number" name={`id-question-${index + 1}`} />
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
