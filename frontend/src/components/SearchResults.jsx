import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from './Card.jsx';

function SearchResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      axios.get(`http://localhost:3000/book/search?query=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {results.map((book) => (
            book.isSold === 0 && <Card book={book}></Card>
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default SearchResults;
