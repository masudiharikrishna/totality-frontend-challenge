import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call API to place order
    console.log('Order placed successfully!');
    clearCart();
    setShowForm(false);
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <img src={item.images[0]} alt={item.title} className="img-fluid rounded room-image"/>
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>Price: ₹{item.price}</p>
                </div>
                <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ₹{calculateTotal()}</h3>
            <button className="btn btn-success" onClick={handleCheckout}>Checkout</button>
            {showForm && (
              <form onSubmit={handleFormSubmit} className="mt-4 form-container">
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address:</label>
                  <input type="text" id="address" name="address" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City:</label>
                  <input type="text" id="city" name="city" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">State:</label>
                  <input type="text" id="state" name="state" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label">ZIP Code:</label>
                  <input type="text" id="zip" name="zip" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number:</label>
                  <input type="tel" id="phone" name="phone" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">Payment Method:</label>
                  <select id="paymentMethod" name="paymentMethod" className="form-select" required>
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bankTransfer">Bank Transfer</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Card Number:</label>
                  <input type="text" id="cardNumber" name="cardNumber" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="expiryDate" className="form-label">Expiry Date:</label>
                  <input type="month" id="expiryDate" name="expiryDate" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="cvv" className="form-label">CVV:</label>
                  <input type="text" id="cvv" name="cvv" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Place Order</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
