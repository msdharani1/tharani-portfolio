// components/Admin.jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        navigate('/addProjectInfo');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="admin-container">
      {user ? navigate('/addProjectInfo') : <Login />}
    </div>
  );
}

export default Admin;