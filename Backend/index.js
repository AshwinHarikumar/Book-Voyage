const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('./model/user');
const Book = require('./model/book');
require('./connection');
const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());

const secretKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxOTc0ODE3OCwiaWF0IjoxNzE5NzQ4MTc4fQ.-OsaQTKasMur_1btIWBWvjm4ElXLZ4BXPeqSkjIGZJU'; // Replace with your actual secret key


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  }
});

//  set up a default admin user
async function setupDefaultAdmin() {
  try {
    const adminUser = await User.findOne({ email: 'admin5@example.com' });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('$2y$10$sM0/lkg8Wjr.T9nArK.jgugMb9cbOLSBMxuXokNZ9QDlNpP4eESi2', 10); // Replace with a secure password
      const newAdmin = new User({
        name: 'Admin User',
        email: 'admin5@example.com',
        password: hashedPassword,
        isAdmin: true
      });
      await newAdmin.save();
      console.log('Default admin user created:', newAdmin);
    } else {
      console.log('Admin user already exists:', adminUser);
    }
  } catch (error) {
    console.error('Error setting up default admin user:', error.message);
  }
}


setupDefaultAdmin();

const upload = multer({ storage });

// Register route
app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, age, place, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      age,
      place,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).send({ message: "Error registering user" });
  }
});



// Login route

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email); 

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: 'Authentication failed. User not found.' });
    }

    console.log('User found:', user); 

    // Check if the user is an admin
    if (user.role === 'admin') {
      const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });
      return res.send({ message: 'Admin authentication successful', token, userId: user._id, role: user.role });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ message: 'Authentication failed. Wrong password.' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });

    res.send({ message: 'User authentication successful', token, userId: user._id, role: user.role });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).send({ message: 'Error logging in' });
  }
});


// Get all books route
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Error fetching books" });
  }
});

// Delete book by ID route
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    // Delete associated image file (if exists and is local)
    if (book.image && !book.image.startsWith('http')) {
      const imagePath = path.join(__dirname, 'uploads', book.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Book.findByIdAndDelete(id);
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Error deleting book" });
  }
});

// Update book by ID route
app.put('/books/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, image: imageUrl } = req.body;
    let image;

    // Check if a new file is uploaded
    if (req.file) {
      image = req.file.filename;
    } else if (imageUrl && imageUrl.startsWith('http')) {
      
      image = imageUrl;
    } else {
      
      const existingBook = await Book.findById(id);
      if (!existingBook) {
        return res.status(404).send({ message: "Book not found" });
      }
      image = existingBook.image;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, description, image },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.send({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Error updating book" });
  }
});

// Add new book route with image upload or URL
app.post('/books', upload.single('image'), async (req, res) => {
  try {
    const { title, author, description } = req.body;
    let image;

    // Check if image file is uploaded
    if (req.file) {
      image = req.file.filename;
    } else if (req.body.image) {
      // Use provided image URL
      image = req.body.image;
    } else {
      return res.status(400).send({ message: "Image or Image URL is required" });
    }

    const newBook = new Book({
      title,
      author,
      description,
      image
    });

    await newBook.save();
    res.status(201).send({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Error adding book" });
  }
});
app.post('/users/:userId/rent', async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
      const user = await User.findById(userId);
      user.rentedBooks.push(bookId); // Update the rentedBooks array
      await user.save();
      res.json({ success: true });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update rented books.' });
  }
});

// Add to favorites
router.post('/:userId/favorites', async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      await user.save();
    }

    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from favorites
router.delete('/:userId/favorites/:bookId', async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter((fav) => fav.toString() !== bookId);
    await user.save();

    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;



app.get('/users/:userId/rentedBooks', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('rentedBooks');

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.send(user.rentedBooks);
  } catch (error) {
    console.error('Error fetching rented books:', error.message);
    res.status(500).send({ message: 'Error fetching rented books' });
  }
});

app.post('/users/:userId/return', async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    
    user.rentedBooks = user.rentedBooks.filter(book => book.toString() !== bookId);
    await user.save();

    res.json(user.rentedBooks);
  } catch (error) {
    console.error('Error while returning book:', error.message);
    res.status(500).json({ success: false, message: 'Failed to return the book.' });
  }
});

app.post('/users/:userId/returnBook', async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    
    user.rentedBooks = user.rentedBooks.filter(book => book.toString() !== bookId);
    await user.save();

    res.json(user.rentedBooks);
  } catch (error) {
    console.error('Error while returning book:', error.message);
    res.status(500).json({ success: false, message: 'Failed to return the book.' });
  }
});

app.post('/checkout', async (req, res) => {
  const rentedBooks = req.body; // Expecting an array of { id, title }

  try {
    // Loop through rented books to process them
    for (const book of rentedBooks) {
      const foundBook = await Book.findById(book.id);
      if (foundBook) {
        foundBook.isRented = true; // Update the rental status
        foundBook.rentedCount += 1; // Increment rented count
        await foundBook.save(); // Save changes
      }
    }

    console.log('Rented books:', rentedBooks);
    res.send({ success: true, message: "Checkout completed successfully." });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).send({ message: "Error during checkout" });
  }
});


// Get all users route
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log('Fetched users:', users); 
    res.json(users); 
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send({ message: "Error fetching users" });
  }
});

// Get user by ID route
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Error fetching user" });
  }
});

// Update user by ID route
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Error updating user" });
  }
});

// Delete user by ID route
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Error deleting user" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
