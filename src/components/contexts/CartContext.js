import React, { Component, createContext } from 'react';

// Create the Cart Context with default values
const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartItems: () => []
});

// Create the CartProvider class component
class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }

  addToCart = (item) => {
    this.setState(prevState => ({
      cart: [...prevState.cart, item]
    }));
  };

  removeFromCart = (id) => {
    this.setState(prevState => ({
      cart: prevState.cart.filter(item => item._id !== id)
    }));
  };

  clearCart = () => {
    this.setState({
      cart: []
    });
  };

  getCartItems = () => {
    return this.state.cart;
  };

  render() {
    const { cart } = this.state;
    const { children } = this.props;
    return (
      <CartContext.Provider
        value={{
          cart,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          clearCart: this.clearCart,
          getCartItems: this.getCartItems
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

export { CartProvider, CartContext };
