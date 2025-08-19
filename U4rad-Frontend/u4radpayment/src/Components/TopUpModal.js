// components/TopUpModal.js

const TopUpModal = ({ 
    topUpModal, 
    setTopUpModal, 
    topUpAmount, 
    setTopUpAmount, 
    userBalance, 
    setUserBalance 
    }) => {
    if (!topUpModal) return null;

    const handleTopUp = () => {
        const amount = parseFloat(topUpAmount) || 0;
        if (amount > 0) {
        setUserBalance(prev => prev + amount);
        setTopUpAmount('');
        setTopUpModal(false);
        alert(`Successfully added ₹${amount} to your account!`);
        } else {
        alert('Please enter a valid amount');
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
        setTopUpModal(false);
        }
    };

    return (
        <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleBackdropClick}
        >
        <div className="bg-white p-6 rounded-lg w-96 max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Top Up Amount</h3>
            <button
                onClick={() => setTopUpModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
                ×
            </button>
            </div>
            
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                Enter amount to top up :
                </label>
                <input
                type="number"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
                min="1"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                Add Promocode :
                </label>
                <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="PROMOCODE"
                />
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-700">
                Credit Balance : ₹ {userBalance.toFixed(2)}
                </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded">
                <div className="text-sm font-medium text-blue-700">
                Total Balance : ₹ {(userBalance + (parseFloat(topUpAmount) || 0)).toFixed(2)}
                </div>
            </div>
            
            <button
                onClick={handleTopUp}
                className="w-full bg-gray-600 text-white py-3 rounded hover:bg-gray-700 transition-colors font-medium"
            >
                Proceed to Top Up
            </button>
            </div>
        </div>
        </div>
    );
    };

export default TopUpModal;
