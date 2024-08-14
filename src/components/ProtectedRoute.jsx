// components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // You can return a loading spinner or any other loading indicator here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect them to the /msd-admin page if not logged in
    return <Navigate to="/msd-admin" replace />;
  }

  // If authenticated, render the child components
  return children;
};

export default ProtectedRoute;