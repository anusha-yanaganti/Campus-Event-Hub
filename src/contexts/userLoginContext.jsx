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
    return !!localStorage.getItem('token'); // Use the token for login status
  });

  // Save user data and token to localStorage when changed
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login function
  const loginUser = (userData) => {
    setUser(userData);
    setUserLoginStatus(true);
  };

  // Logout function
  const logoutUser = () => {
    setUser(null);
    setUserLoginStatus(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Clear token as well
  };

  return (
    <userLoginContext.Provider value={{ user, userLoginStatus, loginUser, logoutUser }}>
      {children}
    </userLoginContext.Provider>
  );
};
