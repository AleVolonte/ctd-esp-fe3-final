import React, { useContext, useEffect, useState } from "react";
import Card from "../Components/Card";
import { ContextGlobal } from "../Components/utils/global.context";

const Favs = () => {
  const { state: { theme } } = useContext(ContextGlobal);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = () => {
      const existingCards = localStorage.getItem("favCards");
      const parsedCards = existingCards ? JSON.parse(existingCards) : [];
      setFavorites(parsedCards);
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = (cardId) => {
    const updatedFavorites = favorites.filter((card) => card.id !== cardId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favCards", JSON.stringify(updatedFavorites));
  };

  return (
    <main className={theme === "dark" ? "dark" : "light"}>
      <h1>Dentistas Favoritos</h1>
      <div className="card-grid">
        {favorites.map((dentist) => (
          <Card
            key={dentist.id}
            name={dentist.name}
            username={dentist.username}
            id={dentist.id}
            isFavorite={true}
            onRemoveFromFavorites={removeFromFavorites}
          />
        ))}
      </div>
    </main>
  );
};

export default Favs;