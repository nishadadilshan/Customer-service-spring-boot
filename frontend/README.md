# Customer Service Frontend

A modern, responsive React frontend for the Customer Service Management System. This application provides a beautiful and intuitive interface for managing customer data with full CRUD operations.

## Features

- 🎨 **Modern UI/UX**: Clean, responsive design with gradient backgrounds and smooth animations
- 📱 **Mobile Responsive**: Optimized for all device sizes
- 🔄 **Real-time Updates**: Instant feedback with toast notifications
- ✅ **Form Validation**: Client-side validation with error messages
- 🎯 **CRUD Operations**: Create, Read, Update, and Delete customers
- 🔍 **Status Management**: Toggle customer active/inactive status
- 🚀 **Fast Performance**: Optimized React components with proper state management

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library
- **CSS3** - Custom styling with modern features

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:8081`

## Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js          # Navigation header
│   │   ├── CustomerList.js    # Customer listing page
│   │   └── CustomerForm.js    # Add/Edit customer form
│   ├── services/
│   │   └── customerService.js # API service layer
│   ├── App.js                 # Main application component
│   ├── App.css               # Global styles
│   └── index.js              # Application entry point
├── package.json
└── README.md
```

## API Integration

The frontend integrates with the following backend endpoints:

- `GET /api/customer/getCustomers` - Fetch all customers
- `GET /api/customer/getCustomer/{id}` - Fetch customer by ID
- `POST /api/customer/create` - Create new customer
- `PUT /api/customer/update/{id}` - Update existing customer
- `DELETE /api/customer/delete/{id}` - Delete customer

## Features Overview

### Customer List Page
- Displays all customers in a responsive grid layout
- Shows customer status (Active/Inactive) with visual indicators
- Quick action buttons for Edit and Delete operations
- Empty state with call-to-action when no customers exist
- Loading states with spinner animations

### Customer Form
- Add new customers or edit existing ones
- Form validation with real-time error messages
- Toggle switch for customer status
- Responsive form layout that adapts to screen size
- Cancel and Save actions with loading states

### Navigation
- Sticky header with gradient background
- Quick navigation between pages
- Responsive navigation that adapts to mobile screens

## Styling

The application uses custom CSS with:
- CSS Grid and Flexbox for layouts
- CSS Custom Properties for consistent theming
- Smooth transitions and hover effects
- Mobile-first responsive design
- Modern color palette with gradients
- Accessible focus states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Adding New Features

1. Create new components in the `src/components/` directory
2. Add new API methods to `src/services/customerService.js`
3. Update routing in `src/App.js` if needed
4. Add styles to `src/App.css`

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and reusable

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure the backend is running on port 8081
   - Check CORS configuration in the backend
   - Verify the API endpoints are accessible

2. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **Build Issues**
   - Clear browser cache
   - Restart the development server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Customer Service Management System.
