// backend/utils/smsService.js
import Twilio from "twilio";

const sid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_FROM;

const client = Twilio(sid, token);

export async function sendSms(to, body) {
  if (!sid || !token || !from) {
    console.warn("Twilio not configured — SMS not sent");
    return;
  }
  return client.messages.create({
    body,
    from,
    to,
  });
}

export function orderSmsText(order) {
  return `Order received: ${order._id}\nTotal: KES ${order.total.toFixed(2)}\nWe'll contact you on ${order.phone} to complete payment.`;
}
