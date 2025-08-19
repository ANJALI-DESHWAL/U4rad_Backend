import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../Assets/logo.jpg';

const Header = ({ setTopUpModal, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            setIsAuthenticated(false);
            navigate('/login');
        }
    };

    return (
        <header className="bg-black shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <img src={logo} alt="U4RAD Logo" className="h-10 object-contain" />
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Show DASHBOARD and TOP-UP buttons when on sande page (former calculator) */}
                        {currentPath === '/sande' && (
                            <>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="px-6 py-2 text-white font-semibold rounded-xl
        bg-gradient-to-b from-gray-500 via-gray-600 to-gray-800
        shadow-inner shadow-[rgba(0,0,0,0.6)]
        transition-all duration-150
        hover:drop-shadow-[0_0_14px_rgba(255,0,0,0.8)]"
                                >
                                    DASHBOARD
                                </button>
                                <button
                                    onClick={() => setTopUpModal(true)}
                                    className="px-6 py-2 text-white font-semibold rounded-xl
        bg-gradient-to-b from-blue-500 via-blue-600 to-blue-800
        shadow-inner shadow-[rgba(0,0,0,0.6)]
        transition-all duration-150
        hover:drop-shadow-[0_0_14px_rgba(255,0,0,0.8)]"
                                >
                                    TOP-UP
                                </button>
                            </>
                        )}
                                
                        {/* Show CALCULATOR button when on dashboard */}
                        {currentPath === '/dashboard' && (
                            <button
                                onClick={() => navigate('/sande')}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                CALCULATOR
                            </button>
                        )}

                        {/* Logout button - always visible with red styling */}
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 text-white font-semibold rounded-full
        bg-gradient-to-b from-red-500 via-red-600 to-red-800
        shadow-inner shadow-[rgba(0,0,0,0.6)]
        transition-all duration-150
        hover:drop-shadow-[0_0_14px_rgba(255,0,0,0.8)]"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;