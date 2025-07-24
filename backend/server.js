

const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer();

const express = require('express');

const mongoose = require('mongoose');
const {MainDocument , Buyer, Seller, Product} = require('./models'); // Import the model

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Connect to MongoDB (change the connection string as needed)
mongoose.connect("mongodb+srv://sravyareddy:sravya123@sravya.q44m0bl.mongodb.net/states_data?retryWrites=true&w=majority&appName=sravya", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// sellerId: new mongoose.Types.ObjectId(sellerId),
// Set up your server
app.get('/api/data', async (req, res) => {
  try {
    // Fetch the main document that contains all states (ap, tn, ts, etc.)
    const mainDocument = await MainDocument.findOne();

    if (!mainDocument) {
      return res.status(404).json({ message: 'No data found' });
    }

    // Return the entire document, which includes all states
    const { _id, ...stateData } = mainDocument.toObject(); // remove _id
    res.json(stateData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/register', async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (userType === 'buyer') {
      const existingBuyer = await Buyer.findOne({ email });
      if (existingBuyer) {
        return res.status(400).json({ message: 'Email already registered as Buyer' });
      }

      const newBuyer = new Buyer({ username, email, password: hashedPassword });
      await newBuyer.save();

      return res.status(201).json({ message: 'Buyer registered successfully' });
    } 
    
    else if (userType === 'seller') {
      const existingSeller = await Seller.findOne({ email });
      if (existingSeller) {
        return res.status(400).json({ message: 'Email already registered as Seller' });
      }

      const newSeller = new Seller({ username, email, password: hashedPassword });
      await newSeller.save();

      return res.status(201).json({ message: 'Seller registered successfully' });
    } 
    
    else {
      return res.status(400).json({ message: 'Invalid user type' });
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});


// ✅ LOGIN ROUTE
app.post('/api/login', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user;

    if (userType === 'buyer') {
      user = await Buyer.findOne({ email });
    } else if (userType === 'seller') {
      user = await Seller.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: `${userType} login successful`, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});
app.post('/api/add-product', upload.single('image'), async (req, res) => {
  const { sellerId, productName, description, price, quantity, category , artisan,tribe, region , material  } = req.body;
  const tags = JSON.parse(req.body.tags || '[]');
  const imageBuffer = req.file.buffer.toString('base64'); // or store to cloud and save URL

  try {
    const newProduct = new Product({
      sellerId,
      productName,
      description,
      price: Number(price),
      quantity: Number(quantity),
      category,
      tags,
      artisan,
      tribe,
      region,
      material,
      imageUrl: `data:${req.file.mimetype};base64,${imageBuffer}`
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.error('Product add error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// app.get('/api/products/:sellerId', async (req, res) => {
//   try {
//     const products = await Product.find({ sellerId: req.params.sellerId });
//     res.status(200).json(products);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// GET /api/products?sellerId=123
app.get('/api/products', async (req, res) => {
  const { sellerId } = req.query;
  try {
    const products = await Product.find({ sellerId });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
