const express = require('express');
const ReviewController = require('../controllers/reviewController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - bookId
 *         - userId
 *         - rating
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated review ID
 *         bookId:
 *           type: string
 *           description: ID of the book being reviewed
 *         userId:
 *           type: string
 *           description: ID of the user who wrote the review
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Rating from 1 to 5 stars
 *         comment:
 *           type: string
 *           description: Optional review comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Review creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update date
 *     BookRatingStats:
 *       type: object
 *       properties:
 *         bookId:
 *           type: string
 *         totalReviews:
 *           type: integer
 *         averageRating:
 *           type: number
 *         ratingDistribution:
 *           type: object
 *           properties:
 *             "1":
 *               type: integer
 *             "2":
 *               type: integer
 *             "3":
 *               type: integer
 *             "4":
 *               type: integer
 *             "5":
 *               type: integer
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: bookId
 *         schema:
 *           type: string
 *         description: Filter reviews by book ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter reviews by user ID
 *       - in: query
 *         name: rating
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         description: Filter reviews by rating
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 */
router.get('/', ReviewController.getAllReviews);

/**
 * @swagger
 * /api/reviews/stats:
 *   get:
 *     summary: Get overall review statistics
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Overall review statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalReviews:
 *                       type: integer
 *                     averageRating:
 *                       type: number
 *                     ratingDistribution:
 *                       type: object
 *                     uniqueBooksReviewed:
 *                       type: integer
 *                     uniqueReviewers:
 *                       type: integer
 */
router.get('/stats', ReviewController.getOverallStats);

/**
 * @swagger
 * /api/reviews/book/{bookId}/stats:
 *   get:
 *     summary: Get rating statistics for a specific book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book rating statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/BookRatingStats'
 */
router.get('/book/:bookId/stats', ReviewController.getBookRatingStats);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.get('/:id', ReviewController.getReviewById);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - userId
 *               - rating
 *             properties:
 *               bookId:
 *                 type: string
 *               userId:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Validation error or user already reviewed this book
 */
router.post('/', ReviewController.createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 */
router.put('/:id', ReviewController.updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;
