import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import {
  getProductById,
  getReviews,
  createReview,
  getProducts,
} from "../services/api.js";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prod = await getProductById(id);
        setProduct(prod);

        const revs = await getReviews(id);
        setReviews(revs);

        const all = await getProducts();
        setRelated(all.filter((p) => p._id !== id).slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(id, reviewForm);
      setReviews([...reviews, { ...reviewForm, createdAt: new Date() }]);
      setReviewForm({ name: "", rating: 5, comment: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "highest") return b.rating - a.rating;
    return 0;
  });

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Breadcrumb / Back */}
      <Link to="/products" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="grid grid-cols-2 gap-2">
          <img
            src={product.image || "https://via.placeholder.com/500"}
            alt={product.name}
            className="col-span-2 w-full h-80 object-cover rounded-lg hover:scale-105 transition-transform"
          />
          {product.images?.slice(0, 2).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`alt-${idx}`}
              className="w-full h-40 object-cover rounded hover:scale-105 transition-transform"
            />
          ))}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mt-24">{product.name}</h1>
          <p className="text-xl text-blue-600 mb-6">KES {product.price}</p>

          {/* Stock Progress */}
          {product.stock > 0 ? (
            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className="bg-blue-600 h-2 rounded"
                  style={{ width: `${(product.stock / product.initialStock) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {product.stock} of {product.initialStock} left
              </p>
            </div>
          ) : (
            <p className="text-red-600 font-semibold">Out of stock</p>
          )}

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="flex items-center gap-6 my-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-1 bg-gray-300 rounded text-black"
              >
                -
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-1 bg-blue-600 rounded text-white"
              >
                +
              </button>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => addToCart(product, qty)}
              disabled={product.stock <= 0}
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-300"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product, qty);
                navigate("/checkout");
              }}
              disabled={product.stock <= 0}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-24">
        <h2 className="text-3xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Reviews */}
      <div className="mt-24">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

        {/* Sort */}
        <div className="mb-4">
          <label className="mr-2">Sort by:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rating</option>
          </select>
        </div>

        <div className="space-y-3">
          {sortedReviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            sortedReviews.map((r, i) => (
              <div key={i} className="border rounded p-3 shadow-sm">
                <p className="font-semibold">{r.name}</p>
                <p>{"⭐".repeat(r.rating)}</p>
                <p>{r.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mt-6 space-y-3">
          <h3 className="font-semibold">Leave a Review</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={reviewForm.name}
            onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
            className="border w-full px-3 py-2 rounded"
            required
          />
          <select
            value={reviewForm.rating}
            onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
            className="border w-full px-3 py-2 rounded"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Your review..."
            value={reviewForm.comment}
            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
            className="border w-full px-3 py-2 rounded"
            rows="3"
            required
          ></textarea>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit Review
          </button>
        </form>
      </div>

      {/* Related Products 
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <Link
              to={`/products/${p._id}`}
              key={p._id}
              className="border rounded shadow hover:shadow-lg p-3"
            >
              <img
                src={r.image || "https://via.placeholder.com/200"}
                alt={r.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{r.name}</h3>
              <p className="text-blue-600">KES {r.price}</p>
            </Link>
          
        </div>
      </div>*/}

      {/* Share */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-2">Share this product</h2>
        <div className="flex gap-3">
          <a
            href={`https://wa.me/?text=Check%20out%20this%20product:%20${window.location.href}`}
            target="_blank"
            rel="noreferrer"
            className="text-green-600 underline"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline"
          >
            Facebook
          </a>
          <a href={`mailto:?subject=Check%20this%20out&body=${window.location.href}`} className="text-red-600 underline">
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
