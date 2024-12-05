import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart, 
  LogOut, 
  Lightbulb,
  Wind
} from 'lucide-react';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Check if current path is login OR if not authenticated
  if (!isAuthenticated || location.pathname === '/login') return null;

  return (
    <Navbar 
      expand="lg" 
      className="py-3 shadow-sm"
      style={{
        background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}
      aria-label="Main Navigation"
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/dashboard" 
          className="d-flex align-items-center gap-2"
        >
          <div className="d-flex gap-1">
            <Lightbulb size={24} className="text-success" />
            <Wind size={24} className="text-info" />
          </div>
          <span className="fw-bold text-primary">
            Clean Energy Dashboard
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              className="d-flex align-items-center gap-2 px-3"
              active={location.pathname === '/dashboard'}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/summary" 
              className="d-flex align-items-center gap-2 px-3"
              active={location.pathname === '/summary'}
            >
              <FileText size={18} />
              Summary
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/reports" 
              className="d-flex align-items-center gap-2 px-3"
              active={location.pathname === '/reports'}
            >
              <BarChart size={18} />
              Reports
            </Nav.Link>
          </Nav>

          <Button 
            variant="outline-danger"
            onClick={handleLogout}
            className="d-flex align-items-center gap-2 px-4"
            aria-label="Logout"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;