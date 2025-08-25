import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import RadiologistRegistration from './Components/RadiologistRegistration';
import TopUpModal from './Components/TopUpModal';
import CartPage from './Pages/CartPage';
import Dashboard from './Pages/Dashboard';
import LoginPage from './Pages/LoginPage';
import QualityPage from './Pages/QualityPage';
import SandePage from './Pages/SandEPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [topUpModal, setTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  // Load user data on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('currentUser');
    
    if (authStatus === 'true' && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Validate required user data
        if (parsedUser && parsedUser.id) {
          setIsAuthenticated(true);
          setCurrentUser(parsedUser);
        } else {
          // Invalid user data, clear authentication
          handleLogout();
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
        handleLogout();
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Update storage when auth state changes
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [isAuthenticated, currentUser]);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <Header
            setTopUpModal={setTopUpModal}
            setIsAuthenticated={setIsAuthenticated}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser} // Add currentUser prop
          />
        )}

        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/quality" replace />
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated}
                setCurrentUser={setCurrentUser} 
                 />
              )
            }
          />

          {/* ✅ MOVED: Radiologist registration is now PUBLIC (no authentication required) */}
          <Route
            path="/radiologist-registration"
            element={<RadiologistRegistration />}
          />

          <Route
            path="/quality"
            element={
              isAuthenticated ? (
                <QualityPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/sande"
            element={
              isAuthenticated ? (
                <SandePage  currentUser={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/cart"
            element={
              isAuthenticated ? (
                <CartPage  currentUser={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? '/quality' : '/login'} replace />
            }
          />

          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? '/quality' : '/login'} replace />
            }
          />
        </Routes>

        {/* ✅ Top-up Modal */}
        {topUpModal && (
          <TopUpModal
            topUpModal={topUpModal}
            setTopUpModal={setTopUpModal}
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
            userBalance={userBalance}
            setUserBalance={setUserBalance}
          />
        )}
        
        {/* ✅ Footer - only show when authenticated */}
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;