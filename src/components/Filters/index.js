import "./index.css"
import React, { Component } from 'react';
import { CartContext } from '../contexts/CartContext';

class Filter extends Component {
  static contextType = CartContext;

  handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    const filterValue = type === 'checkbox' ? checked : value;
    this.props.updateFilters(name, filterValue);
  };

  render() {
    const { filters } = this.props;

    return (
      <div className="filter-container">
        <h3>Filters</h3>
        
        <div className="filter-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={this.handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="price">Max Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={filters.price}
            onChange={this.handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="bedrooms">Bedrooms:</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={this.handleFilterChange}
          />
        </div>
      </div>
    );
  }
}

export default Filter;
