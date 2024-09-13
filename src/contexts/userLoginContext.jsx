import { createContext, useState, useEffect } from 'react';

// Create context
export const userLoginContext = createContext();

// Context provider component
export const UserLoginProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [userLoginStatus, setUserLoginStatus] = useState(() => {
    return !!localStorage.getItem('user');
  });

  // Save user to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const loginUser = (userData) => {
    setUser(userData);
    setUserLoginStatus(true);
  };

  const logoutUser = () => {
    setUser(null);
    setUserLoginStatus(false);
    localStorage.removeItem('user');
  };

  return (
    <userLoginContext.Provider value={{ user, userLoginStatus, loginUser, logoutUser }}>
      {children}
    </userLoginContext.Provider>
  );
};
