import { QuizDto } from "@/dto/QuizDto";
import { Outlet, useLoaderData } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { QuizDetailStyled } from "./QuizDetail.style";
import { useState } from "react";

const QuizDetail = () => {
  const quiz = useLoaderData() as QuizDto;
  const questions = quiz.questions;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleChangeSlide = (e) => {
    console.log((100 / questions.length) * (e + 1));
    setProgress((100 / questions.length) * (e + 1));
  };
  const [progress, setProgress] = useState(100 / questions.length);

  return (
    <QuizDetailStyled>
      <h1>{quiz.name}</h1>

      <progress value={progress} max="100"></progress>
      <Slider {...settings} afterChange={(e) => handleChangeSlide(e)}>
        {questions.map((item, index) => {
          return (
            <div key={item.id}>
              <h3>
                Question {index + 1} of {questions.length}
              </h3>

              <p>
                <strong>{item.question}</strong>
              </p>
              <details role="button">
                <summary>Show Answer</summary>
                <p>{item.answer}</p>
              </details>
            </div>
          );
        })}
      </Slider>
    </QuizDetailStyled>
  );
};

export default QuizDetail;
