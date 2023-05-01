import Modal from "@/components/modal/Modal";
import { QuizDto } from "@/dto/QuizDto";
import { useLoaderData, useNavigate } from "react-router-dom";

const QuizEdit = () => {
  const quiz = useLoaderData() as QuizDto;
  return (
    <Modal fromURL={window.location.pathname}>
      <h2>Editing: {quiz.name}</h2>
      {quiz.questions.map((item) => {
        return <p key={item.id}>{item.question}</p>;
      })}
    </Modal>
  );
};

export default QuizEdit;
