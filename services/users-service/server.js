const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const { createSwaggerSpec } = require('../../shared/swagger');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Swagger setup
const swaggerSpec = createSwaggerSpec(
  'Users Service API',
  '1.0.0',
  'API for managing users in the bookstore',
  PORT
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    service: 'Users Service',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Users Service Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`👥 Users Service running on port ${PORT}`);
  console.log(`📖 Swagger docs: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
