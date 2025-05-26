const { v4: uuidv4 } = require('uuid');

class Book {
  constructor(title, author, isbn, price, category = '', stock = 0, description = '') {
    this.id = uuidv4();
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.description = description;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(data) {
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    });
    this.updatedAt = new Date().toISOString();
  }
}

// In-memory storage (in production, this would be a database)
const books = [
  new Book(
    'The Great Gatsby',
    'F. Scott Fitzgerald',
    '9780743273565',
    12.99,
    'Fiction',
    50,
    'A classic American novel about the Jazz Age'
  ),
  new Book(
    'To Kill a Mockingbird',
    'Harper Lee',
    '9780061120084',
    14.99,
    'Fiction',
    30,
    'A gripping tale of racial injustice and childhood innocence'
  ),
  new Book(
    'Clean Code',
    'Robert C. Martin',
    '9780132350884',
    45.99,
    'Technology',
    25,
    'A handbook of agile software craftsmanship'
  ),
  new Book(
    'JavaScript: The Good Parts',
    'Douglas Crockford',
    '9780596517748',
    29.99,
    'Technology',
    40,
    'Unearthing the excellence in JavaScript'
  )
];

class BookService {
  static getAllBooks() {
    return books;
  }

  static getBookById(id) {
    return books.find(book => book.id === id);
  }

  static getBooksByCategory(category) {
    return books.filter(book => 
      book.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  static searchBooks(query) {
    const searchTerm = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm) ||
      book.description.toLowerCase().includes(searchTerm)
    );
  }

  static createBook(bookData) {
    const book = new Book(
      bookData.title,
      bookData.author,
      bookData.isbn,
      bookData.price,
      bookData.category,
      bookData.stock,
      bookData.description
    );
    books.push(book);
    return book;
  }

  static updateBook(id, bookData) {
    const book = this.getBookById(id);
    if (!book) return null;
    
    book.update(bookData);
    return book;
  }

  static deleteBook(id) {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return null;
    
    return books.splice(index, 1)[0];
  }

  static updateStock(id, quantity) {
    const book = this.getBookById(id);
    if (!book) return null;
    
    book.stock = Math.max(0, book.stock + quantity);
    book.updatedAt = new Date().toISOString();
    return book;
  }
}

module.exports = { Book, BookService };
