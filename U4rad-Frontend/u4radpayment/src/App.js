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

  // ✅ add these 2 state variables
  const [topUpAmount, setTopUpAmount] = useState('');
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <Header
            setTopUpModal={setTopUpModal}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}

        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/quality" replace />
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
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
                <SandePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/cart"
            element={
              isAuthenticated ? (
                <CartPage />
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