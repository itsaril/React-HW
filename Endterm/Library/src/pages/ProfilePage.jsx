import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doSignOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { uploadProfilePicture, getProfile } from '../services/profileService';
import '../styles/profile.css'; 


function ProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef();

  React.useEffect(() => {
    if (currentUser) {
      getProfile(currentUser.uid).then(profile => {
        if (profile.photoURL) setPhotoURL(profile.photoURL);
      });
    }
  }, [currentUser]);

  const handleLogout = async () => {
    await doSignOut();
    navigate('/login');
  };

  const handleFileChange = async (e) => {
    setError('');
    setSuccess('');
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    setUploading(true);
    try {
      const worker = new window.Worker(new URL('../utils/imageWorker.js', import.meta.url));
      worker.postMessage({ file });
      worker.onmessage = async (event) => {
        const { base64 } = event.data;
        const url = await uploadProfilePicture(currentUser.uid, base64);
        setPhotoURL(url);
        setSuccess('Profile picture updated!');
        setUploading(false);
        worker.terminate();
      };
    } catch (err) {
      setError('Failed to upload image.');
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (!currentUser) {
    return <h1>Loading Profile...</h1>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <p>Welcome, <strong>{currentUser.email}</strong>!</p>

      <div className="profile-details">
        <h2>Account Details</h2>
        <ul>
          <li><strong>Email:</strong> {currentUser.email}</li>
          <li><strong>User ID:</strong> {currentUser.uid}</li>
          <li><strong>Creation Time:</strong> {new Date(currentUser.metadata.creationTime).toLocaleDateString()}</li>
          <li><strong>Last Sign-in Time:</strong> {new Date(currentUser.metadata.lastSignInTime).toLocaleDateString()}</li>
        </ul>
      </div>

      <div className="profile-picture-section">
        <h2>Profile Picture</h2>
        {photoURL ? (
          <img src={photoURL} alt="Profile" className="profile-picture" />
        ) : (
          <div className="profile-picture-placeholder">No picture</div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={uploading}
          style={{ marginBottom: '10px' }}
        />
        {uploading && <p className="error-message">Uploading...</p>}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>

      <button onClick={handleLogout} className="auth-button logout-profile">
        <span role="img" aria-label="logout">🚪</span> Logout from Account
      </button>
      <button
        className="upload-button"
        style={{ marginTop: '10px', alignSelf: 'center' }}
        onClick={handleUploadClick}
      >
        <span role="img" aria-label="upload">📤</span> Upload Profile Picture
      </button>
    </div>
  );
}

export default ProfilePage;