import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AnimatedBackground from "../Components/AnimatedBackground";

// --- Shared pricing logic ---
const calculateAmount = (item) => {
  const quantity = parseInt(item.quantity) || 0;

  switch (item.name) {
    case "XRAY":
      return quantity <= 50
        ? quantity * 30
        : 50 * 30 + (quantity - 50) * 50;
    case "CT":
      return quantity <= 50
        ? quantity * 90
        : 50 * 90 + (quantity - 50) * 120;
    case "MRI":
      return quantity * 500;
    case "Mammo":
      return quantity <= 10
        ? quantity * 500
        : 10 * 500 + (quantity - 10) * 400;
    default:
      return 0;
  }
};

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Load cart from navigation state (or default)
  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
    } else {
      setCartItems([
        { name: "XRAY", quantity: 0 },
        { name: "CT", quantity: 0 },
        { name: "MRI", quantity: 0 },
        { name: "Mammo", quantity: 0 },
      ]);
    }
  }, [location.state]);

  // Recalc subtotal & grand total
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + calculateAmount(item),
      0
    );
    setSubtotal(newSubtotal);
    setGrandTotal(newSubtotal - discount);
  }, [cartItems, discount]);

  // Apply Promo Code
  const applyPromo = () => {
    let discountValue = 0;

    if (promoCode === "SAVE10") {
      discountValue = subtotal * 0.1;
    } else if (promoCode === "FIRST20") {
      discountValue = subtotal * 0.2;
    } else {
      alert("Invalid promo code!");
      return;
    }

    setDiscount(discountValue);
    setGrandTotal(subtotal - discountValue);
  };

  return (
    <AnimatedBackground>
      <div className="min-h-screen relative z-10">
        {/* Tabs */}
        <div className="w-full bg-black/30 py-4 flex justify-center">
          <div className="space-x-4">
            <button
              onClick={() => navigate('/sande')}
              className="px-6 py-2 rounded-full text-white text-sm font-semibold bg-gray-600"
            >
              Service Rates & Estimator
            </button>
            <button className="px-6 py-2 rounded-full text-white text-sm font-semibold bg-red-600">
              Shopping Cart
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-center p-6">
          <div className="w-full max-w-4xl">
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              {/* Header */}
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-red-500 pb-2">
                Shopping Cart
              </h2>

              {/* Cart Table Header */}
              <div className="bg-gray-700 text-white rounded-t-lg">
                <div className="grid grid-cols-5 gap-4 p-3 text-sm font-semibold">
                  <div>Service Name</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-center">Rate</div>
                  <div className="text-center">Amount (₹)</div>
                  <div className="text-center">Action</div>
                </div>
              </div>

              {/* Empty or Populated Cart */}
              {cartItems.every((item) => item.quantity === 0) ? (
                <div className="border border-gray-200 rounded-b-lg mb-6">
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-lg">Your cart is empty</p>
                    <p className="text-sm mt-2">
                      Add items from the Service Rates & Estimator to see them here
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-b-lg mb-6">
                  {cartItems.map((item, index) => (
                    item.quantity > 0 && (
                      <div key={index} className="grid grid-cols-5 gap-4 p-3 border-b border-gray-100 items-center">
                        <div>{item.name}</div>
                        <div className="text-center">{item.quantity}</div>
                        <div className="text-center">₹{calculateAmount({ ...item, quantity: 1 })}</div>
                        <div className="text-center">₹{calculateAmount(item)}</div>
                        <div className="text-center">-</div>
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Promo Code Section */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <span className="font-semibold mr-3 text-sm">Add Promo Code:</span>
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-48"
                  />
                  <button
                    onClick={applyPromo}
                    className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
                  >
                    Apply
                  </button>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-sm">Subtotal: ₹{subtotal}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="text-right mb-6">
                {discount > 0 && (
                  <p className="text-green-600 mb-2">
                    Discount Applied: -₹{discount.toFixed(2)}
                  </p>
                )}
                <p className="text-xl font-bold text-green-600">
                  Grand Total: ₹{grandTotal.toFixed(2)}
                </p>
              </div>

              {/* Proceed to Pay Button */}
              <button
                onClick={() => alert("Redirecting to Payment...")}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition text-lg"
              >
                Proceed to Pay ₹{grandTotal.toFixed(2)}
              </button>

              {/* Available Promo Codes */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Available Promo Codes:
                </p>
                <p className="text-blue-600 text-sm font-semibold">SAVE10 - Get 10% discount</p>
                <p className="text-blue-600 text-sm font-semibold">FIRST20 - Get 20% discount (first time users)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default CartPage;
