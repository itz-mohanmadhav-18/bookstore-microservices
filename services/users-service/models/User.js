const { v4: uuidv4 } = require('uuid');
const validator = require('validator');

class User {
  constructor(name, email, phone = '', address = '') {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
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

  static validateEmail(email) {
    return validator.isEmail(email);
  }

  static validatePhone(phone) {
    return !phone || validator.isMobilePhone(phone, 'any');
  }
}

// In-memory storage (in production, this would be a database)
const users = [
  new User(
    'John Doe',
    'john.doe@example.com',
    '+1234567890',
    '123 Main St, Anytown, USA'
  ),
  new User(
    'Jane Smith',
    'jane.smith@example.com',
    '+1987654321',
    '456 Oak Ave, Another City, USA'
  ),
  new User(
    'Alice Johnson',
    'alice.johnson@example.com',
    '+1555123456',
    '789 Pine Rd, Somewhere, USA'
  )
];

class UserService {
  static getAllUsers() {
    return users;
  }

  static getUserById(id) {
    return users.find(user => user.id === id);
  }

  static getUserByEmail(email) {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  static searchUsers(query) {
    const searchTerm = query.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  }

  static createUser(userData) {
    // Check if email already exists
    if (this.getUserByEmail(userData.email)) {
      throw new Error('Email already exists');
    }

    // Validate email
    if (!User.validateEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Validate phone if provided
    if (userData.phone && !User.validatePhone(userData.phone)) {
      throw new Error('Invalid phone format');
    }

    const user = new User(
      userData.name,
      userData.email,
      userData.phone,
      userData.address
    );
    users.push(user);
    return user;
  }

  static updateUser(id, userData) {
    const user = this.getUserById(id);
    if (!user) return null;

    // Check if email is being changed and if it already exists
    if (userData.email && userData.email !== user.email) {
      if (this.getUserByEmail(userData.email)) {
        throw new Error('Email already exists');
      }
      if (!User.validateEmail(userData.email)) {
        throw new Error('Invalid email format');
      }
    }

    // Validate phone if provided
    if (userData.phone !== undefined && userData.phone !== '' && !User.validatePhone(userData.phone)) {
      throw new Error('Invalid phone format');
    }
    
    user.update(userData);
    return user;
  }

  static deleteUser(id) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    return users.splice(index, 1)[0];
  }
}

module.exports = { User, UserService };
