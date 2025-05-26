const swaggerJsdoc = require('swagger-jsdoc');

const createSwaggerSpec = (title, version, description, port) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title,
        version,
        description,
      },
      servers: [
        {
          url: `http://localhost:${port}`,
          description: 'Development server',
        },
      ],
      components: {
        schemas: {
          Book: {
            type: 'object',
            required: ['title', 'author', 'isbn', 'price'],
            properties: {
              id: {
                type: 'string',
                description: 'Book ID'
              },
              title: {
                type: 'string',
                description: 'Book title'
              },
              author: {
                type: 'string',
                description: 'Book author'
              },
              isbn: {
                type: 'string',
                description: 'Book ISBN'
              },
              price: {
                type: 'number',
                description: 'Book price'
              },
              category: {
                type: 'string',
                description: 'Book category'
              },
              stock: {
                type: 'integer',
                description: 'Available stock'
              },
              description: {
                type: 'string',
                description: 'Book description'
              }
            }
          },
          User: {
            type: 'object',
            required: ['name', 'email'],
            properties: {
              id: {
                type: 'string',
                description: 'User ID'
              },
              name: {
                type: 'string',
                description: 'User full name'
              },
              email: {
                type: 'string',
                description: 'User email address'
              },
              phone: {
                type: 'string',
                description: 'User phone number'
              },
              address: {
                type: 'string',
                description: 'User address'
              }
            }
          },
          Order: {
            type: 'object',
            required: ['userId', 'items'],
            properties: {
              id: {
                type: 'string',
                description: 'Order ID'
              },
              userId: {
                type: 'string',
                description: 'User ID who placed the order'
              },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    bookId: {
                      type: 'string'
                    },
                    quantity: {
                      type: 'integer'
                    },
                    price: {
                      type: 'number'
                    }
                  }
                }
              },
              totalAmount: {
                type: 'number',
                description: 'Total order amount'
              },
              status: {
                type: 'string',
                enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
                description: 'Order status'
              },
              orderDate: {
                type: 'string',
                format: 'date-time',
                description: 'Order date'
              }
            }
          },
          Review: {
            type: 'object',
            required: ['bookId', 'userId', 'rating'],
            properties: {
              id: {
                type: 'string',
                description: 'Review ID'
              },
              bookId: {
                type: 'string',
                description: 'Book ID being reviewed'
              },
              userId: {
                type: 'string',
                description: 'User ID who wrote the review'
              },
              rating: {
                type: 'integer',
                minimum: 1,
                maximum: 5,
                description: 'Rating from 1 to 5'
              },
              comment: {
                type: 'string',
                description: 'Review comment'
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Review creation date'
              }
            }
          },
          Error: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                example: false
              },
              error: {
                type: 'string',
                description: 'Error message'
              }
            }
          }
        }
      }
    },
    apis: ['./routes/*.js'], // paths to files containing OpenAPI definitions
  };

  return swaggerJsdoc(options);
};

module.exports = { createSwaggerSpec };
