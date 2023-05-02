import styled from "styled-components";

export const QuizzesStyled = styled.ul`
  padding: 0;
  li {
    list-style: none;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 15px;
    &:nth-of-type(odd) {
      background: #f7f7f7;
    }
    &:hover {
      background: lightgray;
    }
    .quiz-title {
      flex: 1;
      align-self: stretch;
      display: flex;
      align-items: center;
    }
  }
`;
