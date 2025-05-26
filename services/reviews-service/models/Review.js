const { v4: uuidv4 } = require('uuid');

class Review {
  constructor(bookId, userId, rating, comment = '') {
    this.id = uuidv4();
    this.bookId = bookId;
    this.userId = userId;
    this.rating = rating;
    this.comment = comment;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(data) {
    if (data.rating !== undefined) this.rating = data.rating;
    if (data.comment !== undefined) this.comment = data.comment;
    this.updatedAt = new Date().toISOString();
  }

  static validateRating(rating) {
    return rating >= 1 && rating <= 5 && Number.isInteger(rating);
  }
}

// In-memory storage (in production, this would be a database)
const reviews = [
  new Review('book-1', 'user-1', 5, 'Excellent book! Highly recommended.'),
  new Review('book-1', 'user-2', 4, 'Good read, enjoyed the story.'),
  new Review('book-2', 'user-1', 3, 'Average book, could be better.'),
  new Review('book-3', 'user-2', 5, 'Outstanding technical content!'),
  new Review('book-4', 'user-1', 4, 'Great JavaScript reference book.')
];

class ReviewService {
  static getAllReviews() {
    return reviews;
  }

  static getReviewById(id) {
    return reviews.find(review => review.id === id);
  }

  static getReviewsByBookId(bookId) {
    return reviews.filter(review => review.bookId === bookId);
  }

  static getReviewsByUserId(userId) {
    return reviews.filter(review => review.userId === userId);
  }

  static getReviewsByRating(rating) {
    return reviews.filter(review => review.rating === rating);
  }

  static createReview(reviewData) {
    // Validate rating
    if (!Review.validateRating(reviewData.rating)) {
      throw new Error('Rating must be an integer between 1 and 5');
    }

    // Check if user already reviewed this book
    const existingReview = reviews.find(
      review => review.bookId === reviewData.bookId && review.userId === reviewData.userId
    );
    
    if (existingReview) {
      throw new Error('User has already reviewed this book');
    }

    const review = new Review(
      reviewData.bookId,
      reviewData.userId,
      reviewData.rating,
      reviewData.comment
    );
    
    reviews.push(review);
    return review;
  }

  static updateReview(id, reviewData) {
    const review = this.getReviewById(id);
    if (!review) return null;

    // Validate rating if provided
    if (reviewData.rating !== undefined && !Review.validateRating(reviewData.rating)) {
      throw new Error('Rating must be an integer between 1 and 5');
    }
    
    review.update(reviewData);
    return review;
  }

  static deleteReview(id) {
    const index = reviews.findIndex(review => review.id === id);
    if (index === -1) return null;
    
    return reviews.splice(index, 1)[0];
  }

  static getBookRatingStats(bookId) {
    const bookReviews = this.getReviewsByBookId(bookId);
    
    if (bookReviews.length === 0) {
      return {
        bookId,
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    const totalRating = bookReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / bookReviews.length).toFixed(2);
    
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    bookReviews.forEach(review => {
      ratingDistribution[review.rating]++;
    });

    return {
      bookId,
      totalReviews: bookReviews.length,
      averageRating: parseFloat(averageRating),
      ratingDistribution
    };
  }

  static getOverallStats() {
    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(2) : 0;
    
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      ratingDistribution[review.rating]++;
    });

    // Get unique books and users
    const uniqueBooks = [...new Set(reviews.map(review => review.bookId))];
    const uniqueUsers = [...new Set(reviews.map(review => review.userId))];

    return {
      totalReviews,
      averageRating: parseFloat(averageRating),
      ratingDistribution,
      uniqueBooksReviewed: uniqueBooks.length,
      uniqueReviewers: uniqueUsers.length
    };
  }
}

module.exports = { Review, ReviewService };
