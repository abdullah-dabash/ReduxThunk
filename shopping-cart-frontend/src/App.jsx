import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import { logout } from './features/authSlice';
import './app.css';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 p-4 text-white">
          {user ? (
            <>
              <button onClick={handleLogout} className="mr-4">Logout</button>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/products" className="mr-4">Products</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="mr-4">Register</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/products" /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/products" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/products" /> : <Register />} />
          <Route path="/products" element={!user ? <Navigate to="/login" /> : <ProductList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
