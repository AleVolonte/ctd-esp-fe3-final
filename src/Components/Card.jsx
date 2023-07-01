import React, { useState, useContext } from 'react';
import { ContextGlobal } from '../Components/utils/global.context';

const Card = ({ name, username, id, isFavorite, onAddToFavorites, onRemoveFromFavorites }) => {
  const [addedToFavorites, setAddedToFavorites] = useState(isFavorite);
  const { state } = useContext(ContextGlobal);
  const isDarkTheme = state.theme === 'dark';

  const addToFavorites = () => {
    const cardData = {
      name,
      username,
      id,
    };

    setAddedToFavorites(true);
    onAddToFavorites(cardData);
  };

  const removeFromFavorites = () => {
    setAddedToFavorites(false);
    onRemoveFromFavorites(id);
  };

  const handleCardClick = (event) => {
    if (event.target.classList.contains('favButton')) {
      return;
    }
    window.location.href = `/detail/${id}`;
  };

  const handleFavoritesClick = (event) => {
    event.stopPropagation();

    if (addedToFavorites) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  return (
    <div className={`card ${isDarkTheme ? 'dark' : ''}`} onClick={handleCardClick}>
      <img src={`${process.env.PUBLIC_URL}/images/doctor.jpg`} alt="Doctor" />
      <h2 className={isDarkTheme ? 'white-text' : ''}>{name}</h2>
      <p className={isDarkTheme ? 'white-text' : ''}>{username}</p>
      {addedToFavorites ? (
        <button onClick={handleFavoritesClick} className="favButton">
        <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="Remove from Favorites" style={{ width: '20px', height: '20px' }} />
      </button>
    ) : (
      <button onClick={handleFavoritesClick} className="favButton">
        <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="Add to Favorites" style={{ width: '20px', height: '20px' }} />
      </button>
    )}
  </div>
);
};

export default Card;