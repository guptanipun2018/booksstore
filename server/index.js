const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors());

// Secret key (production me .env use karo)
const SECRET_KEY = "mysecretkey123";

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://nipunofficialcom_db_user:rkPl4RKR8aUyxInQ@cluster0.o3knnjk.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));


// -------------------- AUTH MIDDLEWARE --------------------
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


// -------------------- AUTH ROUTES --------------------
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ name, email, password });
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

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // JWT token generate
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


// -------------------- CART ROUTES (Protected) --------------------
app.post("/api/cart/add", authMiddleware, async (req, res) => {
  try {
    const { product } = req.body; 
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    const existing = user.cart.find(item => item.productId === product.productId);

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
