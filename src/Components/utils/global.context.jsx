import React, { createContext, useReducer } from 'react';

export const initialState = {
  theme: 'light',
  data: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const fetchDataSuccess = (data) => {
    dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
  };

  const contextValue = {
    state,
    toggleTheme,
    fetchDataSuccess,
  };

  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  );
};