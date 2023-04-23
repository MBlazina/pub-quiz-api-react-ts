import { useEffect, useState } from "react";
import Modal from "@/components/modal/Modal";

export type Quiz = {
  id: number;
  name: string;
  questions: [];
};
const QuizzesListing = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>();
  useEffect(() => {
    /*  fetch(import.meta.env.VITE_API_QUIZZES) */

    fetch("http://localhost:3000/quizzes")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setQuizzes(res);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <>
      <h1>Quiz list</h1>
      <ul>
        {quizzes &&
          quizzes.map((quiz) => {
            return <li key={quiz.id}>{quiz.name}</li>;
          })}
      </ul>
      <Modal>
        <p>Modal test</p>
      </Modal>
    </>
  );
};

export default QuizzesListing;
