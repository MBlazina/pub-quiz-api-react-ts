import { QuizDto } from "@/dto/QuizDto";
import { Outlet, useLoaderData } from "react-router-dom";

const QuizDetail = () => {
  const quiz = useLoaderData() as QuizDto;

  return (
    <>
      <h1>{quiz.name}</h1>
      <Outlet />
    </>
  );
};

export default QuizDetail;
