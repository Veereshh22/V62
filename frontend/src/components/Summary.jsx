import { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Summary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/chartData/insights');
        setSummaryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching summary data', error);
        setError('Failed to load summary insights');
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) return <div>Loading insights...</div>;
  if (error) return <div>{error}</div>;
  if (!summaryData) return null;

  return (
    <Container fluid className="p-4">
      <h1 className="text-center mb-4">Yearly Clean Energy Insights</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Header>Renewable Energy Growth</Card.Header>
            <Card.Body>
              <p>🌞 Solar Capacity Increase: {summaryData.solarGrowth}%</p>
              <p>💨 Wind Energy Expansion: {summaryData.windGrowth}%</p>
              <p>🔋 Total Renewable Capacity: {summaryData.totalRenewableCapacity} GW</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100">
            <Card.Header>Carbon Emission Reduction</Card.Header>
            <Card.Body>
              <p>🏭 Industrial Sector Reduction: {summaryData.industrialCo2Reduction} Million Tons</p>
              <p>🚗 Transportation Sector Impact: {summaryData.transportCo2Reduction} Million Tons</p>
              <p>🌍 Global CO2 Reduction: {summaryData.totalCo2Reduction} Million Tons</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100">
            <Card.Header>Clean Technology Investment</Card.Header>
            <Card.Body>
              <p>💡 Solar Technology: ${summaryData.solarInvestment} Million</p>
              <p>🌊 Energy Storage: ${summaryData.energyStorageInvestment} Million</p>
              <p>🔬 Total Clean Tech Investment: ${summaryData.totalCleanTechInvestment} Billion</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Header>Key Milestones</Card.Header>
            <Card.Body>
              {summaryData.keyMilestones.map((milestone, index) => (
                <p key={index}>✅ {milestone}</p>
              ))}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100">
            <Card.Header>Emerging Trends</Card.Header>
            <Card.Body>
              {summaryData.emergingTrends.map((trend, index) => (
                <p key={index}>🚀 {trend}</p>
              ))}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100">
            <Card.Header>Regional Highlights</Card.Header>
            <Card.Body>
              {Object.entries(summaryData.regionalHighlights).map(([region, highlight]) => (
                <div key={region} className="mb-2">
                  <strong>{region}:</strong> {highlight}
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>Technical Project Overview</Card.Header>
            <Card.Body>
              <p>
                This Clean Energy Dashboard is a modern Single Page Application (SPA) built 
                with React and Bootstrap for the frontend, and Node.js with Express for the backend. 
                The application implements JWT-based authentication, providing secure access 
                to dashboard functionalities.
              </p>
              
              <h5>Tech Stack</h5>
              <ul>
                <li>Frontend: React 18, React Router for navigation, Bootstrap for styling</li>
                <li>Backend: Node.js, Express.js for REST API</li>
                <li>Authentication: JSON Web Tokens (JWT)</li>
                <li>Charting: Chart.js with react-chartjs-2</li>
                <li>Database: MongoDB for data persistence</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Summary;