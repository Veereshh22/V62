import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


// Import components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';
import Reports from './components/Reports';
import Navbar from './components/Navbar';

// Import AuthProvider and useAuth
import { AuthProvider, useAuth } from './context/authContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Add PropTypes validation for ProtectedRoute
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/summary" 
          element={
            <ProtectedRoute>
              <Summary />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;