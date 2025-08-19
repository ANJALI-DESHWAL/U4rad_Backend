import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import QualityPage from './Pages/QualityPage';
import AuthFlow from './Components/AuthFlow';
import Dashboard from './Pages/Dashboard';
import RadiologistRegistration from './Components/RadiologistRegistration';
import SandePage from './Pages/SandEPage';
import CartPage from './Pages/CartPage';
import Header from './Components/Header';
import TopUpModal from './Components/TopUpModal';
import Footer from './Components/Footer';
import ViewResponse from './Components/ViewResponse';
import RateList from './Components/RateList';

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
            path="/radiologist-registration"
            element={
              isAuthenticated ? (
                <RadiologistRegistration /> 
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
        
        {/* ✅ Footer */}
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
