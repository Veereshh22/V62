import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement 
} from 'chart.js';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement
);

const Reports = () => {
  const [chartData, setChartData] = useState({
    renewableGrowth: null,
    energySourceDistribution: null,
    co2Reduction: null,
    investmentTrends: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Adjust the endpoint to match your backend route
        const response = await axios.get('http://localhost:3001/api/chartData/charts');
        
        // If response.data is already the object we want
        setChartData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data', error);
        setError('Failed to load dashboard data: ' + error.message);
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading dashboard...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4 text-center">Clean Energy Innovation Dashboard</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Global Renewable Energy Capacity (2020-2024)</Card.Title>
              {chartData.renewableGrowth && (
                <Line 
                  data={chartData.renewableGrowth}
                  options={{ 
                    responsive: true, 
                    plugins: { 
                      legend: { position: 'top' },
                      title: { display: true, text: 'Renewable Energy Growth Trends' }
                    } 
                  }} 
                />
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Energy Source Distribution 2024</Card.Title>
              {chartData.energySourceDistribution && (
                <Pie 
                  data={chartData.energySourceDistribution}
                  options={{ 
                    responsive: true, 
                    plugins: { 
                      legend: { position: 'right' },
                      title: { display: true, text: 'Renewable Energy Mix' }
                    } 
                  }} 
                />
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>CO2 Emission Reduction by Sector</Card.Title>
              {chartData.co2Reduction && (
                <Bar 
                  data={chartData.co2Reduction}
                  options={{ 
                    responsive: true,
                    plugins: {
                      title: { display: true, text: 'Sector-wise Carbon Emission Reduction' }
                    }
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Investment in Clean Tech</Card.Title>
              {chartData.investmentTrends && (
                <Doughnut 
                  data={chartData.investmentTrends}
                  options={{ 
                    responsive: true,
                    plugins: {
                      title: { display: true, text: 'Clean Technology Investments' }
                    }
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Rest of the component remains the same */}
    </Container>
  );
};

export default Reports;