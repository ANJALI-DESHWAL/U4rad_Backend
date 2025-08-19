import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../Components/AnimatedBackground";

// Pricing logic
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

const SandEPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    { name: "XRAY", quantity: 0 },
    { name: "CT", quantity: 0 },
    { name: "MRI", quantity: 0 },
    { name: "Mammo", quantity: 0 },
  ]);

  const updateQuantity = (index, quantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity =
      quantity === "" ? "" : Math.max(0, parseInt(quantity) || 0);
    setCartItems(updatedItems);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + calculateAmount(item),
    0
  );

  const handleAddToCart = () => {
    // Store in memory instead of localStorage for artifacts
    navigate("/cart", { state: { cartItems, totalAmount } });
  };

  return (
    <AnimatedBackground>
      <div className="min-h-screen relative z-10">
        {/* Tabs */}
        <div className="w-full bg-black/30 py-4 flex justify-center">
          <div className="space-x-4">
            <button className="px-6 py-2 rounded-full text-white text-sm font-semibold bg-red-600">
              Service Rates & Estimator
            </button>
            <button className="px-6 py-2 rounded-full text-white text-sm font-semibold bg-gray-600">
              Shopping Cart
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-center p-6">
          <div className="grid lg:grid-cols-2 gap-6 w-full max-w-6xl">
            {/* Service Rates Panel */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-6 border-b-2 border-red-500 pb-2">Service Rates</h3>
              
              {/* XRAY */}
              <div className="mb-6">
                <h4 className="text-blue-600 font-semibold mb-3 border-l-4 border-blue-600 pl-2">XRAY</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded border-l-4 border-blue-600">
                    <span className="text-sm">Quantity: 1 - 50</span>
                    <span className="text-red-600 font-bold">Rate: ₹30</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded border-l-4 border-blue-600">
                    <span className="text-sm">Quantity: 51 - 100</span>
                    <span className="text-red-600 font-bold">Rate: ₹50</span>
                  </div>
                </div>
              </div>

              {/* CT */}
              <div className="mb-6">
                <h4 className="text-green-600 font-semibold mb-3 border-l-4 border-green-600 pl-2">CT</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded border-l-4 border-green-600">
                    <span className="text-sm">Quantity: 1 - 50</span>
                    <span className="text-red-600 font-bold">Rate: ₹90</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded border-l-4 border-green-600">
                    <span className="text-sm">Quantity: 51 - 100</span>
                    <span className="text-red-600 font-bold">Rate: ₹120</span>
                  </div>
                </div>
              </div>

              {/* MRI */}
              <div className="mb-6">
                <h4 className="text-purple-600 font-semibold mb-3 border-l-4 border-purple-600 pl-2">MRI</h4>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded border-l-4 border-purple-600">
                  <span className="text-sm">Quantity: 1 - 20</span>
                  <span className="text-red-600 font-bold">Rate: ₹500</span>
                </div>
              </div>

              {/* Mammo */}
              <div>
                <h4 className="text-orange-600 font-semibold mb-3 border-l-4 border-orange-600 pl-2">Mammo</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded border-l-4 border-orange-600">
                    <span className="text-sm">Quantity: 1 - 10</span>
                    <span className="text-red-600 font-bold">Rate: ₹500</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded border-l-4 border-orange-600">
                    <span className="text-sm">Quantity: 11 - 20</span>
                    <span className="text-red-600 font-bold">Rate: ₹400</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimator Panel */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-6 border-b-2 border-red-500 pb-2">Estimator</h3>

              {/* Table Header */}
              <div className="bg-gray-700 text-white rounded-t-lg">
                <div className="grid grid-cols-3 gap-4 p-3 text-sm font-semibold">
                  <div>Service Name</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-center">Amount (₹)</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="border border-gray-200 rounded-b-lg">
                {cartItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-3 border-b border-gray-100 items-center">
                    {/* Service Name with colored dot */}
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        item.name === 'XRAY' ? 'bg-blue-600' :
                        item.name === 'CT' ? 'bg-green-600' :
                        item.name === 'MRI' ? 'bg-purple-600' :
                        'bg-orange-600'
                      }`}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    
                    {/* Quantity Input */}
                    <div className="text-center">
                      <input
                        type="number"
                        min="0"
                        value={item.quantity === "" ? "" : item.quantity}
                        onChange={(e) => updateQuantity(index, e.target.value)}
                        className="w-12 p-1 border border-gray-300 rounded text-center text-sm"
                      />
                    </div>
                    
                    {/* Amount */}
                    <div className="text-center text-green-600 font-bold text-sm">
                      ₹{calculateAmount(item)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Amount Section */}
              <div className="mt-6 bg-red-50 p-4 rounded-lg">
                <div className="text-right">
                  <span className="text-lg font-semibold mr-4">Total Amount:</span>
                  <span className="text-2xl font-bold text-red-600">₹{totalAmount}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full mt-4 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default SandEPage;