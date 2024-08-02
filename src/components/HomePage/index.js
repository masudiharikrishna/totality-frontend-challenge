// src/components/HomePage/index.js

import React, { Component } from 'react';
import { CartContext } from '../contexts/CartContext';
import './index.css';
import Property from '../Property';
import Header from '../Header';
import Filter from "../Filters/index"
import { Toast, ToastContainer } from 'react-bootstrap';
import { InfinitySpin } from 'react-loader-spinner';

class HomePage extends Component {
  static contextType = CartContext;

  state = {
    properties: [],
    filters: {
      location: '',
      price: '',
      bedrooms: ''
    },
    is_loading: false,
    showToast: false,
    toastMessage: ''
  };

  async componentDidMount() {
    this.setState({ is_loading: true });
    try {
      const response = await fetch('https://totality-backend-0xz9.onrender.com/api/properties');
      const data = await response.json();
      this.setState({ properties: data, is_loading: false });
    } catch (error) {
      console.error('Error fetching properties:', error);
      this.setState({ is_loading: false });
    }
  }

  updateFilters = (name, value) => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  filterProperties = () => {
    const { properties, filters } = this.state;
    return properties.filter(property => {
      const matchLocation = filters.location ? property.address.city.toLowerCase().includes(filters.location.toLowerCase()) : true;
      const matchPrice = filters.price ? property.price <= parseInt(filters.price) : true;
      const matchBedrooms = filters.bedrooms ? property.bedrooms === parseInt(filters.bedrooms) : true;
      return matchLocation && matchPrice && matchBedrooms;
    });
  };

  addToCart = (property) => {
    const { addToCart } = this.context;
    addToCart(property);
    this.setState({
      showToast: true,
      toastMessage: `Successfully added to cart`
    });
    setTimeout(() => {
      this.setState({ showToast: false });
    }, 3000);
  };

  render() {
    const { is_loading, filters, showToast, toastMessage } = this.state;
    const filteredProperties = this.filterProperties(); // Define filteredProperties here

    return (
      <div>
        {is_loading ? (
          <div className="loading-container">
            <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        ) : (
          <div>
            <Header />
            <div className="home-page-content">
              <Filter filters={filters}  className=" filter-container" updateFilters={this.updateFilters} /> 
              <div className="home-page-properties-list-container">
                {filteredProperties.map((eachItem) => (
                  <Property key={eachItem._id} property={eachItem} addToCart={this.addToCart} />
                ))}
              </div>
            </div>
          </div>
        )}
        <ToastContainer position="top-end" className="p-3">
          <Toast show={showToast} onClose={() => this.setState({ showToast: false })}>
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
  }
}

export default HomePage;
