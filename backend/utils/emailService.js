// backend/utils/emailService.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOrderEmail(to, subject, html) {
  const msg = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  };
  return transporter.sendMail(msg);
}

export function orderEmailHtml(order) {
  const itemsHtml = order.items.map(it => `<li>${it.name} x${it.qty} — KES ${(it.price * it.qty).toFixed(2)}</li>`).join("");
  return `
    <h2>Order Confirmation — ${order._id}</h2>
    <p>Thank you, ${order.name}! We received your order.</p>
    <p><strong>Order Total:</strong> KES ${order.total.toFixed(2)}</p>
    <h4>Shipping to:</h4>
    <p>${order.address}</p>
    <h4>Items</h4>
    <ul>${itemsHtml}</ul>
    <p>We will contact you on ${order.phone} for payment confirmation.</p>
  `;
}
