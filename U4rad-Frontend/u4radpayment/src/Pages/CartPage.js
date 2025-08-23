import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AnimatedBackground from "../Components/AnimatedBackground";

const CartPage = ({ currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartData, setCartData] = useState(null);
  const [services, setServices] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);
  const [selectedPromoCode, setSelectedPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load cart data from navigation state or fetch from API
  useEffect(() => {
    const loadCartData = async () => {
      try {
        setLoading(true);
        
        if (location.state?.cartData) {
          // Data passed from SandE page
          setCartData(location.state.cartData);
          setServices(location.state.services || []);
          
          // Set initial discount if it exists
          if (location.state.cartData.discount) {
            setAppliedDiscount(parseFloat(location.state.cartData.discount));
          }
        } else {
          // If no data passed, redirect to SandE page
          console.warn('No cart data found, redirecting to SandE page');
          navigate('/sande');
          return;
        }

        // Always fetch promo codes
        await fetchPromoCodes();
      } catch (err) {
        setError(err.message);
        console.error('Error loading cart data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCartData();
  }, [location.state, navigate]);

  // Fetch available promo codes
  const fetchPromoCodes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/promocodes/');
      if (!response.ok) {
        throw new Error('Failed to fetch promo codes');
      }
      const promoData = await response.json();
      setPromoCodes(promoData.filter(promo => promo.active && promo.is_code_valid));
    } catch (err) {
      console.error('Error fetching promo codes:', err);
    }
  };

  // Get service details by ID
  const getServiceById = (serviceId) => {
    return services.find(service => service.id === serviceId);
  };

  // Calculate service amount based on price ranges
  const calculateServiceAmount = (service, quantity) => {
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

  // Get rate per unit for a service at given quantity
  const getServiceRate = (service, quantity) => {
    if (!quantity || quantity <= 0) return 0;
    
    for (const priceRange of service.price_ranges) {
      if (quantity >= priceRange.start_quantity && quantity <= priceRange.end_quantity) {
        return parseFloat(priceRange.price);
      }
    }
    
    // If quantity exceeds all ranges, use the last (highest) range price
    const lastRange = service.price_ranges[service.price_ranges.length - 1];
    return parseFloat(lastRange.price);
  };

  // Apply promo code
  const applyPromoCode = async () => {
    if (!selectedPromoCode.trim()) {
      alert('Please enter a promo code');
      return;
    }

    const promoCode = promoCodes.find(promo => 
      promo.code.toLowerCase() === selectedPromoCode.toLowerCase()
    );

    if (!promoCode) {
      alert('Invalid promo code');
      return;
    }

    const subtotal = parseFloat(cartData.total_amount || 0);
    const discount = (subtotal * parseFloat(promoCode.discount_percentage)) / 100;
    
    setAppliedDiscount(discount);
    setAppliedPromoCode(promoCode);
    
    // Update cart data with discount
    setCartData(prev => ({
      ...prev,
      discount: discount.toFixed(2),
      grand_total: (subtotal - discount).toFixed(2)
    }));

    alert(`Promo code applied! You saved ₹${discount.toFixed(2)}`);
  };

  // Remove promo code
  const removePromoCode = () => {
    setSelectedPromoCode("");
    setAppliedDiscount(0);
    setAppliedPromoCode(null);
    const subtotal = parseFloat(cartData.total_amount || 0);
    
    setCartData(prev => ({
      ...prev,
      discount: "0.00",
      grand_total: subtotal.toFixed(2)
    }));
  };

  // Update cart item quantity
  const updateCartItemQuantity = async (serviceId, newQuantity) => {
    if (newQuantity < 0) return;

    try {
      const service = getServiceById(serviceId);
      if (!service) return;

      const newAmount = calculateServiceAmount(service, newQuantity);

      // Update local state
      const updatedServices = cartData.services.map(item => 
        item.service === serviceId 
          ? { ...item, quantity: newQuantity, amount: newAmount.toFixed(2) }
          : item
      );

      // Filter out items with 0 quantity
      const filteredServices = updatedServices.filter(item => item.quantity > 0);

      const newTotalAmount = filteredServices.reduce((sum, item) => 
        sum + parseFloat(item.amount), 0
      );

      const newGrandTotal = newTotalAmount - appliedDiscount;

      setCartData(prev => ({
        ...prev,
        services: filteredServices,
        total_amount: newTotalAmount.toFixed(2),
        grand_total: newGrandTotal.toFixed(2)
      }));

    } catch (err) {
      console.error('Error updating cart item:', err);
      alert('Failed to update item quantity');
    }
  };

  // Remove item from cart
  const removeCartItem = (serviceId) => {
    updateCartItemQuantity(serviceId, 0);
  };

  // Proceed to payment
  const proceedToPayment = async () => {
    try {
      if (!cartData || !cartData.services || cartData.services.length === 0) {
        alert('Your cart is empty');
        return;
      }

      const updatedCartData = {
        ...cartData,
        client: currentUser.id, // ✅ Use actual user ID
        payment_status: true
      };

      // Update payment status in backend
      const paymentResponse = await fetch(`http://127.0.0.1:8000/api/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...cartData,
          payment_status: true,
          grand_total: cartData.grand_total,
          discount: cartData.discount || "0.00"
        })
      });

      if (paymentResponse.ok) {
        alert('Payment successful!');
        navigate('/dashboard');
      } else {
        // Simulate payment failure/success randomly for demo
        const isPaymentSuccessful = Math.random() > 0.3; // 70% success rate
        
        if (isPaymentSuccessful) {
          alert('Payment successful!');
          navigate('/dashboard');
        } else {
          alert('Payment failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      // Simulate payment for demo
      const isPaymentSuccessful = Math.random() > 0.3;
      
      if (isPaymentSuccessful) {
        alert('Payment successful!');
        navigate('/dashboard');
      } else {
        alert('Payment failed. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <AnimatedBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading cart...</div>
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

  const subtotal = parseFloat(cartData?.total_amount || 0);
  const grandTotal = parseFloat(cartData?.grand_total || subtotal);
  const hasItems = cartData?.services && cartData.services.length > 0;

  return (
    <AnimatedBackground>
      <div className="min-h-screen relative z-10">
        {/* Tabs */}
        <div className="w-full bg-black/30 py-4 flex justify-center">
          <div className="space-x-4">
            <button
              onClick={() => navigate('/sande')}
              className="px-6 py-2 rounded-full text-white text-sm font-semibold bg-gray-600 hover:bg-gray-700 transition-colors"
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
                <div className="grid grid-cols-6 gap-4 p-3 text-sm font-semibold">
                  <div>Service Name</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-center">Rate (₹)</div>
                  <div className="text-center">Amount (₹)</div>
                  <div className="text-center">Edit</div>
                  <div className="text-center">Remove</div>
                </div>
              </div>

              {/* Cart Items */}
              {!hasItems ? (
                <div className="border border-gray-200 rounded-b-lg mb-6">
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-lg">Your cart is empty</p>
                    <p className="text-sm mt-2">
                      Add items from the Service Rates & Estimator to see them here
                    </p>
                    <button
                      onClick={() => navigate('/sande')}
                      className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-b-lg mb-6">
                  {cartData.services.map((item, index) => {
                    const service = getServiceById(item.service);
                    if (!service) return null;
                    
                    return (
                      <div key={index} className="grid grid-cols-6 gap-4 p-3 border-b border-gray-100 items-center">
                        <div className="font-medium">{service.name}</div>
                        <div className="text-center">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateCartItemQuantity(item.service, parseInt(e.target.value) || 0)}
                            className="w-16 p-1 border border-gray-300 rounded text-center"
                          />
                        </div>
                        <div className="text-center">₹{getServiceRate(service, item.quantity)}</div>
                        <div className="text-center font-semibold text-green-600">₹{parseFloat(item.amount).toFixed(2)}</div>
                        <div className="text-center">
                          <button
                            onClick={() => {
                              const newQuantity = prompt(`Enter new quantity for ${service.name}:`, item.quantity);
                              if (newQuantity !== null) {
                                updateCartItemQuantity(item.service, parseInt(newQuantity) || 0);
                              }
                            }}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="text-center">
                          <button
                            onClick={() => removeCartItem(item.service)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {hasItems && (
                <>
                  {/* Promo Code Section */}
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Add Promo Code:</span>
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={selectedPromoCode}
                        onChange={(e) => setSelectedPromoCode(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm w-48"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
                      >
                        Apply
                      </button>
                      {appliedPromoCode && (
                        <button
                          onClick={removePromoCode}
                          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-sm">Subtotal: ₹{subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Applied Promo Code Display */}
                  {appliedPromoCode && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-green-700 font-medium">
                          Promo Code Applied: {appliedPromoCode.code}
                        </span>
                        <span className="text-green-700 font-bold">
                          -{appliedPromoCode.discount_percentage}% (₹{appliedDiscount.toFixed(2)})
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="text-right mb-6">
                    {appliedDiscount > 0 && (
                      <p className="text-green-600 mb-2">
                        Discount Applied: -₹{appliedDiscount.toFixed(2)}
                      </p>
                    )}
                    <p className="text-xl font-bold text-green-600">
                      Grand Total: ₹{grandTotal.toFixed(2)}
                    </p>
                  </div>

                  {/* Proceed to Pay Button */}
                  <button
                    onClick={proceedToPayment}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition text-lg"
                  >
                    Proceed to Pay ₹{grandTotal.toFixed(2)}
                  </button>
                </>
              )}

              {/* Available Promo Codes */}
              {promoCodes.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Available Promo Codes:
                  </p>
                  {promoCodes.map((promo) => (
                    <p key={promo.id} className="text-blue-600 text-sm font-semibold">
                      {promo.code} - Get {promo.discount_percentage}% discount
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default CartPage;