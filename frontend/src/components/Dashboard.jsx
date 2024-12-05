import { Container, Row, Col, Card } from 'react-bootstrap';
import { Wind, Zap, Battery, Lightbulb, Database, Server, Lock } from 'lucide-react';

const Dashboard = () => {
  const innovations = [
    {
      title: "Solar Technology",
      description: "Perovskite solar cells offering higher efficiency and lower production costs",
      icon: <Zap className="text-warning" size={24} />,
      color: "warning"
    },
    {
      title: "Energy Storage",
      description: "Advanced flow batteries and solid-state batteries addressing intermittency challenges",
      icon: <Battery className="text-success" size={24} />,
      color: "success"
    },
    {
      title: "Offshore Wind",
      description: "Floating turbines enabling electricity generation in deeper waters",
      icon: <Wind className="text-info" size={24} />,
      color: "info"
    },
    {
      title: "Smart Grid AI",
      description: "AI and ML optimizing renewable energy systems and grid management",
      icon: <Database className="text-primary" size={24} />,
      color: "primary"
    }
  ];

  return (
    <Container className="py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <Lightbulb className="text-success mb-3" size={40} />
        <h1 className="display-4 mb-2">Clean Energy Innovations</h1>
        <p className="lead text-muted">
          Exploring the latest breakthroughs in sustainable power generation
        </p>
      </div>

      {/* Main Content Card */}
      <Card className="shadow-sm mb-5">
        <Card.Body className="p-4">
          <Card.Title className="h3 mb-4">Recent Innovations in Clean Energy</Card.Title>
          <Card.Text className="text-muted mb-4">
            The clean energy sector has witnessed remarkable innovations in recent years, driving a global transition towards sustainable power generation. Emerging technologies like perovskite solar cells, which promise higher efficiency and lower production costs than traditional silicon-based panels, are revolutionizing photovoltaic technology.
          </Card.Text>
          
          {/* Innovation Cards Grid */}
          <Row xs={1} md={2} className="g-4 mt-2">
            {innovations.map((item, idx) => (
              <Col key={idx}>
                <Card className={`h-100 border-${item.color} hover-shadow transition-all`}>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <div className={`p-2 rounded bg-${item.color} bg-opacity-10 me-3`}>
                        {item.icon}
                      </div>
                      <Card.Title className="h5 mb-0">{item.title}</Card.Title>
                    </div>
                    <Card.Text className="text-muted">
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
        
        <Card.Footer className="text-muted">
          <small>
            Source: International Renewable Energy Agency (IRENA) - {' '}
            <a
              href="https://www.irena.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              www.irena.org
            </a>
          </small>
        </Card.Footer>
      </Card>

      {/* Technical Overview Card */}
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <div className="d-flex align-items-center mb-4">
            <Server size={32} className="text-secondary me-3" />
            <Card.Title className="h3 mb-0">Technical Overview</Card.Title>
          </div>
          
          <Row>
            <Col md={6}>
              <h5 className="mb-3">Application Architecture</h5>
              <p className="text-muted">
                A robust, full-stack application designed to provide comprehensive clean energy insights through a modern, scalable architecture.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2 d-flex align-items-center">
                  <Server size={16} className="me-2 text-primary" />
                  Frontend: React 18 with React Router
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <Server size={16} className="me-2 text-success" />
                  Backend: Node.js & Express.js REST API
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <Database size={16} className="me-2 text-info" />
                  Database: MongoDB for data persistence
                </li>
                <li className="d-flex align-items-center">
                  <Lock size={16} className="me-2 text-warning" />
                  Authentication: JSON Web Tokens (JWT)
                </li>
              </ul>
            </Col>
            <Col md={6}>
              <h5 className="mb-3">Key Features</h5>
              <ul className="list-unstyled">
                <li className="mb-2">🔒 Secure user authentication</li>
                <li className="mb-2">📊 Dynamic data visualization</li>
                <li className="mb-2">🚀 Responsive and performant UI</li>
                <li className="mb-2">🔄 Real-time data updates</li>
                <li className="mb-2">🌐 Scalable microservices architecture</li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;