import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="container">
        <Link to="/">HOME</Link>
        <ul>
          <li>
            <NavLink to="/quizzes">Quizzes</NavLink>
          </li>
          <li>
            <NavLink to="/questions">Questions</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
