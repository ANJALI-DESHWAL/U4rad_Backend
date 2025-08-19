import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../Components/AnimatedBackground';

const Dashboard = ({ userBalance, setTopUpModal }) => {
  const navigate = useNavigate();
  const [modalityData] = useState([
    { modality: 'XRAY', expected: 100, completed: 75, balance: 25 },
    { modality: 'CT', expected: 50, completed: 35, balance: 15 },
    { modality: 'MRI', expected: 30, completed: 20, balance: 10 },
    { modality: 'Mammo', expected: 25, completed: 18, balance: 7 }
  ]);

  const handleTopUpClick = () => {
    setTopUpModal(true);
  };

  const handleNewOrderClick = () => {
    navigate('/sande');
  };

  const handleViewRateCard = () => {
    navigate('/sande');
  };

  return (
    <AnimatedBackground>
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Amount Paid */}
          <div className="glass-card-light p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-sm font-medium text-gray-600">Total Amount Paid:</h3>
            <p className="text-2xl font-bold text-green-600">₹9,240</p>
            <p className="text-xs text-gray-400">Updated just now</p>
          </div>

          {/* Current Balance */}
          <div className="glass-card-light p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-sm font-medium text-gray-600">Current Balance:</h3>
            <p className="text-2xl font-bold text-blue-600">₹{userBalance?.toFixed(2) || '0.00'}</p>
            <p className="text-xs text-gray-400">Available for use</p>
          </div>

          {/* View Rate Card */}
          <div className="glass-card-light p-6 rounded-lg shadow-lg flex items-center justify-center">
            <button 
              onClick={handleViewRateCard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              View Rate Card
            </button>
          </div>

          {/* Top Up Button */}
          <div className="glass-card-light p-6 rounded-lg shadow-lg flex items-center justify-center">
            <button 
              onClick={handleTopUpClick}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Top Up Balance
            </button>
          </div>
        </div>

        {/* Dashboard Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {modalityData.map((item, index) => (
            <div key={index} className="glass-card-light p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.modality}</h3>
                <span className={`inline-block w-4 h-4 rounded-full ${
                  item.modality === 'XRAY' ? 'bg-blue-400' :
                  item.modality === 'CT' ? 'bg-green-400' :
                  item.modality === 'MRI' ? 'bg-purple-400' :
                  'bg-pink-400'
                }`}></span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expected:</span>
                  <span className="font-medium">{item.expected}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium text-green-600">{item.completed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Balance:</span>
                  <span className="font-medium text-orange-600">{item.balance}</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.round((item.completed / item.expected) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.modality === 'XRAY' ? 'bg-blue-400' :
                      item.modality === 'CT' ? 'bg-green-400' :
                      item.modality === 'MRI' ? 'bg-purple-400' :
                      'bg-pink-400'
                    }`}
                    style={{ width: `${(item.completed / item.expected) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="glass-card-light p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📈 Recent Activity</h3>
            <div className="space-y-3">
              {[
                { time: '2 hours ago', activity: 'XRAY batch completed - 15 scans', status: 'completed' },
                { time: '4 hours ago', activity: 'CT scan processing - 8 scans', status: 'processing' },
                { time: '6 hours ago', activity: 'MRI reports delivered - 5 scans', status: 'delivered' },
                { time: '1 day ago', activity: 'Mammo screening batch - 12 scans', status: 'completed' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">{item.activity}</div>
                    <div className="text-sm text-gray-500">{item.time}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'completed' ? 'bg-green-100 text-green-800' :
                    item.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card-light p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">⚡ Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => alert('Ratings feature coming soon!')}
                className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 btn-on-animated"
              >
                <div className="text-2xl mb-2">★★★</div>
                <div className="font-medium">Ratings</div>
              </button>
              
              <button 
                onClick={() => alert('Reports viewer coming soon!')}
                className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 btn-on-animated"
              >
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium">View Reports</div>
              </button>
              
              <button 
                onClick={() => alert('Settings page coming soon!')}
                className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 btn-on-animated"
              >
                <div className="text-2xl mb-2">⚙</div>
                <div className="font-medium">Settings</div>
              </button>
              
              <button 
                onClick={() => alert('Support contact: support@u4rad.com')}
                className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-all transform hover:scale-105 btn-on-animated"
              >
                <div className="text-2xl mb-2">📞</div>
                <div className="font-medium">Support</div>
              </button>
            </div>
          </div>
        </div>

        {/* New Order Section */}
        <div className="mt-8">
          <div className="glass-card-light p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Ready for a New Order?</h3>
            <p className="text-gray-600 mb-6">Start a new radiology service request and get instant cost estimation.</p>
            <button
              onClick={handleNewOrderClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg"
            >
              Start New Order
            </button>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Dashboard;