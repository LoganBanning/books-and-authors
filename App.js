import { useState } from "react";
import axios from "axios";
import "./App.css";

const FetchData = () => {
  const [search, setSearch] = useState("");
  const [book, setBook] = useState({});
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setBook({});
    setAuthors([]);
    bookSearch();
    authorSearch();
    setSearch("");
  };

  const bookSearch = () => {
    try {
      axios
        .post(
          "https://ejditq67mwuzeuwrlp5fs3egwu0yhkjz.lambda-url.us-east-2.on.aws/api/books/search",
          {
            headers: {
              "Access-Control-Allow-Headers": "true",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
            data: {
              title: `${search}`,
            },
          }
        )
        .then((res) => {
          setBook(res.data);
        });
    } catch (err) {
      setError("Book Not Found");
    }
  };

  const authorSearch = () => {
    if(book.authors && book.authors.length > 0){
      book.authors.forEach((id) => {
        try {
          axios
            .get(
              `https://ejditq67mwuzeuwrlp5fs3egwu0yhkjz.lambda-url.us-east-2.on.aws/api/authors/${id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              setAuthors([...authors, res.data]);
            });
        } catch (err) {
          setError("Author Not Found");
        }
      });
    };
    }; 

  return (
    <div className="main-page">
      <div className="search-container">
        <h1>Books and Authors</h1>
        <input
          type="text"
          placeholder="Search Books"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="author-info">
        <h2>{book.title}</h2>
        <div>{book.description}</div>
          {authors.map(({firstName, middleInitial, lastName}) => {
            return (
              <h3>{firstName} {middleInitial ?? ''} {lastName}</h3>
            )
          })}
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default FetchData;
