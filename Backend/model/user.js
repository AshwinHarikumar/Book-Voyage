const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  rentedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Assuming 'Book' is the name of your book model
  }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

// // Hash the password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Method to rent a book
userSchema.methods.rentBook = async function(bookId) {
  if (!this.rentedBooks.includes(bookId)) {
    this.rentedBooks.push(bookId);
    await this.save();
  }
};

// Method to return a book
userSchema.methods.returnBook = async function(bookId) {
  this.rentedBooks = this.rentedBooks.filter(book => book.toString() !== bookId.toString());
  await this.save();
};

module.exports = mongoose.model('User', userSchema);

