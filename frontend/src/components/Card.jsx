import React, { useState , useEffect} from 'react';
import Axios from 'axios';
import { useUser } from '../UserContext';

function Card(props) {
  const { user, setUser } = useUser();
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [ismark, setIsmark ]= useState(false);
  
 
  
  useEffect(()=>{
    setIsmark((user.bookmark).includes(props.book._id));
  },[user])

  const handleBuyNow = async () => {
    if (!user?.address) {
      alert('Please add your address before buying a book. Go to your profile to update your address.');
      return; 
    }

    setConfirmationVisible(true);
  };
  const Bookmark = async () => {
    if(!(user.bookmark).includes(props.book._id)){try {
      const response = await Axios.put(`http://localhost:3000/user/bookmark`, {
        userId: user._id,
        bookId: props.book._id,
        
      });
      // const updatedbm= [...user.bookmark, props.book._id]
      // const updatedUser= {...user, bookmark: updatedbm };
      setUser({ ...user, bookmark: [...user.bookmark, props.book._id] });
      setIsmark(true);
      console.log("heeeeee");
      console.log(user);
    } catch (error) {
      console.error('Error:', error);
    }}
    else{
      try {
        const response = await Axios.put(`http://localhost:3000/user/bookmarkremove`, {
          userId: user._id,
          bookId: props.book._id,
          
        });
        const updatedbm= user.bookmark.filter((id)=>{ props.book._id!==id});
        // const updatedUser= {...user, bookmark: updatedbm };   
        // setUser(updatedUser);
        setUser({ ...user, bookmark: user.bookmark.filter((id) => props.book._id !== id) });
        setIsmark(false);
        console.log("...........");
        console.log(user);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
  };

    const handleConfirmPurchase = async () => {
    try {
      const response = await Axios.put(`http://localhost:3000/book/buy`, {
        userId: user._id,
        bookId: props.book._id,
        address: user.address
      });
      console.log(response.data); 
      setConfirmationVisible(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="card w-full sm:w-1/3 md:w-1/3 lg:w-1/4 bg-gray-800 shadow-xl m-4">
      <div className="card-body">
        <h2 className="card-title">{props.book.title}</h2>
        <p className="font-bold">Author: {props.book.author}</p>
        <p className="font-medium">Condition: {props.book.condition}</p>
        <p>{props.book.description}</p>
        <p className="font-bold text-xl">{props.book.price}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{props.book.genre}</div>
          <div className="badge badge-outline">{props.book.language}</div>
          <div className="badge badge-outline">{props.book.binding}</div>
        </div>
      </div>
      <button onClick={Bookmark} className="bg-yellow-600 btn btn-sm"> {ismark ? 'Remove Bookmark' :'Bookmark'}</button>
      <button onClick={handleBuyNow} className="bg-orange-800 btn btn-sm right-2 top-2">Show Interest</button>
      {/* Confirmation Dialog */}
      {confirmationVisible && (
        <div className=" z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>Are you sure you want to buy this book?</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleConfirmPurchase} className="bg-blue-500 text-white py-2 px-4 mr-2 rounded-lg">Yes</button>
              <button onClick={() => setConfirmationVisible(false)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
