import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { itemsService } from '../services/itemsService';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import '../styles/items.css';

function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
        setError('No book ID provided in the URL.');
        setLoading(false);
        return;
    }
    
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const bookDetails = await itemsService.getById(id);
        setBook(bookDetails);
      } catch (err) {
        if (err.message.includes('404') || err.message.includes('not found')) {
            setError(`Book with ID "${id}" was not found (404).`);
        } else {
            setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]); 

  if (loading) {
    return (
      <div className="details-container">
        <Spinner />
      </div>
    );
  }

  if (error || !book) {
    return (
        <div className="details-page">
            <ErrorBox message={error} />
            <button onClick={() => navigate(-1)} className="back-button">
                &larr; Go Back
            </button>
        </div>
    );
  }
  
  const { 
      title, 
      coverUrl, 
      description, 
      firstPublishDate, 
      subjectPlaces, 
      subjectGenres,
      key,
      revision,
      latestRevisionDate
  } = book;

  return (
    <div className="details-page">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back to List
      </button>

      <div className="book-details-container">
        <div className="details-header">
          <h1>{title}</h1>
        </div>
        
        <div className="details-content-wrapper">
            <div className="details-image-container">
                <img 
                    src={coverUrl} 
                    alt={`Cover of ${title}`} 
                    className="details-cover-image" 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/no-cover-large.png'; }}
                />
            </div>
            
            <div className="details-info">
                <h2>Book Specifications</h2>
                <ul className="details-list">
                    <li><strong>1. Title:</strong> {title}</li>
                    <li><strong>2. OpenLibrary Key:</strong> <code className="key-code">{key}</code></li>
                    <li><strong>3. Author:</strong> N/A (Requires extra fetch from OL API)</li> 
                    <li><strong>4. First Publish Date:</strong> {firstPublishDate}</li>
                    <li><strong>5. Main Subject/Category:</strong> {subjectGenres || 'N/A'}</li>
                    <li><strong>6. Subject Places:</strong> {subjectPlaces || 'N/A'}</li>
                    <li><strong>7. Revision Count:</strong> {revision}</li>
                    <li><strong>8. Last Updated:</strong> {latestRevisionDate}</li>
                </ul>
                
                <h3>Description</h3>
                <p>{description}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;