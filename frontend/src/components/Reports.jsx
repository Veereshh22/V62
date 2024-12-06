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
import { 
  LineChart, 
  PieChart, 
  BarChart2, 
  Activity,
  TrendingUp,
  Wind,
  Zap 
} from 'lucide-react';

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
        const response = await axios.get('/api/chartData/charts');
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

  if (loading) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <Wind className="text-success mb-3" size={40} />
        <h3 className="text-muted">Loading dashboard...</h3>
      </div>
    </div>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger" className="d-flex align-items-center gap-2">
        <Activity size={20} />
        {error}
      </Alert>
    </Container>
  );

  return (
    <div 
      className="min-vh-100 py-4"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e6ffe6 100%)'
      }}
    >
      <Container fluid className="px-4">
        {/* Header Section */}
        <div className="text-center mb-5">
          <div className="d-flex justify-content-center gap-2 mb-3">
            <Wind size={32} className="text-info" />
            <Zap size={32} className="text-success" />
          </div>
          <h1 className="display-5 mb-2">Clean Energy Analytics</h1>
          <p className="text-muted lead">Comprehensive insights into renewable energy trends</p>
        </div>

        <Row className="g-4">
          {/* Renewable Growth Chart */}
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <LineChart size={24} className="text-primary me-2" />
                  <Card.Title className="mb-0 h4">Global Renewable Energy Capacity</Card.Title>
                </div>
                {chartData.renewableGrowth && (
                  <Line 
                    data={chartData.renewableGrowth}
                    options={{ 
                      responsive: true, 
                      plugins: { 
                        legend: { position: 'top' },
                        title: { display: false }
                      },
                      scales: {
                        y: { beginAtZero: true }
                      }
                    }} 
                  />
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Energy Distribution Chart */}
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <PieChart size={24} className="text-success me-2" />
                  <Card.Title className="mb-0 h4">Energy Source Distribution</Card.Title>
                </div>
                {chartData.energySourceDistribution && (
                  <Pie 
                    data={chartData.energySourceDistribution}
                    options={{ 
                      responsive: true, 
                      plugins: { 
                        legend: { position: 'right' },
                        title: { display: false }
                      }
                    }} 
                  />
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* CO2 Reduction Chart */}
          <Col md={8}>
            <Card className="h-100 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <BarChart2 size={24} className="text-warning me-2" />
                  <Card.Title className="mb-0 h4">CO2 Emission Reduction by Sector</Card.Title>
                </div>
                {chartData.co2Reduction && (
                  <Bar 
                    data={chartData.co2Reduction}
                    options={{ 
                      responsive: true,
                      plugins: {
                        legend: { position: 'top' },
                        title: { display: false }
                      },
                      scales: {
                        y: { beginAtZero: true }
                      }
                    }}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Investment Trends Chart */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <TrendingUp size={24} className="text-info me-2" />
                  <Card.Title className="mb-0 h4">Clean Tech Investment</Card.Title>
                </div>
                {chartData.investmentTrends && (
                  <Doughnut 
                    data={chartData.investmentTrends}
                    options={{ 
                      responsive: true,
                      plugins: {
                        legend: { position: 'bottom' },
                        title: { display: false }
                      }
                    }}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Reports;