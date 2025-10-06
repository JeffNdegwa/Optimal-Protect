// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();

const products = [
  {
    name: "N95 Respirator Mask",
    description: "High-quality N95 respirator for superior protection.",
    price: 250,
    stock: 120,
    image: "https://images.unsplash.com/photo-1583947582882-1bdf0bd18a76?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=... (replace with real url)",
  },
  {
    name: "Disposable Gloves (Box of 100)",
    description: "Powder-free nitrile gloves for medical and general use.",
    price: 1800,
    stock: 80,
    image: "https://images.unsplash.com/photo-1582719478185-... (replace)",
  },
  {
    name: "Safety Helmet",
    description: "Hard hat with adjustable suspension suitable for construction.",
    price: 2000,
    stock: 40,
    image: "https://images.unsplash.com/photo-152... (replace)",
  },
  {
    name: "Face Shield",
    description: "Full face shield for splash protection.",
    price: 450,
    stock: 200,
    image: "https://images.unsplash.com/photo-158... (replace)",
  },
  {
    name: "Disposable Coveralls",
    description: "Single use coveralls for chemical/biological risk protection.",
    price: 1200,
    stock: 60,
    image: "https://images.unsplash.com/photo-158... (replace)",
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Seeded products");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

importData();
