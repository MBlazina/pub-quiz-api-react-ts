import { addQuiz, getQuizzes } from "@/api/quiz-Api";
import { QuestionsDto } from "@/dto/QuizDto";
import { generateUniqueIdCheckArray } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { QuizCreateStyled } from "./QuizCreate.style";

const QuizCreate = () => {
  const formRef = useRef(null);
  const form = formRef.current;
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

  async function validateQuestions(array: QuestionsDto[], inputFieldValue, index: number) {
    /* const questionsInputs: HTMLInputElement[] = Array.from(form.querySelectorAll("input[name^='question-']"));
    const answersInputs: HTMLInputElement[] = Array.from(form.querySelectorAll("input[name^='answer-']")); */
    /*  const currentQuestionValue = inputField.target.value; */ /* WHAT IS... */
    /* const currentQuestionName = inputField.target.name; */ /* question-1 */
    /* const currentAnswer = document.querySelector(`[name="answer-${currentQuestionName}"]`); */ /* answer-question-1 */
    /* const currentAnswerValue = currentAnswer.value; */

    /* MATCHING ANSWER INPUT ELEMENT */
    const answer = document.querySelector(`[name="answer-${index + 1}"]`);
    /* MATCHING QUESTION ID ELEMENT */
    const questionId = document.querySelector(`[name="id-question-${index + 1}"]`) as HTMLInputElement;
    /* const newQuestionsArray = []; */
    for (var i = 0; i < array.length; i++) {
      /* IF EXISTING QUESTION */
      if (array[i].question === inputFieldValue) {
        /* SET QUESTION ID FROM DB */
        questionId.value = array[i].id;
        /* SET MATCHING ANSWER AND DISABLE INPUT*/
        answer?.setAttribute("value", array[i].answer);
        answer?.setAttribute("disabled", "");

        return true;
      } else {
        /* IF NEW QUESTION */
        /* GET ELEMENTS */
        const questionsIDsElements = document.querySelectorAll(`[name^="id-question-"]`);
        /* CONVERT TO ARRAY */
        const questionsIDsArray = [];

        /* GET VALUES */
        for (let i = 0; i < questionsIDsElements.length; i++) {
          questionsIDsArray.push(questionsIDsElements[i].value);
        }

        const questionsIDsinDB = allQuestions.map((question) => {
          return question.id;
        });

        const allIDs: any = questionsIDsArray.concat(questionsIDsinDB);

        /* GENERAT UNIQUE ID THAT IS NOT ALREADY IN FORM OR DB */
        questionId.value = parseInt(await generateUniqueIdCheckArray(allIDs));

        /* ENABLE AND CLEAR MATCHING ANSWER FIELD */
        answer?.setAttribute("value", "");
        answer?.removeAttribute("disabled");
      }
    }
    return false;
  }

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    validateQuestions(allQuestions, event.target.value, index);
  };

  const [quizName, setQuizName] = useState();

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;

    const questionsIDInputs: HTMLInputElement[] = Array.from(form.querySelectorAll("input[name^='id-question-']"));
    const questionsInputs: HTMLInputElement[] = Array.from(form.querySelectorAll("input[name^='question-']"));
    const answersInputs: HTMLInputElement[] = Array.from(form.querySelectorAll("input[name^='answer-']"));

    let questionsArray = [];
    for (let i = 0; i < questionsInputs.length; i++) {
      questionsArray.push({ id: questionsIDInputs[i].value, question: questionsInputs[i].value, answer: answersInputs[i].value });
    }

    const dataToSubmit = {
      id: await generateUniqueIdCheckArray(await getQuizzes()),
      name: quizName,
      questions: questionsArray,
    };

    addQuiz(dataToSubmit, questionsArray);
  };

  useEffect(() => {
    handleAdd();
  }, []);

  return (
    <QuizCreateStyled>
      <datalist id="list">
        {allQuestions.map((question) => (
          <option value={question.question} key={question.id}></option>
        ))}
      </datalist>

      <h1>New Quiz</h1>
      <Form method="post" action="/quizzes/create" ref={formRef} onSubmit={handleQuizSubmit}>
        <label htmlFor="quiz-name">Quiz Name</label>
        <input type="text" name="name" onChange={(event) => setQuizName(event.target.value)} autoComplete="off" />
        <h2>Questions</h2>
        {inputs.map((input, index) => {
          return (
            <div key={index} className="question">
              <label htmlFor={`question-${index + 1}`}>
                <a href="#" role="button" onClick={() => handleDelete(index)}>
                  X
                </a>
                <h3>Question {index + 1}</h3>
              </label>
              <input type="number" name={`id-question-${index + 1}`} style={{ display: "none" }} />
              <input type="text" name={`question-${index + 1}`} list="list" autoComplete="off" onChange={(event) => handleQuestionChange(event, index)} />
              <label htmlFor={`answer-${index + 1}`}>Answer {index + 1}</label>
              <input type="text" name={`answer-${index + 1}`} />
            </div>
          );
        })}
        <a href="#" role="button" onClick={handleAdd} className="add-question">
          Add question
        </a>

        <button type="submit">Create Quiz</button>
      </Form>
    </QuizCreateStyled>
  );
};

export default QuizCreate;
