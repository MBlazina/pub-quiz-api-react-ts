import { deleteQuiz } from "@/api/quiz-Api";
import { QuizDto } from "@/dto/QuizDto";
import { Link } from "react-router-dom";
import { Outlet, useLoaderData } from "react-router-dom";
import { QuizzesStyled } from "./Quizzes.style";

const Quizzes = () => {
  const quizzes = useLoaderData() as QuizDto[];

  return (
    <>
      <h1>
        Quizzes{" "}
        <Link to="create" role="button">
          New
        </Link>
      </h1>

      <QuizzesStyled>
        {quizzes.map((quiz: QuizDto) => {
          return (
            <li key={quiz.id} data-tooltip="Click to edit Quiz">
              <Link key={quiz.id} to={`${quiz.id}/edit`} data-target="modal-element" className="quiz-title">
                <strong>{quiz.name}</strong>
              </Link>

              <a href="#" role="button" onClick={() => deleteQuiz(quiz.id)}>
                DELETE
              </a>
              <Link role="button" to={quiz.id.toString()}>
                START QUIZ
              </Link>
            </li>
          );
        })}
      </QuizzesStyled>
      <Outlet />
    </>
  );
};

export default Quizzes;
