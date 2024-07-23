import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const { user, setUser } = useUser();
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
  
      if (response.ok) {
        setUser(null);
        localStorage.removeItem('sessionToken'); 
        console.log('Logout successful');
     
      } else {
        console.error('Logout failed');
       
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <>
      <div>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/sell">Sell a Book</Link>
                </li>
              </ul>
            </div>
            <button  onClick={handleLogout} className="bg-yellow-900 text-white px-2 py-1 rounded-md">
                  Logout
                </button>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
            
            </div>
            <div className="form-control">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search by title or author"
                  className="input input-bordered w-24 md:w-auto"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <button type="submit" className="bg-yellow-900 text-white px-2 py-1 rounded-md">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
