// frontend/src/pages/Contact.jsx
import { useState } from "react";
import { sendContactMessage } from "../services/api.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await sendContactMessage(form);
      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      {/* Contact Form */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            rows="5"
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Contact Info + Map */}
      <div className="space-y-6 mt-12 max-w-auto">
        {/* Info card */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg mb-3">Our Office</h3>
          <p>123 PPE Street, Industrial Area</p>
          <p>Nairobi, Kenya</p>
          <p className="mt-2">Phone: +254 726 159131</p>
          <p>Email: contact@optimalprotect.com</p>

          <div className="mt-4 flex gap-3">
            <a
              href="https://wa.me/254700123456"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              WhatsApp
            </a>
            <a href="mailto:contact@optimalprotect.com" className="bg-gray-700 text-white px-3 py-1 rounded">
              Email
            </a>
          </div>
        </div>

        {/* Map card */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold text-lg mb-3">Find Us</h3>
          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.6257486829492!2d36.834254!3d-1.292066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10e728e67dcd%3A0xe63b47c5d7c7e1e0!2sIndustrial%20Area%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1670000000000!5m2!1sen!2ske"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
