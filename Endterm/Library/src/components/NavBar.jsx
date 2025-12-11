import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doSignOut } from '../firebase/auth';
import { useProfilePicture } from '../hooks/useProfilePicture';

function NavBar() {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();
  const { photoURL } = useProfilePicture(currentUser?.uid);

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand"> 📚 Library App </Link>
      <div className="nav-links">
        <Link to="/items" className="nav-link"> Book List </Link>
        <Link to="/about" className="nav-link"> About </Link>
        {userLoggedIn && (
          <Link to="/favorites" className="nav-link"> Favorites </Link>
        )}
        {userLoggedIn ? (
          <>
            <Link to="/profile" className="nav-link" style={{display:'flex',alignItems:'center',gap:'8px'}}>
              {photoURL ? (
                <img src={photoURL} alt="Profile" style={{width:'32px',height:'32px',borderRadius:'50%',objectFit:'cover'}} />
              ) : null}
              {currentUser.email}
            </Link>
            <button onClick={handleLogout} className="nav-link logout-button"> Logout </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link"> Login </Link>
            <Link to="/signup" className="nav-link"> Signup </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;