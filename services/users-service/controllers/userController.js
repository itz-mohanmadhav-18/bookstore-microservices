const { UserService } = require('../models/User');

class UserController {
  // Get all users
  static async getAllUsers(req, res) {
    try {
      const { search } = req.query;
      let users;

      if (search) {
        users = UserService.searchUsers(search);
      } else {
        users = UserService.getAllUsers();
      }

      res.json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch users'
      });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const user = UserService.getUserById(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user'
      });
    }
  }

  // Create new user
  static async createUser(req, res) {
    try {
      const { name, email, phone, address } = req.body;

      // Validation
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error: 'Name and email are required'
        });
      }

      const user = UserService.createUser({
        name,
        email,
        phone,
        address
      });

      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      if (error.message === 'Email already exists' || 
          error.message === 'Invalid email format' ||
          error.message === 'Invalid phone format') {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create user'
      });
    }
  }

  // Update user
  static async updateUser(req, res) {
    try {
      const user = UserService.updateUser(req.params.id, req.body);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      if (error.message === 'Email already exists' || 
          error.message === 'Invalid email format' ||
          error.message === 'Invalid phone format') {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update user'
      });
    }
  }

  // Delete user
  static async deleteUser(req, res) {
    try {
      const user = UserService.deleteUser(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete user'
      });
    }
  }

  // Get user by email
  static async getUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const user = UserService.getUserByEmail(email);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user'
      });
    }
  }
}

module.exports = UserController;
