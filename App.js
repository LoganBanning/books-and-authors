import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

const books = {
  title: 'The Lord Of The Flies',
  id: 4345,
  description: "William Golding's 1954 novel Lord of the Flies tells the story of a group of young boys who find themselves alone on a deserted island",
  authors: [
    123,
    456
  ]
 }
// {
//   title: 'Harry Potter',
//   id: 4346,
//   description: "Magical kid",
//   authors: [
//     234,
//     567
//   ]
// },
// {
//   title: 'Money Moves',
//   id: 4347,
//   description: "Making money moves",
//   authors: [
//     879,
//     637
//   ]
// }]

const authorInfo = {
  id: 456,
  firstName: 'Joshua',
  lastName: 'Beatty'
}

const FetchData = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [author, setAuthor] = useState([]);

  const handleSearch = () => {
    try {
      axios.post('https://ejditq67mwuzeuwrlp5fs3egwu0yhkjz.lambda-url.us-east-2.on.aws/api/books/search', {
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          "title": `${search}`
        }
      }).then((res) => {
        setResult(res.data);
      })
      axios.get(`https://ejditq67mwuzeuwrlp5fs3egwu0yhkjz.lambda-url.us-east-2.on.aws/api/authors/:${result.authors[0]}`, {
        headers: {
          "Content-Type": 'application/json'
        }
      }).then((res) => {
        setAuthor(res.data);
      })
    } catch (err) {
      setResult(books);
      setAuthor(authorInfo);
      setSearch('');
    }
  }
  console.log(result);
  console.log(author);

  return (
    <div className='main-page'>
      <div className='search-container'>
        <h1>Books and Authors</h1>
        <input type='text' 
        placeholder='Search' 
        onChange={(e) => setSearch(e.target.value)}></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className='author-info'>
        <h2>{result.title}</h2>
        <div>{result.description}</div>
        <h3>{author.firstName} {author.lastName}</h3>
      </div>
    </div>
  )
}

export default FetchData;
