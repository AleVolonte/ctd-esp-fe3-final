import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContextGlobal } from '../Components/utils/global.context';

const Detail = () => {
  const { theme } = useContext(ContextGlobal);
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className={`detail-container ${theme === 'dark' ? 'dark' : 'light'}`}>
      {user ? (
        <div className="user-grid">
          <div>
            <span className="grid-label">Nombre:</span>
            <span className="grid-value">{user.name}</span>
          </div>
          <div>
            <span className="grid-label">Email:</span>
            <span className="grid-value">{user.email}</span>
          </div>
          <div>
            <span className="grid-label">Phone:</span>
            <span className="grid-value">{user.phone}</span>
          </div>
          <div>
            <span className="grid-label">Website:</span>
            <span className="grid-value">{user.website}</span>
          </div>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Detail;