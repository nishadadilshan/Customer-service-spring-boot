import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Users className="header-icon" />
          <h1>Customer Service</h1>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            <Users className="nav-icon" />
            All Customers
          </Link>
          <Link to="/add" className="nav-link primary">
            <Plus className="nav-icon" />
            Add Customer
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
