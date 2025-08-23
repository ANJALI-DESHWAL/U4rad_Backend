import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../Components/AnimatedBackground";

const SandEPage = ({ currentUser }) => {
  const navigate = useNavigate();
  
  const [services, setServices] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/services/');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const servicesData = await response.json();
        setServices(servicesData);
        
        // Initialize cart items with zero quantities
        const initialCart = {};
        servicesData.forEach(service => {
          initialCart[service.id] = { 
            serviceId: service.id,
            name: service.name, 
            quantity: 0 
          };
        });
        setCartItems(initialCart);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Calculate amount based on service price ranges
  const calculateAmount = (service, quantity) => {
    if (!quantity || quantity <= 0) return 0;
    
    for (const priceRange of service.price_ranges) {
      if (quantity >= priceRange.start_quantity && quantity <= priceRange.end_quantity) {
        return quantity * parseFloat(priceRange.price);
      }
    }
    
    // If quantity exceeds all ranges, use the last (highest) range price
    const lastRange = service.price_ranges[service.price_ranges.length - 1];
    return quantity * parseFloat(lastRange.price);
  };

  const updateQuantity = (serviceId, quantity) => {
    setCartItems(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        quantity: quantity === "" ? "" : Math.max(0, parseInt(quantity) || 0)
      }
    }));
  };

  const getTotalAmount = () => {
    return Object.values(cartItems).reduce((sum, item) => {
      const service = services.find(s => s.id === item.serviceId);
      if (!service) return sum;
      return sum + calculateAmount(service, parseInt(item.quantity) || 0);
    }, 0);
  };

  const handleAddToCart = async () => {
    try {
      // Filter out items with zero quantity
      const itemsToAdd = Object.values(cartItems).filter(item => 
        parseInt(item.quantity) > 0
      );

      if (itemsToAdd.length === 0) {
        alert('Please add at least one item to cart');
        return;
      }

      // Prepare cart data for API
      const cartData = {
        client: currentUser.id, // You might need to get this from user context/auth
        order_id: `ORDER_${Date.now()}`, // Generate unique order ID
        services: itemsToAdd.map(item => {
          const service = services.find(s => s.id === item.serviceId);
          const amount = calculateAmount(service, parseInt(item.quantity));
          return {
            service: item.serviceId,
            quantity: parseInt(item.quantity),
            amount: amount.toFixed(2)
          };
        }),
        total_amount: getTotalAmount().toFixed(2),
        discount: "0.00",
        grand_total: getTotalAmount().toFixed(2),
        payment_status: false
      };

      const response = await fetch('http://127.0.0.1:8000/api/cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData)
      });

      if (!response.ok) {
        throw new Error('Failed to add items to cart');
      }

      const result = await response.json();
      
      // Navigate to cart page with the order data
      navigate("/cart", { 
        state: { 
          cartData: result,
          services: services,
          cartItems: itemsToAdd 
        } 
      });
      
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add items to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <AnimatedBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading services...</div>
        </div>
      </AnimatedBackground>
    );
  }

  if (error) {
    return (
      <AnimatedBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-xl">Error: {error}</div>
        </div>
      </AnimatedBackground>
    );
  }

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
              
              {services.map((service, index) => {
                const colors = ['blue', 'green', 'purple', 'orange', 'indigo', 'pink'];
                const color = colors[index % colors.length];
                
                return (
                  <div key={service.id} className="mb-6">
                    <h4 className={`text-${color}-600 font-semibold mb-3 border-l-4 border-${color}-600 pl-2`}>
                      {service.name}
                    </h4>
                    <div className="space-y-2">
                      {service.price_ranges.map((range) => (
                        <div 
                          key={range.id} 
                          className={`flex justify-between items-center bg-gray-50 p-3 rounded border-l-4 border-${color}-600`}
                        >
                          <span className="text-sm">
                            Quantity: {range.start_quantity} - {range.end_quantity}
                          </span>
                          <span className="text-red-600 font-bold">
                            Rate: ₹{parseFloat(range.price).toFixed(0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
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
                {services.map((service, index) => {
                  const colors = ['blue', 'green', 'purple', 'orange', 'indigo', 'pink'];
                  const color = colors[index % colors.length];
                  const cartItem = cartItems[service.id];
                  const quantity = cartItem ? parseInt(cartItem.quantity) || 0 : 0;
                  
                  return (
                    <div key={service.id} className="grid grid-cols-3 gap-4 p-3 border-b border-gray-100 items-center">
                      {/* Service Name with colored dot */}
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 bg-${color}-600`}></div>
                        <span className="text-sm">{service.name}</span>
                      </div>
                      
                      {/* Quantity Input */}
                      <div className="text-center">
                        <input
                          type="number"
                          min="0"
                          value={cartItem?.quantity === "" ? "" : cartItem?.quantity || ""}
                          onChange={(e) => updateQuantity(service.id, e.target.value)}
                          className="w-12 p-1 border border-gray-300 rounded text-center text-sm"
                        />
                      </div>
                      
                      {/* Amount */}
                      <div className="text-center text-green-600 font-bold text-sm">
                        ₹{calculateAmount(service, quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Amount Section */}
              <div className="mt-6 bg-red-50 p-4 rounded-lg">
                <div className="text-right">
                  <span className="text-lg font-semibold mr-4">Total Amount:</span>
                  <span className="text-2xl font-bold text-red-600">₹{getTotalAmount()}</span>
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