import styled from "styled-components";

export const QuizCreateStyled = styled.div`
  .question {
    border: 1px solid lightgray;
    padding: 15px;
    margin-bottom: 15px;
  }
  label {
    display: flex;
    gap: 15px;
    > a {
      align-self: center;
    }
  }
  .add-question {
    margin-bottom: 15px;
  }
`;
