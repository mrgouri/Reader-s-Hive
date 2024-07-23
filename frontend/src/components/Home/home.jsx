import Card from '../Card.jsx';
import Hero from './Hero.jsx';
import Footer from './Footer.jsx';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Home () {
    // const [books, setBooks] = useState([]);
    // useEffect(() => {
    //     // Fetch data when the component mounts
    //     async function fetchData() {
    //         try {
    //             const response = await axios.get('http://localhost:3000/book');
    //             setBooks(response.data);
            
    //             console.log(books[5].title);
            
    //         } catch (error) {
    //             console.error('Error fetching books:', error);
    //         }
    //     }
    //     fetchData();
    // }, []);
    return (
        <>
        <Hero/>
        <h1 className=" text-center text-4xl text-white font-medium mb-4">For Readers by Readers</h1>
        <h1 className=" text-center text-4xl text-white font-medium mb-4">Buy, Sell, Explore ...</h1>
    {/* <div className="flex flex-wrap justify-center">
      {books.slice(0, 4).map((book, index) => (
       
              <Card book={book}/>
            
            ))}  
        </div> */}
        <Footer/>
        </>
    )
}

export default Home;