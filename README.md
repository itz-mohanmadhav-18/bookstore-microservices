# Bookstore Microservices

A comprehensive microservices-based bookstore application built with Node.js and Express, featuring independent services for books, users, orders, and reviews management.

## 🏗️ Architecture

This application follows a microservices architecture with the following services:

- **API Gateway** (Port 3000) - Entry point and request routing
- **Books Service** (Port 3001) - Book inventory management
- **Users Service** (Port 3002) - User management
- **Orders Service** (Port 3003) - Order processing
- **Reviews Service** (Port 3004) - Book reviews and ratings

## 🚀 Features

### Books Service
- CRUD operations for books
- Search and filter by category
- Stock management
- Book catalog with detailed information

### Users Service
- User registration and profile management
- Email validation
- User search functionality
- Address management

### Orders Service
- Order creation and management
- Order status tracking (pending, confirmed, shipped, delivered, cancelled)
- Order items management
- Order statistics and reporting

### Reviews Service
- Book review system with 1-5 star ratings
- User review management
- Book rating statistics
- Overall review analytics

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bookstore_microservices
   ```

2. **Install dependencies for all services**
   ```bash
   npm run install:all
   ```

3. **Start all services**
   ```bash
   npm start
   ```

   Or start individual services:
   ```bash
   npm run start:gateway    # API Gateway
   npm run start:books      # Books Service
   npm run start:users      # Users Service
   npm run start:orders     # Orders Service
   npm run start:reviews    # Reviews Service
   ```

## 🌐 API Endpoints

### API Gateway (Port 3000)
- Base URL: `http://localhost:3000`
- Health Check: `GET /health`
- Swagger Documentation: `http://localhost:3000/api-docs`

### Books Service (Port 3001)
- Get all books: `GET /api/books`
- Get book by ID: `GET /api/books/:id`
- Create book: `POST /api/books`
- Update book: `PUT /api/books/:id`
- Delete book: `DELETE /api/books/:id`
- Update stock: `PATCH /api/books/:id/stock`
- Swagger Documentation: `http://localhost:3001/api-docs`

### Users Service (Port 3002)
- Get all users: `GET /api/users`
- Get user by ID: `GET /api/users/:id`
- Get user by email: `GET /api/users/email/:email`
- Create user: `POST /api/users`
- Update user: `PUT /api/users/:id`
- Delete user: `DELETE /api/users/:id`
- Swagger Documentation: `http://localhost:3002/api-docs`

### Orders Service (Port 3003)
- Get all orders: `GET /api/orders`
- Get order by ID: `GET /api/orders/:id`
- Create order: `POST /api/orders`
- Update order status: `PATCH /api/orders/:id/status`
- Add item to order: `POST /api/orders/:id/items`
- Remove item from order: `DELETE /api/orders/:id/items/:bookId`
- Get order statistics: `GET /api/orders/stats`
- Swagger Documentation: `http://localhost:3003/api-docs`

### Reviews Service (Port 3004)
- Get all reviews: `GET /api/reviews`
- Get review by ID: `GET /api/reviews/:id`
- Create review: `POST /api/reviews`
- Update review: `PUT /api/reviews/:id`
- Delete review: `DELETE /api/reviews/:id`
- Get book rating stats: `GET /api/reviews/book/:bookId/stats`
- Get overall stats: `GET /api/reviews/stats`
- Swagger Documentation: `http://localhost:3004/api-docs`

## 📊 Sample Data

The application comes pre-loaded with sample data:

### Books
- The Great Gatsby by F. Scott Fitzgerald
- To Kill a Mockingbird by Harper Lee
- Clean Code by Robert C. Martin
- JavaScript: The Good Parts by Douglas Crockford

### Users
- John Doe (john.doe@example.com)
- Jane Smith (jane.smith@example.com)
- Alice Johnson (alice.johnson@example.com)

### Orders and Reviews
- Sample orders and reviews are created for demonstration

## 🔧 Development

### Running in Development Mode
```bash
# Install nodemon globally (optional)
npm install -g nodemon

# Run individual services in development mode
cd services/books-service && npm run dev
cd services/users-service && npm run dev
cd services/orders-service && npm run dev
cd services/reviews-service && npm run dev
```

