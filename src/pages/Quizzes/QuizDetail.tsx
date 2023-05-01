import { QuizDto } from "@/dto/QuizDto";
import { Outlet, useLoaderData, useParams } from "react-router-dom";

const QuizDetail = () => {
  const { id } = useParams();
  const quiz = useLoaderData() as QuizDto;

  return (
    <>
      <h1>{quiz.name}</h1>
      <Outlet />
    </>
  );
};

export default QuizDetail;
