import Navbar from './components/navbar.jsx';
import Home from './components/Home/home.jsx';
import Profile from './components/pages/profile.jsx';
import SellBookForm from './components/pages/sellForm.jsx';
import Allbooks from './components/pages/allBooks.jsx';
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import { UserProvider, useUser } from './UserContext';
import SearchResults from './components/SearchResults';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const { user } = useUser();
  
  return (
    <Router>
      <div>
      {user ? <Navbar /> : null}
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/sell" element={user ? <SellBookForm /> : <Navigate to="/login" />} />
          <Route path="/search" element={user ? <SearchResults /> : <Navigate to="/login" />} />
          <Route path="/book" element={user ? <Allbooks /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          {/* Fallback route if no routes match */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

function AppWithUserProvider() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

export default AppWithUserProvider;
