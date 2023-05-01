import { deleteQuiz } from "@/api/quiz-Api";
import { QuizDto } from "@/dto/QuizDto";
import { Link, useParams, useRouteError } from "react-router-dom";
import { Outlet, useLoaderData } from "react-router-dom";

const Quizzes = () => {
  const quizzes = useLoaderData() as QuizDto[];
  const deleteSelected = (id) => {
    deleteQuiz(id);
  };
  return (
    <>
      <h1>Quizzes</h1>
      <Link to="create" role="button">
        Create Quiz
      </Link>
      <ul>
        {quizzes.map((quiz: QuizDto) => {
          return (
            <li key={quiz.id}>
              <Link key={quiz.id} to={`${quiz.id}/edit`} data-target="modal-element">
                {quiz.name}
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
      </ul>
      <Outlet />
    </>
  );
};

export default Quizzes;
