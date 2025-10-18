import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus } from 'lucide-react';

const Header = () => {
  return (
    <header className="header" data-testid="header">
      <div className="header-container">
        <div className="header-brand" data-testid="header-brand">
          <Users className="header-icon" />
          <h1 data-testid="app-title">Customer Service</h1>
        </div>
        <nav className="header-nav" data-testid="header-nav">
          <Link to="/" className="nav-link" data-testid="nav-all-customers">
            <Users className="nav-icon" />
            All Customers
          </Link>
          <Link to="/add" className="nav-link primary" data-testid="nav-add-customer">
            <Plus className="nav-icon" />
            Add Customer
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
