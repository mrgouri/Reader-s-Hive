import React, {useState, useEffect} from 'react';
import { useUser } from '../../UserContext';
import Axios from "axios";
import Card from '../Card.jsx';

function Profile() {
    const { user,setUser} = useUser();
    const personalDetails = {
        name: user.fullname,
        email: user.email,
        address:user.address
    };
   
    const [soldBooks, setSoldBooks] = useState([]);
    const[bmkbook, setBmkbook] =useState([]);
    const[seeBookmark, setSeeBookmark] =useState(false);
    useEffect(() => {
      const sold = async () => {
        if (!user) return; 
        try {
          const response = await Axios.get(`http://localhost:3000/book/userSold?userSold=${user._id}`); 
          setSoldBooks(response.data);
        } catch (error) {
          console.error('Error while books!!', error);     
        }
      };
      sold();
    }, [user]);

    useEffect(() => {
      const seeBmk = async () => {
        if (!user) return; 
        try {
          
          const response = await Axios.get(`http://localhost:3000/book/getBmk?ids=${user.bookmark.join(',')}`);
          setBmkbook(response.data);
        } catch (error) {
          console.error('Error while books!!', error);     
        }
      };
      seeBmk();
    }, [user]);

const [addr,setAddr]= useState('');
const addrChange= (event) =>{
  if (event.target.value !== '') {
    setAddr(event.target.value);
  }
}

const handleChange = async () => {
  try {
      // Send request to backend to update buyer ID and isSold value
      const response = await Axios.put(`http://localhost:3000/user/addr`,{
          userId: user._id,
          address: addr});

          const newUser={...user, address: response.data.address};
          localStorage.setItem("Users", JSON.stringify(newUser));
          setUser(newUser);
  } catch (error) {
      console.error('Error:', error);
  }
};

  const handleSoldMark = async (book) => {
    try {
      const response = await Axios.put(`http://localhost:3000/book/setSold`, {
       
        bookId: book._id
        
      });     
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-yellow-700 shadow-lg rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <div>
                        <h2 className="text-3xl text-black font-bold">{personalDetails.name}</h2>
                        <p className="text-black">{personalDetails.email}</p>
                        <p className="text-black">{personalDetails.address}</p>
                    </div>
                </div>
                <div>Add/Edit Contact Details:
                  <input onChange={addrChange}/>
                  <button onClick={handleChange}>Add</button>
                </div>
                <div className="flex flex-wrap justify-around">
                <div>
                    <h3 className="text-2xl text-black font-semibold mb-4">Sold Books</h3>
                    <div className="text-black  p-2 rounded-md">
                    {soldBooks.map((book, index) => (                          
                           book.isSold === 1 && <div key={index} className="text-xl bg-yellow-800 p-3 m-3 text-black">{book.title} </div>
                                                 
                        ))}
                    </div>
                </div>

                <div>
        <h3 className="text-2xl text-black font-semibold mb-4">Put up for Selling</h3>
        <div>
            {soldBooks.map((book, index) => (
                book.isSold === 0 && (
                  <div className="text-xl text-black bg-yellow-800 p-3 m-3">
                    <div key={index} className="flex items-center space-x-4 mb-2"> {/* Ensure this div has flex properties */}
                        <p className="text-xl text-black">{book.title}</p>
                       
                        <button className="bg-orange-800 btn btn-sm" onClick={() => handleSoldMark(book)}>Mark as Sold</button>
                        </div>
                        <div className="text-black">
                          <h3 className="text-lg">Contact Interested Buyers</h3>
                          <ol className="text-base list-decimal mx-px">
                        {book.address.map((addr, idx) => <li key={idx}>{addr}</li>)} 
                    </ol>
                          </div>
                    </div>
                )
            ))}
        </div>
    </div>
</div>
                <button className="bg-yellow-900 text-white px-2 py-1 rounded-md" onClick={()=>setSeeBookmark(!seeBookmark)}>{!seeBookmark ? "Show Bookmarked" : "Hide Bookmarked"}</button>
                {seeBookmark &&  <div className="flex flex-wrap justify-center">
                  {bmkbook.map((book)=>{
                  return (<Card book={book}></Card>)
                  })}
                  </div>}
            </div>
        </div>
    );
}

export default Profile;
