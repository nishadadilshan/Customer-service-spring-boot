import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Save, ArrowLeft, Loader, User, Mail, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';
import customerService from '../services/customerService';

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      status: true
    }
  });

  const status = watch('status');

  useEffect(() => {
    if (isEdit) {
      fetchCustomer();
    }
  }, [id, isEdit]);

  const fetchCustomer = async () => {
    try {
      setInitialLoading(true);
      const data = await customerService.getCustomerById(id);
      if (data) {
        reset({
          name: data.name || '',
          email: data.email || '',
          address: data.address || '',
          status: data.status !== undefined ? data.status : true
        });
      }
    } catch (error) {
      toast.error('Failed to fetch customer details');
      console.error('Error fetching customer:', error);
      navigate('/');
    } finally {
      setInitialLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      if (isEdit) {
        await customerService.updateCustomer(id, data);
        toast.success('Customer updated successfully');
      } else {
        await customerService.createCustomer(data);
        toast.success('Customer created successfully');
      }
      
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data || 'An error occurred';
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} customer: ${errorMessage}`);
      console.error('Error saving customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = () => {
    setValue('status', !status);
  };

  if (initialLoading) {
    return (
      <div className="loading-container" data-testid="loading-container">
        <Loader className="loading-spinner" data-testid="loading-spinner" />
        <p data-testid="loading-text">Loading customer details...</p>
      </div>
    );
  }

  return (
    <div className="form-container" data-testid="form-container">
      <div className="form-header" data-testid="form-header">
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary btn-sm"
          data-testid="back-button"
        >
          <ArrowLeft className="btn-icon" />
          Back to Customers
        </button>
        <h2 data-testid="form-title">{isEdit ? 'Edit Customer' : 'Add New Customer'}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="customer-form" data-testid="customer-form">
        <div className="form-grid" data-testid="form-grid">
          <div className="form-group" data-testid="name-form-group">
            <label htmlFor="name" className="form-label" data-testid="name-label">
              <User className="label-icon" />
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter customer's full name"
              data-testid="name-input"
              {...register('name', {
                required: 'Name is required',
                maxLength: {
                  value: 100,
                  message: 'Name must not exceed 100 characters'
                },
                pattern: {
                  value: /^[a-zA-Z\s\-'\u00C0-\u017F]+$/,
                  message: 'Name can only contain letters, spaces, hyphens, apostrophes, and accented characters'
                }
              })}
            />
            {errors.name && (
              <span className="error-message" data-testid="name-error">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group" data-testid="email-form-group">
            <label htmlFor="email" className="form-label" data-testid="email-label">
              <Mail className="label-icon" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter customer's email address"
              data-testid="email-input"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                },
                maxLength: {
                  value: 150,
                  message: 'Email must not exceed 150 characters'
                }
              })}
            />
            {errors.email && (
              <span className="error-message" data-testid="email-error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group full-width" data-testid="address-form-group">
            <label htmlFor="address" className="form-label" data-testid="address-label">
              <MapPin className="label-icon" />
              Address
            </label>
            <textarea
              id="address"
              className={`form-input ${errors.address ? 'error' : ''}`}
              placeholder="Enter customer's address (optional)"
              rows="3"
              data-testid="address-input"
              {...register('address', {
                maxLength: {
                  value: 255,
                  message: 'Address must not exceed 255 characters'
                }
              })}
            />
            {errors.address && (
              <span className="error-message" data-testid="address-error">{errors.address.message}</span>
            )}
          </div>

          <div className="form-group" data-testid="status-form-group">
            <label className="form-label" data-testid="status-label">Status</label>
            <div className="status-toggle" data-testid="status-toggle">
              <button
                type="button"
                onClick={toggleStatus}
                className={`toggle-button ${status ? 'active' : 'inactive'}`}
                data-testid="status-toggle-button"
              >
                {status ? (
                  <ToggleRight className="toggle-icon" />
                ) : (
                  <ToggleLeft className="toggle-icon" />
                )}
                <span data-testid="status-text">{status ? 'Active' : 'Inactive'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions" data-testid="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
            data-testid="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            data-testid="submit-button"
          >
            {loading ? (
              <Loader className="btn-icon spinning" />
            ) : (
              <Save className="btn-icon" />
            )}
            {loading ? 'Saving...' : (isEdit ? 'Update Customer' : 'Create Customer')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
