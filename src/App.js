import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage/index";
import Cart from './components/Cart';
import HeaderWrapper from './components/Header/HeaderWrapper';
import { CartProvider } from './components/contexts/CartContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <CartProvider>
        <HeaderWrapper />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </CartProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
