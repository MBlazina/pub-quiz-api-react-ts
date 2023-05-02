import { Link } from "react-router-dom";
import { HomeStyled } from "./Home.style";

const Home = () => {
  return (
    <HomeStyled>
      <h1>Pub Quiz</h1>
      <section className="intro">
        <p>This is a project for a way to create pub quizes saved to a database and with the possibility to reuse old questions for new Quizes.</p>
        <p>For a quick start it is possible to view already created quizes or create a new quiz with the links below or with the header navigation links</p>
        <div className="links">
          <Link to="/quizzes" role="button">
            View Quizes
          </Link>
          <Link to="/quizzes/create" role="button">
            New Quiz
          </Link>
        </div>
      </section>
    </HomeStyled>
  );
};

export default Home;
