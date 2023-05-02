import "@picocss/pico";

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Quizzes from "./pages/Quizzes/Quizzes";
import { getQuestions, getQuizzes, quizDetailLoader } from "./api/quiz-Api";
import QuizDetail from "./pages/Quizzes/QuizDetail";
import ErrorPage from "./pages/ErrorPage";
import QuizEdit from "./pages/Quizzes/QuizEdit";
import QuizCreate from "./pages/Quizzes/QuizCreate/QuizCreate";
import Questions from "./pages/Questions/Questions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />}></Route>
      <Route path="quizzes" element={<Quizzes />} loader={getQuizzes}>
        {/*  <Route index element={<Quizzes />} loader={getQuizzes}>        </Route> */}
        <Route path=":id/edit" element={<QuizEdit />} loader={quizDetailLoader}></Route>
      </Route>

      <Route path="quizzes/:id" element={<QuizDetail />} loader={quizDetailLoader}></Route>
      <Route path="quizzes/create" element={<QuizCreate />} loader={getQuestions} />
      <Route path="questions" element={<Questions />} loader={getQuestions}></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
