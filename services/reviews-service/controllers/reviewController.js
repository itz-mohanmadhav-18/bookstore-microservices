const { ReviewService } = require('../models/Review');

class ReviewController {
  // Get all reviews
  static async getAllReviews(req, res) {
    try {
      const { bookId, userId, rating } = req.query;
      let reviews;

      if (bookId) {
        reviews = ReviewService.getReviewsByBookId(bookId);
      } else if (userId) {
        reviews = ReviewService.getReviewsByUserId(userId);
      } else if (rating) {
        const ratingNum = parseInt(rating);
        if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
          return res.status(400).json({
            success: false,
            error: 'Rating must be a number between 1 and 5'
          });
        }
        reviews = ReviewService.getReviewsByRating(ratingNum);
      } else {
        reviews = ReviewService.getAllReviews();
      }

      res.json({
        success: true,
        count: reviews.length,
        data: reviews
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch reviews'
      });
    }
  }

  // Get review by ID
  static async getReviewById(req, res) {
    try {
      const review = ReviewService.getReviewById(req.params.id);
      
      if (!review) {
        return res.status(404).json({
          success: false,
          error: 'Review not found'
        });
      }

      res.json({
        success: true,
        data: review
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch review'
      });
    }
  }

  // Create new review
  static async createReview(req, res) {
    try {
      const { bookId, userId, rating, comment } = req.body;

      // Validation
      if (!bookId || !userId || !rating) {
        return res.status(400).json({
          success: false,
          error: 'Book ID, User ID, and rating are required'
        });
      }

      const review = ReviewService.createReview({
        bookId,
        userId,
        rating,
        comment
      });

      res.status(201).json({
        success: true,
        data: review
      });
    } catch (error) {
      if (error.message.includes('Rating must be') || 
          error.message.includes('already reviewed')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to create review'
      });
    }
  }

  // Update review
  static async updateReview(req, res) {
    try {
      const review = ReviewService.updateReview(req.params.id, req.body);
      
      if (!review) {
        return res.status(404).json({
          success: false,
          error: 'Review not found'
        });
      }

      res.json({
        success: true,
        data: review
      });
    } catch (error) {
      if (error.message.includes('Rating must be')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Failed to update review'
      });
    }
  }

  // Delete review
  static async deleteReview(req, res) {
    try {
      const review = ReviewService.deleteReview(req.params.id);
      
      if (!review) {
        return res.status(404).json({
          success: false,
          error: 'Review not found'
        });
      }

      res.json({
        success: true,
        message: 'Review deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete review'
      });
    }
  }

  // Get book rating statistics
  static async getBookRatingStats(req, res) {
    try {
      const { bookId } = req.params;
      const stats = ReviewService.getBookRatingStats(bookId);

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch book rating statistics'
      });
    }
  }

  // Get overall review statistics
  static async getOverallStats(req, res) {
    try {
      const stats = ReviewService.getOverallStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch overall statistics'
      });
    }
  }
}

module.exports = ReviewController;
