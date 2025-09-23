const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors());


const SECRET_KEY = "mysecretkey123";

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const Book = require("./models/book");
 

app.put("/api/cart/update", authMiddleware, async (req, res) => {
  try {
    const { productId, action } = req.body; // action = "increment" or "decrement"
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    const item = user.cart.find(i => i.productId.toString() === productId.toString());
    if (!item) return res.status(404).json({ error: "Item not found in cart" });

    if (action === "increment") {
      item.quantity += 1;
    } else if (action === "decrement") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        user.cart = user.cart.filter(i => i.productId !== productId);
      }
    }

    await user.save();
    res.json({ message: "Cart updated", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.post("/api/cart/remove", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart = user.cart.filter(item => item.productId !== productId);

    await user.save();
    res.json({ message: "Item removed", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


// -------------------- ADD NEW BOOK --------------------
app.post("/api/books", authMiddleware, async (req, res) => {
  try {
    const { name, author, price, image } = req.body;
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "seller") {
      return res.status(403).json({ error: "Only sellers can add books" });
    }

    if (!name || !author || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBook = new Book({ name, author, price, image,quantity:1 });
    await newBook.save();

    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/api/books/:id/decrease", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.quantity > 1) {
      book.quantity -= 1;
      await book.save();
    } else {
      await book.remove();
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// -------------------- REMOVE BOOK --------------------
app.delete("/api/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book removed" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"

  if (!token) return res.status(401).json({ error: "Access denied, token missing" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ name, email, password, role }); // ✅ role save
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.password !== password) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      role: user.role,  
      user
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});




app.post("/api/cart/add", authMiddleware, async (req, res) => {
  try {
    const { product } = req.body; 
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    const existing = user.cart.find(item => item.productId.toString() === product.productId.toString());

    if (existing) {
      existing.quantity += 1;
    } else {
      user.cart.push(product);
    }

    await user.save();
    res.json({ message: "Product added to cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/cart", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


// -------------------- USERS (For Admin / Testing) --------------------
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


// -------------------- DEPLOYMENT (Serve React Build) --------------------
app.use(express.static(path.join(__dirname, "../client/build")));  
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


// -------------------- SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
