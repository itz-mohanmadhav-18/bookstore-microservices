const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore Microservices API Gateway',
      version: '1.0.0',
      description: 'API Gateway for the Bookstore Microservices Application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'API Gateway'
      }
    ]
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: API Gateway is healthy
 */
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Gateway is running',
    timestamp: new Date().toISOString(),
    services: {
      books: 'http://localhost:3001',
      users: 'http://localhost:3002',
      orders: 'http://localhost:3003',
      reviews: 'http://localhost:3004'
    }
  });
});

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books (proxied to Books Service)
 *     responses:
 *       200:
 *         description: List of books
 */

// Service proxy configurations
const services = {
  books: 'http://localhost:3001',
  users: 'http://localhost:3002', 
  orders: 'http://localhost:3003',
  reviews: 'http://localhost:3004'
};

// Proxy middleware for each service
app.use('/api/books', createProxyMiddleware({
  target: services.books,
  changeOrigin: true,
  pathRewrite: {
    '^/api/books': '/api/books'
  },
  onError: (err, req, res) => {
    console.error('Books Service Error:', err.message);
    res.status(503).json({
      success: false,
      error: 'Books Service unavailable'
    });
  }
}));

app.use('/api/users', createProxyMiddleware({
  target: services.users,
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/api/users'
  },
  onError: (err, req, res) => {
    console.error('Users Service Error:', err.message);
    res.status(503).json({
      success: false,
      error: 'Users Service unavailable'
    });
  }
}));

app.use('/api/orders', createProxyMiddleware({
  target: services.orders,
  changeOrigin: true,
  pathRewrite: {
    '^/api/orders': '/api/orders'
  },
  onError: (err, req, res) => {
    console.error('Orders Service Error:', err.message);
    res.status(503).json({
      success: false,
      error: 'Orders Service unavailable'
    });
  }
}));

app.use('/api/reviews', createProxyMiddleware({
  target: services.reviews,
  changeOrigin: true,
  pathRewrite: {
    '^/api/reviews': '/api/reviews'
  },
  onError: (err, req, res) => {
    console.error('Reviews Service Error:', err.message);
    res.status(503).json({
      success: false,
      error: 'Reviews Service unavailable'
    });
  }
}));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Gateway Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log(`📚 Swagger documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
});
