const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isRented: { type: Boolean, default: false },
  rentedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  dueDate: { type: Date, default: null },
  rentedCount: { type: Number, default: 0 }
});

// Method to rent a book
bookSchema.methods.rent = async function(userId, duration) {
  if (!this.isRented) {
    this.isRented = true;
    this.rentedBy = userId;
    this.dueDate = new Date(Date.now() + duration); // Duration in milliseconds
    this.rentedCount += 1;
    await this.save();
  }
};

// Method to return a book
bookSchema.methods.returnBook = async function() {
  if (this.isRented) {
    this.isRented = false;
    this.rentedBy = null;
    this.dueDate = null;
    await this.save();
  }
};

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
