import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import AnimatedBackground from '../Components/AnimatedBackground';
import PropTypes from 'prop-types';

const LoginPage = ({ setIsAuthenticated, setCurrentUser }) => {
    // Update credentials structure to match API expectations
    const [credentials, setCredentials] = useState({ 
        user_id: '',  // Keep this as user_id for now
        password: '' 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const loginPayload = {
                email: credentials.user_id,
                password: credentials.password
            };

            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginPayload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store complete user data
            const userData = {
                id: data.id,
                username: data.username,
                email: data.email,
                token: data.access,   // ✅ store access token
                refresh: data.refresh // ✅ optional
                };
                localStorage.setItem("currentUser", JSON.stringify(userData));

            // Update app state
            setCurrentUser(userData);
            setIsAuthenticated(true);

            // Store in localStorage
            localStorage.setItem('currentUser', JSON.stringify(userData));
            localStorage.setItem('isAuthenticated', 'true');

            navigate('/quality');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
          ...prev,
          [name]: value
        }));
      };

    return (
        <AnimatedBackground>

              {/* Top-left Logo */}
           <div className="absolute top-8 left-8 flex items-center">
            <img alt="U4RAD Logo" class="w-200 h-14 mr-3 rounded-md shadow-lg object-cover" src="logo.jpg"
            />
            </div>


            {/* Top-right About Us button */}
        <div className="absolute top-14 right-14">
            <button className="text-white underline text-l hover:text-gray-200 transition">
                About Us
            </button>
        </div>

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
                    {/* Left side - Info */}
                    <div className="text-white space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            We are The U4RAD team
                        </h1>
                        <p className="text-xl opacity-90">
                            Please login or signup to your account
                        </p>
                        
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <h2 className="text-2xl font-semibold text-red-400 mb-4">
                                Radiology & Cardiology Reporting
                            </h2>
                            <p className="text-white/90 leading-relaxed">
                                Explore the seamless reporting services offered by U4RAD technologies for your CT, MRI, and 
                                XRAY cases, ensuring top-notch quality reports with just a few clicks. Answer a few questions, 
                                select the modality and number of cases to be reported, and you're done!
                            </p>
                        </div>
                    </div>

                    {/* Right side - Login Form */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200">
                        {/* Red accent border */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-600 rounded-l-2xl"></div>
                        
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800">Login to Your Account</h2>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    User ID
                                </label>
                                <input
                                    type="email"
                                    name="user_id" // Keep this as user_id to maintain state compatibility
                                    value={credentials.user_id}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                                    required
                                />
                                <div className="text-right mt-2">
                                      <span className="text-red-600 text-sm hover:underline font-medium cursor-pointer">
                                            Forgot Password?
                                        </span>
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="text-center">
                                <Link
                                to="/radiologist-registration"
                                className="text-red-600 text-sm hover:underline font-medium"
                                >
                                Radiologist Registration
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AnimatedBackground>
    );
};

LoginPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

export default LoginPage;