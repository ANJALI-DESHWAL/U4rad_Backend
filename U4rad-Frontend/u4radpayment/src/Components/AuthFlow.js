import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Plus } from 'lucide-react';
import RadiologistRegistration from './RadiologistRegistration';


const AuthFlow = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'forgot', 'reset-success', 'registration'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    console.log('Login attempt:', formData);
    // Simulate successful login
    if (formData.username && formData.password) {
      alert('Login successful!');
      // Navigate to quality page after login
      navigate('/quality');
    } else {
      alert('Please enter username and password');
    }
  };

  const handleForgotPassword = () => {
    console.log('Password reset request for:', formData.email);
    if (!formData.email) {
      alert('Please enter your email address');
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setCurrentPage('reset-success');
    }, 1000);
  };

  const BackgroundElements = () => (
    <>
      <div className="absolute top-20 left-20 w-8 h-8 opacity-30">
        <Plus className="w-full h-full text-blue-300" />
      </div>
      <div className="absolute top-32 right-32 w-3 h-3 bg-blue-300 rounded-full opacity-40"></div>
      <div className="absolute bottom-40 right-20 w-12 h-12 opacity-20">
        <Plus className="w-full h-full text-purple-300" />
      </div>
      <div className="absolute bottom-32 left-40 w-2 h-2 bg-purple-300 rounded-full opacity-50"></div>
      
      {/* Large gradient circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-600 to-pink-600 rounded-full opacity-15 blur-3xl"></div>
    </>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 flex items-center justify-center relative overflow-hidden">
      <BackgroundElements />
      
      <div className="flex w-full max-w-6xl mx-auto px-8 relative z-10">
        {/* Left Side - Content */}
        <div className="flex-1 text-white pr-12">
          <h1 className="text-5xl font-bold mb-4">
            We are The U4RAD<br />team
          </h1>
          <p className="text-lg mb-12 opacity-90">
            Please login or signup to your account
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold mb-2 text-cyan-300">
              Radiology & Cardiology<br />Reporting
            </h2>
            <p className="text-sm opacity-80 leading-relaxed">
              Explore the seamless reporting services offered by U4RAD Technologies for your CT, MRI, and XRAY cases, ensuring top-notch quality reports with just a few clicks. Answer a few questions, select the modality and number of cases to be reported, and you're done!
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-96">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('forgot')}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 mb-4"
              >
                Login
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCurrentPage('registration')}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Radiologist Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ForgotPasswordPage = () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Forgot password
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Enter the email address associated with your account
        </p>

        <div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleForgotPassword}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300 mb-4"
          >
            Send reset link
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setCurrentPage('login')}
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              Remember your password? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ResetSuccessPage = () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Password reset
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your password has been successfully reset. You can now log in with your new password.
        </p>

        <button
          onClick={() => {
            setCurrentPage('login');
            setFormData({ username: '', password: '', email: '' });
          }}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Go to login
        </button>
      </div>
    </div>
  );

  const RegistrationPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 flex items-center justify-center relative overflow-hidden">
      <BackgroundElements />
      
      <div className="w-full max-w-4xl mx-auto px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Radiologist Registration</h1>
          <p className="text-lg mb-8 opacity-90">
            This will be a seven-page registration form for radiologists.
          </p>
          
          <div className="bg-white/20 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Registration Form Pages:</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-blue-500/30 rounded p-3">Page 1: Basic Info</div>
              <div className="bg-purple-500/30 rounded p-3">Page 2: Credentials</div>
              <div className="bg-blue-500/30 rounded p-3">Page 3: Experience</div>
              <div className="bg-purple-500/30 rounded p-3">Page 4: Specialization</div>
              <div className="bg-blue-500/30 rounded p-3">Page 5: Documents</div>
              <div className="bg-purple-500/30 rounded p-3">Page 6: Verification</div>
              <div className="bg-green-500/30 rounded p-3 md:col-span-2">Page 7: Review & Submit</div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => alert('Registration form will be implemented here')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Start Registration
            </button>
            <button
              onClick={() => setCurrentPage('login')}
              className="px-6 py-3 bg-gray-700/50 text-white font-semibold rounded-lg hover:bg-gray-600/50 transition-all duration-300"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the appropriate page based on current state
  switch (currentPage) {
    case 'forgot':
      return <ForgotPasswordPage />;
    case 'reset-success':
      return <ResetSuccessPage />;
    case 'registration':
      return <RadiologistRegistration />;
    default:
      return <LoginPage />;
  }
};

export default AuthFlow;