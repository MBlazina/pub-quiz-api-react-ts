import "@picocss/pico";
import "./App.css";
import QuizzesListing from "@/components/quizzesListing/QuizzesListing";

function App() {
  return (
    <>
      <header className="container-fluid">header</header>
      <main className="container">
        <h1>Pub Quiz</h1>
        <QuizzesListing />
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
