import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [bookNameText, setBookNameText] = useState("");
  const [bookName, setBookName] = useState([]);

  const handleBookName = (event) => {
    setBookNameText(event.target.value);
  };

  const getBookNameData = async () => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookNameText}`)
    setBookName(response.data.items)
    console.log(response.data)
  }

  useEffect (() => {
    getBookNameData();
  }, [bookNameText])

  return (
    <div className="App">
      {
        <div className="message-input-container">
          <h1 className="heading">Find a Book</h1>
          <label>
            <input
              id="message-text"
              name="message-text"
              type="text"
              value={bookNameText}
              placeholder="Enter Book Name here"
              onChange={handleBookName}
            />
          </label>
          <ul>          
              {bookName.map((book) => {
                return(<li key={book.id}>{book.volumeInfo.title}</li>)
              })}     
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
