# Customer REST API

This is a Spring Boot application that provides a REST API for managing customers.

## Features

- **GET** `/api/customers` - Get all customers
- **GET** `/api/customers/{id}` - Get customer by ID
- **GET** `/api/customers/email/{email}` - Get customer by email
- **POST** `/api/customers` - Create a new customer
- **PUT** `/api/customers/{id}` - Update an existing customer
- **DELETE** `/api/customers/{id}` - Delete a customer
- **GET** `/api/customers/search/firstname/{firstName}` - Search customers by first name
- **GET** `/api/customers/search/lastname/{lastName}` - Search customers by last name

## Customer Entity

The Customer entity has the following fields:
- `id` - Auto-generated unique identifier
- `firstName` - Customer's first name (required)
- `lastName` - Customer's last name (required)
- `email` - Customer's email address (required, unique)
- `phone` - Customer's phone number (optional)
- `address` - Customer's address (optional)
- `createdAt` - Timestamp when the customer was created
- `updatedAt` - Timestamp when the customer was last updated

## Database

The application uses H2 in-memory database for development. You can access the H2 console at:
- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:testdb
- Username: sa
- Password: password

## Running the Application

1. Make sure you have Java 17 installed
2. Run the application using Maven:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
3. The application will start on http://localhost:8080

## API Examples

### Create a Customer
```bash
POST http://localhost:8080/api/customers
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "address": "123 Main St, City, State"
}
```

### Get All Customers
```bash
GET http://localhost:8080/api/customers
```

### Get Customer by ID
```bash
GET http://localhost:8080/api/customers/1
```

### Update a Customer
```bash
PUT http://localhost:8080/api/customers/1
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phone": "098-765-4321",
  "address": "456 Oak Ave, City, State"
}
```

### Delete a Customer
```bash
DELETE http://localhost:8080/api/customers/1
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET, PUT operations
- `201 Created` - Successful POST operations
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

## Dependencies

- Spring Boot 3.5.5
- Spring Data JPA
- H2 Database
- Java 17


## Swagger URL

http://localhost:8081/swagger-ui/index.html#/