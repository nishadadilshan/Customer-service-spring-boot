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
      <div className="loading-container" data-testid="loading-container">
        <Loader className="loading-spinner" data-testid="loading-spinner" />
        <p data-testid="loading-text">Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="customer-list-container" data-testid="customer-list-container">
      <div className="page-header" data-testid="page-header">
        <h2 data-testid="page-title">Customer Management</h2>
        <p data-testid="page-description">Manage your customer database</p>
      </div>

      {customers.length === 0 ? (
        <div className="empty-state" data-testid="empty-state">
          <User className="empty-icon" data-testid="empty-icon" />
          <h3 data-testid="empty-title">No customers found</h3>
          <p data-testid="empty-description">Get started by adding your first customer</p>
          <Link to="/add" className="btn btn-primary" data-testid="empty-add-customer-btn">
            Add Customer
          </Link>
        </div>
      ) : (
        <div className="customers-grid" data-testid="customers-grid">
          {customers.map((customer) => (
            <div key={customer.customerId} className="customer-card" data-testid={`customer-card-${customer.customerId}`}>
              <div className="customer-header" data-testid={`customer-header-${customer.customerId}`}>
                <div className="customer-avatar" data-testid={`customer-avatar-${customer.customerId}`}>
                  <User className="avatar-icon" />
                </div>
                <div className="customer-info" data-testid={`customer-info-${customer.customerId}`}>
                  <h3 className="customer-name" data-testid={`customer-name-${customer.customerId}`}>{customer.name}</h3>
                  <div className="customer-status" data-testid={`customer-status-${customer.customerId}`}>
                    {customer.status ? (
                      <span className="status active" data-testid={`status-active-${customer.customerId}`}>
                        <CheckCircle className="status-icon" />
                        Active
                      </span>
                    ) : (
                      <span className="status inactive" data-testid={`status-inactive-${customer.customerId}`}>
                        <XCircle className="status-icon" />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="customer-details" data-testid={`customer-details-${customer.customerId}`}>
                <div className="detail-item" data-testid={`customer-email-${customer.customerId}`}>
                  <Mail className="detail-icon" />
                  <span>{customer.email}</span>
                </div>
                {customer.address && (
                  <div className="detail-item" data-testid={`customer-address-${customer.customerId}`}>
                    <MapPin className="detail-icon" />
                    <span>{customer.address}</span>
                  </div>
                )}
              </div>

              <div className="customer-actions" data-testid={`customer-actions-${customer.customerId}`}>
                <Link
                  to={`/edit/${customer.customerId}`}
                  className="btn btn-secondary btn-sm"
                  data-testid={`edit-customer-btn-${customer.customerId}`}
                >
                  <Edit className="btn-icon" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(customer.customerId, customer.name)}
                  className="btn btn-danger btn-sm"
                  disabled={deletingId === customer.customerId}
                  data-testid={`delete-customer-btn-${customer.customerId}`}
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
