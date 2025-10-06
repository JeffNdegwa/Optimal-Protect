// backend/controllers/orderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { sendOrderEmail, orderEmailHtml } from "../utils/emailService.js";
import { sendSms, orderSmsText } from "../utils/smsService.js";

// create order — assumes req.validatedBody exists (from validate middleware)
export const createOrder = async (req, res) => {
  try {
    const {
      name, email, phone, address, cart, cartTotal
    } = req.validatedBody ?? req.body;

    // Check stock & existence
    for (const item of cart) {
      const prod = await Product.findById(item._id);
      if (!prod) return res.status(404).json({ message: `${item.name} not found` });
      if (prod.stock < item.qty) return res.status(400).json({ message: `Only ${prod.stock} ${prod.name} available` });
    }

    // Deduct stock (atomic-ish per product)
    for (const item of cart) {
      await Product.findByIdAndUpdate(item._id, { $inc: { stock: -item.qty } });
    }

    const newOrder = new Order({
      name, email, phone, address,
      items: cart.map(it => ({ productId: it._id, name: it.name, qty: it.qty, price: it.price })),
      total: cartTotal,
      status: "pending",
    });

    const saved = await newOrder.save();

    // Send notifications (do not block on failures)
    try {
      const html = orderEmailHtml(saved);
      await sendOrderEmail(email, `Order received — ${saved._id}`, html);
    } catch (err) {
      console.error("Email send failed:", err);
    }

    try {
      const sms = orderSmsText(saved);
      await sendSms(phone, sms);
    } catch (err) {
      console.error("SMS send failed:", err);
    }

    return res.status(201).json(saved);
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
