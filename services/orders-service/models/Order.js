const { v4: uuidv4 } = require('uuid');

class Order {
  constructor(userId, items) {
    this.id = uuidv4();
    this.userId = userId;
    this.items = items; // Array of { bookId, quantity, price }
    this.totalAmount = this.calculateTotal();
    this.status = 'pending';
    this.orderDate = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  updateStatus(newStatus) {
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error('Invalid status');
    }
    this.status = newStatus;
    this.updatedAt = new Date().toISOString();
  }

  addItem(bookId, quantity, price) {
    const existingItem = this.items.find(item => item.bookId === bookId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ bookId, quantity, price });
    }
    this.totalAmount = this.calculateTotal();
    this.updatedAt = new Date().toISOString();
  }

  removeItem(bookId) {
    this.items = this.items.filter(item => item.bookId !== bookId);
    this.totalAmount = this.calculateTotal();
    this.updatedAt = new Date().toISOString();
  }
}

// In-memory storage (in production, this would be a database)
const orders = [
  // Sample orders for demonstration
  new Order('user-1', [
    { bookId: 'book-1', quantity: 2, price: 12.99 },
    { bookId: 'book-2', quantity: 1, price: 14.99 }
  ]),
  new Order('user-2', [
    { bookId: 'book-3', quantity: 1, price: 45.99 }
  ])
];

// Update sample order statuses
orders[0].updateStatus('confirmed');
orders[1].updateStatus('shipped');

class OrderService {
  static getAllOrders() {
    return orders;
  }

  static getOrderById(id) {
    return orders.find(order => order.id === id);
  }

  static getOrdersByUserId(userId) {
    return orders.filter(order => order.userId === userId);
  }

  static getOrdersByStatus(status) {
    return orders.filter(order => order.status === status);
  }

  static createOrder(orderData) {
    // Validate items
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    // Validate each item
    for (const item of orderData.items) {
      if (!item.bookId || !item.quantity || !item.price) {
        throw new Error('Each item must have bookId, quantity, and price');
      }
      if (item.quantity <= 0 || item.price <= 0) {
        throw new Error('Quantity and price must be positive numbers');
      }
    }

    const order = new Order(orderData.userId, orderData.items);
    orders.push(order);
    return order;
  }

  static updateOrderStatus(id, status) {
    const order = this.getOrderById(id);
    if (!order) return null;
    
    order.updateStatus(status);
    return order;
  }

  static deleteOrder(id) {
    const index = orders.findIndex(order => order.id === id);
    if (index === -1) return null;
    
    return orders.splice(index, 1)[0];
  }

  static addItemToOrder(orderId, bookId, quantity, price) {
    const order = this.getOrderById(orderId);
    if (!order) return null;
    
    if (order.status !== 'pending') {
      throw new Error('Cannot modify order that is not pending');
    }
    
    order.addItem(bookId, quantity, price);
    return order;
  }

  static removeItemFromOrder(orderId, bookId) {
    const order = this.getOrderById(orderId);
    if (!order) return null;
    
    if (order.status !== 'pending') {
      throw new Error('Cannot modify order that is not pending');
    }
    
    order.removeItem(bookId);
    return order;
  }

  static getOrderStats() {
    const stats = {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      statusBreakdown: {}
    };

    // Count orders by status
    orders.forEach(order => {
      stats.statusBreakdown[order.status] = (stats.statusBreakdown[order.status] || 0) + 1;
    });

    return stats;
  }
}

module.exports = { Order, OrderService };
