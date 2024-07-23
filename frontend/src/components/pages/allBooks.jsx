import React from 'react';
import {useState, useEffect} from 'react';
import Card from '../Card.jsx';
import axios from 'axios';
function Allbooks() {
    const [books, setBooks] = useState([]);
    useEffect(() => {

        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/book');
                setBooks(response.data);
            
                console.log(books[5].title);
            
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }
        fetchData();
    }, []);
    return(
<>
<h1 className="text-center text-3xl">Explore..!</h1>
<div className="flex flex-wrap justify-center">
{books.map((book, index) => (
  book.isSold === 0 && <Card book={book} /> // Only render if book.isSold is 0
))}
        </div>
</>
    );
};

export default Allbooks;