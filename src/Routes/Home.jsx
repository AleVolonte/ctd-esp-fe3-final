import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../Components/Card';
import { ContextGlobal } from '../Components/utils/global.context';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, dentists: action.payload };
    case 'ADD_TO_FAVORITES':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FROM_FAVORITES':
      return { ...state, favorites: state.favorites.filter((card) => card.id !== action.payload) };
    default:
      return state;
  }
};

const initialState = {
  dentists: [],
  favorites: [],
};

const Home = () => {
  const { state: { theme } } = useContext(ContextGlobal);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        console.error('Error fetching dentists:', error);
      }
    };

    fetchDentists();
  }, []);

  useEffect(() => {
    const fetchFavorites = () => {
      const existingCards = localStorage.getItem('favCards');
      const parsedCards = existingCards ? JSON.parse(existingCards) : [];
      setFavorites(parsedCards);
    };

    fetchFavorites();
  }, []);

  const handleAddToFavorites = (cardData) => {
    const isCardAlreadyAdded = favorites.some((card) => card.id === cardData.id);

    if (isCardAlreadyAdded) {
      alert('This card is already added to favorites.');
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: cardData });
      setFavorites((prevFavorites) => [...prevFavorites, cardData]);
      localStorage.setItem('favCards', JSON.stringify([...favorites, cardData]));
      alert('Card added to favorites!');
      setTimeout(() => {
        navigate('/favs'); // Redirect to /favs after a delay
      }, 1500);
    }
  };

  const handleRemoveFromFavorites = (cardId) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: cardId });
    setFavorites((prevFavorites) => prevFavorites.filter((card) => card.id !== cardId));
    localStorage.setItem('favCards', JSON.stringify(favorites.filter((card) => card.id !== cardId)));
    alert('Card removed from favorites!');
  };

  return (
    <main className={theme === 'dark' ? 'dark' : 'light'}>
      <h1>Home</h1>
      <div className="card-grid">
        {state.dentists.map((dentist) => (
          <Link key={dentist.id} to={`/detail/${dentist.id}`}>
            <Card
              name={dentist.name}
              username={dentist.username}
              id={dentist.id}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
            />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;