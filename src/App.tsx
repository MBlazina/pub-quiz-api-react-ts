import "@picocss/pico";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [quizes, setQuizes] = useState({});
  const API = import.meta.env.VITE_API_QUIZES;
  const fetchData = async () => {
    console.log("fetch: " + API);
    const request = await fetch(API);
    const data = await JSON.stringify(request);
    setQuizes(data);
    console.log(request);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <header>header</header>
      <main className="container">
        <h1>Pub Quiz</h1>
        <p></p>
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
