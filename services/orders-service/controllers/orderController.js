const { OrderService } = require('../models/Order');

class OrderController {
  // Get all orders
  static async getAllOrders(req, res) {
    try {
      const { userId, status } = req.query;
      let orders;

      if (userId) {
        orders = OrderService.getOrdersByUserId(userId);
      } else if (status) {
        orders = OrderService.getOrdersByStatus(status);
      } else {
        orders = OrderService.getAllOrders();
      }

      res.json({
        success: true,
        count: orders.length,
        data: orders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch orders'
      });
    }
  }

  // Get order by ID
  static async getOrderById(req, res) {
    try {
      const order = OrderService.getOrderById(req.params.id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch order'
      });
    }
  }

  // Create new order
  static async createOrder(req, res) {
    try {
      const { userId, items } = req.body;

      // Validation
      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        });
      }

      const order = OrderService.createOrder({ userId, items });

      res.status(201).json({
        success: true,
        data: order
      });
    } catch (error) {
      if (error.message.includes('must contain') || 
          error.message.includes('must have') ||
          error.message.includes('must be positive')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create order'
      });
    }
  }

  // Update order status
  static async updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          error: 'Status is required'
        });
      }

      const order = OrderService.updateOrderStatus(req.params.id, status);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      if (error.message === 'Invalid status') {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update order status'
      });
    }
  }

  // Delete order
  static async deleteOrder(req, res) {
    try {
      const order = OrderService.deleteOrder(req.params.id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }

      res.json({
        success: true,
        message: 'Order deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete order'
      });
    }
  }

  // Add item to order
  static async addItemToOrder(req, res) {
    try {
      const { bookId, quantity, price } = req.body;
      
      if (!bookId || !quantity || !price) {
        return res.status(400).json({
          success: false,
          error: 'Book ID, quantity, and price are required'
        });
      }

      const order = OrderService.addItemToOrder(req.params.id, bookId, quantity, price);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      if (error.message.includes('Cannot modify')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to add item to order'
      });
    }
  }

  // Remove item from order
  static async removeItemFromOrder(req, res) {
    try {
      const { bookId } = req.params;
      
      const order = OrderService.removeItemFromOrder(req.params.id, bookId);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      if (error.message.includes('Cannot modify')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to remove item from order'
      });
    }
  }

  // Get order statistics
  static async getOrderStats(req, res) {
    try {
      const stats = OrderService.getOrderStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch order statistics'
      });
    }
  }
}

module.exports = OrderController;
