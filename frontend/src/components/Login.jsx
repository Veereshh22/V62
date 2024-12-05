import { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Lightbulb, Wind, Zap, Lock, User } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.log(err)
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-5" 
         style={{ 
           background: 'linear-gradient(135deg, #e6f7ff 0%, #e6ffe6 100%)'
         }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            {/* Logo and Title */}
            <div className="text-center mb-4">
              <div className="d-flex justify-content-center gap-2 mb-3">
                <Lightbulb size={32} className="text-success" />
                <Wind size={32} className="text-info" />
                <Zap size={32} className="text-warning" />
              </div>
              <h1 className="h3 mb-3 fw-bold text-primary">Clean Energy Dashboard</h1>
              <p className="text-muted">Access your sustainable energy insights</p>
            </div>

            {/* Login Card */}
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4 h4">Welcome Back</h2>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <User size={18} className="text-muted me-2" />
                      <Form.Label className="mb-0">Username</Form.Label>
                    </div>
                    <Form.Control 
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      aria-label="Username"
                      className="py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Lock size={18} className="text-muted me-2" />
                      <Form.Label className="mb-0">Password</Form.Label>
                    </div>
                    <Form.Control 
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      aria-label="Password"
                      className="py-2"
                    />
                  </Form.Group>

                  {error && (
                    <Alert variant="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}

                  <Button 
                    variant="success" 
                    type="submit" 
                    className="w-100 py-2 mb-3"
                    style={{ 
                      background: 'linear-gradient(to right, #28a745, #20c997)'
                    }}
                  >
                    Login to Dashboard
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Footer */}
            {/* <div className="text-center mt-4">
              <small className="text-muted">
                Powered by Clean Energy Technologies
              </small>
            </div> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;