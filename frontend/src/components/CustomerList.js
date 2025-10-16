import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, User, Mail, MapPin, CheckCircle, XCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import customerService from '../services/customerService';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (error) {
      toast.error('Failed to fetch customers');
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        setDeletingId(id);
        await customerService.deleteCustomer(id);
        toast.success('Customer deleted successfully');
        fetchCustomers(); // Refresh the list
      } catch (error) {
        toast.error('Failed to delete customer');
        console.error('Error deleting customer:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="loading-spinner" />
        <p>Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="customer-list-container">
      <div className="page-header">
        <h2>Customer Management</h2>
        <p>Manage your customer database</p>
      </div>

      {customers.length === 0 ? (
        <div className="empty-state">
          <User className="empty-icon" />
          <h3>No customers found</h3>
          <p>Get started by adding your first customer</p>
          <Link to="/add" className="btn btn-primary">
            Add Customer
          </Link>
        </div>
      ) : (
        <div className="customers-grid">
          {customers.map((customer) => (
            <div key={customer.customerId} className="customer-card">
              <div className="customer-header">
                <div className="customer-avatar">
                  <User className="avatar-icon" />
                </div>
                <div className="customer-info">
                  <h3 className="customer-name">{customer.name}</h3>
                  <div className="customer-status">
                    {customer.status ? (
                      <span className="status active">
                        <CheckCircle className="status-icon" />
                        Active
                      </span>
                    ) : (
                      <span className="status inactive">
                        <XCircle className="status-icon" />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="customer-details">
                <div className="detail-item">
                  <Mail className="detail-icon" />
                  <span>{customer.email}</span>
                </div>
                {customer.address && (
                  <div className="detail-item">
                    <MapPin className="detail-icon" />
                    <span>{customer.address}</span>
                  </div>
                )}
              </div>

              <div className="customer-actions">
                <Link
                  to={`/edit/${customer.customerId}`}
                  className="btn btn-secondary btn-sm"
                >
                  <Edit className="btn-icon" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(customer.customerId, customer.name)}
                  className="btn btn-danger btn-sm"
                  disabled={deletingId === customer.customerId}
                >
                  {deletingId === customer.customerId ? (
                    <Loader className="btn-icon spinning" />
                  ) : (
                    <Trash2 className="btn-icon" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
