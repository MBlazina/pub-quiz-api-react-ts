import { QuizDto } from "@/dto/QuizDto";
import { QuizzListingItemStyled } from "./QuizzesListingItem.style";

const QuizzesListingItem = ({ id, name }: QuizDto) => {
  const handleDeleteQuiz = (id: number) => {
    console.log(id);
  };
  return (
    <QuizzListingItemStyled key={id}>
      {name}
      <a href="#" role="button" onClick={() => handleDeleteQuiz(id)}>
        Delete
      </a>
      <a href="#" role="button">
        START
      </a>
    </QuizzListingItemStyled>
  );
};

export default QuizzesListingItem;