### Project Structure
```
bookstore_microservices/
├── package.json
├── README.md
├── services/
│   ├── api-gateway/
│   │   ├── package.json
│   │   └── server.js
│   ├── books-service/
│   │   ├── package.json
│   │   ├── server.js
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── users-service/
│   │   ├── package.json
│   │   ├── server.js
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── orders-service/
│   │   ├── package.json
│   │   ├── server.js
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   └── reviews-service/
│       ├── package.json
│       ├── server.js
│       ├── controllers/
│       ├── models/
│       └── routes/
└── shared/
    ├── swagger.js
    └── middleware/
        ├── cors.js
        ├── errorHandler.js
        └── logger.js
```

## 📚 API Documentation

Each service includes comprehensive Swagger/OpenAPI documentation accessible at:
- API Gateway: `http://localhost:3000/api-docs`
- Books Service: `http://localhost:3001/api-docs`
- Users Service: `http://localhost:3002/api-docs`
- Orders Service: `http://localhost:3003/api-docs`
- Reviews Service: `http://localhost:3004/api-docs`

## 🧪 Testing

You can test the APIs using:
- **Swagger UI** - Built-in interactive documentation
- **Postman** - Import the OpenAPI specs
- **cURL** - Command line testing
- **Any HTTP client**

### Example API Calls

```bash
# Get all books
curl http://localhost:3000/api/books

# Create a new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# Create an order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-id","items":[{"bookId":"book-id","quantity":2,"price":12.99}]}'
```

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input validation** - Request data validation
- **Error handling** - Comprehensive error management

## 🚀 Deployment

Each service can be deployed independently:

1. **Containerization** - Each service can be containerized with Docker
2. **Environment Variables** - Configure ports and settings via environment variables
3. **Load Balancing** - Use load balancers for high availability
4. **Service Discovery** - Implement service discovery for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Student Developer

## 🆘 Support

For questions and support:
- Check the Swagger documentation
- Review the sample data and examples
- Examine the console logs for debugging information

This application consists of 5 microservices:

1. **API Gateway** (Port 3000) - Entry point and routing
2. **Books Service** (Port 3001) - Book inventory management
3. **Users Service** (Port 3002) - User management and authentication
4. **Orders Service** (Port 3003) - Order processing
5. **Reviews Service** (Port 3004) - Book reviews and ratings

## Features

- RESTful APIs for all services
- Swagger/OpenAPI documentation
- Independent service deployment
- Modular and debuggable code structure
- Inter-service communication

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies for all services:
   ```bash
   npm run install:all
   ```

### Running the Application

Start all services simultaneously:
```bash
npm start
```

Or start individual services:
```bash
npm run start:gateway
npm run start:books
npm run start:users
npm run start:orders
npm run start:reviews
```

## API Documentation

Once the services are running, you can access the Swagger documentation at:

- API Gateway: http://localhost:3000/api-docs
- Books Service: http://localhost:3001/api-docs
- Users Service: http://localhost:3002/api-docs
- Orders Service: http://localhost:3003/api-docs
- Reviews Service: http://localhost:3004/api-docs

## Service Endpoints

### Books Service
- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `POST /books` - Create new book
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book

### Users Service
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Orders Service
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

### Reviews Service
- `GET /reviews` - Get all reviews
- `GET /reviews/:id` - Get review by ID
- `GET /reviews/book/:bookId` - Get reviews for a book
- `POST /reviews` - Create new review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

## Project Structure

```
bookstore_microservices/
├── services/
│   ├── api-gateway/
│   ├── books-service/
│   ├── users-service/
│   ├── orders-service/
│   └── reviews-service/
├── shared/
│   └── middleware/
├── package.json
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- Swagger/OpenAPI
- Axios (for inter-service communication)
- CORS
- Body-parser

## Development Notes

Each service is designed to be:
- **Independent**: Can run standalone
- **Modular**: Clear separation of concerns
- **Documented**: Complete Swagger documentation
- **Debuggable**: Structured logging and error handling
