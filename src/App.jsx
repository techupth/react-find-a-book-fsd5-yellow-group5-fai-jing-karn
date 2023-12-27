import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchingInput, setSearchingInput] = useState("");
  const [searchingResult, setSearchingResult] = useState([]);

  const getBooks = async () => {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchingInput}`
    );
    // เก็บผลจาก searchingInput ไว้ใน searchingResault ต้วยการ execute setSearchingResult
    setSearchingResult(result.data.items);
    console.log(result.data);
  };

  useEffect(() => {
    getBooks();
  }, [searchingInput]);

  return (
    <>
      <div className="App">
        <h1 className="heading">Find a Book</h1>
        <div className="input-container">
          <input
            id="searching-box"
            type="text"
            value={searchingInput}
            onChange={(event) => setSearchingInput(event.target.value)}
          />
        </div>
        <div className="searching-result">
          <ul>
            {searchingResult.map((book) => (
              <li key={book.id}>{book.volumeInfo.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
