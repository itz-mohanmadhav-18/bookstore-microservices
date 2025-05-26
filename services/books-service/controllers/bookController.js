const { BookService } = require('../models/Book');

class BookController {
  // Get all books
  static async getAllBooks(req, res) {
    try {
      const { category, search } = req.query;
      let books;

      if (search) {
        books = BookService.searchBooks(search);
      } else if (category) {
        books = BookService.getBooksByCategory(category);
      } else {
        books = BookService.getAllBooks();
      }

      res.json({
        success: true,
        count: books.length,
        data: books
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch books'
      });
    }
  }

  // Get book by ID
  static async getBookById(req, res) {
    try {
      const book = BookService.getBookById(req.params.id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }

      res.json({
        success: true,
        data: book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch book'
      });
    }
  }

  // Create new book
  static async createBook(req, res) {
    try {
      const { title, author, isbn, price, category, stock, description } = req.body;

      // Validation
      if (!title || !author || !isbn || !price) {
        return res.status(400).json({
          success: false,
          error: 'Title, author, ISBN, and price are required'
        });
      }

      const book = BookService.createBook({
        title,
        author,
        isbn,
        price,
        category,
        stock: stock || 0,
        description
      });

      res.status(201).json({
        success: true,
        data: book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create book'
      });
    }
  }

  // Update book
  static async updateBook(req, res) {
    try {
      const book = BookService.updateBook(req.params.id, req.body);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }

      res.json({
        success: true,
        data: book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update book'
      });
    }
  }

  // Delete book
  static async deleteBook(req, res) {
    try {
      const book = BookService.deleteBook(req.params.id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }

      res.json({
        success: true,
        message: 'Book deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete book'
      });
    }
  }

  // Update stock
  static async updateStock(req, res) {
    try {
      const { quantity } = req.body;
      
      if (quantity === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Quantity is required'
        });
      }

      const book = BookService.updateStock(req.params.id, quantity);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          error: 'Book not found'
        });
      }

      res.json({
        success: true,
        data: book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update stock'
      });
    }
  }
}

module.exports = BookController;
