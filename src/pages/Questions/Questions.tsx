import { QuestionsDto } from "@/dto/QuizDto";
import React from "react";
import { useLoaderData } from "react-router-dom";

const Questions = () => {
  const questions = useLoaderData() as QuestionsDto[];
  return (
    <>
      <h1>Questions</h1>
      <ol>
        {questions.map((question) => {
          return (
            <li key={question.id}>
              <strong>{question.question}</strong>
              <p>{question.answer}</p>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default Questions;
