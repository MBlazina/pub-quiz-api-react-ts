import { useEffect, useState } from "react";
// COMPONENTS
import Modal from "@/components/modal/Modal";
//API
import { getQuizzes, deleteQuiz } from "@/api/quiz-Api";
import { QuizzListingStyled } from "./QuizzesListing.style";
import QuizzesListingItem from "../QuizzesListingItem/QuizzesListingItem";

export type Quiz = {
  id: number;
  name: string;
  questions: [];
};
const QuizzesListing = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>();
  const fetchQuizzes = async () => {
    setQuizzes(await getQuizzes());
  };
  useEffect(() => {
    fetchQuizzes().catch((error) => {
      console.error(error);
    });
  }, []);

  const handleQuizDelete = async () => {
    await deleteQuiz(5);
    fetchQuizzes();
  };

  return (
    <>
      <h1>Quiz list</h1>
      <button onClick={handleQuizDelete}>delete</button>
      <QuizzListingStyled>
        {quizzes &&
          quizzes.map((quiz) => {
            return <QuizzesListingItem {...quiz} key={quiz.id} />;
          })}
      </QuizzListingStyled>

      <Modal>
        <p>Modal test</p>
      </Modal>
    </>
  );
};

export default QuizzesListing;
