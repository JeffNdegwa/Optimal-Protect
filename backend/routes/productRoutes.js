import express from "express";
import multer from "multer";
import { cloudinary, upload } from "../config/cloudinary.js";
import Product from "../models/Product.js";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();
//const upload = multer({ storage: multer.memoryStorage() }); // use memory storage for buffer

router.get("/", getProducts);
router.get("/:id", getProductById);

// POST /api/products (admin only)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      // upload buffer to cloudinary
      const uploadRes = await cloudinary.uploader.upload_stream(
        { folder: "ppe-products" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            return res.status(500).json({ message: "Image upload failed" });
          }
          imageUrl = result.secure_url;

          // now save product with image URL
          const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image: imageUrl,
          });

          product.save()
            .then((saved) => res.status(201).json(saved))
            .catch((err) => {
              console.error(err);
              res.status(500).json({ message: "Failed to save product" });
            });
        }
      );

      // Write file buffer into stream
      uploadRes.end(req.file.buffer);
    } else {
      return res.status(400).json({ message: "Image is required" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Add new product ---
router.post("/", async (req, res) => {
  try {
    const { name, price, description, imageUrl, stock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      image: imageUrl,
      stock,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// --- Get all products ---
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// --- Get product by ID ---
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

export default router;