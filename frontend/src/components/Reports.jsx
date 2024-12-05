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
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/dashboard/charts');
        setChartData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data', error);
        setError('Failed to load dashboard data');
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
              <Line 
                data={{
                  labels: ['2020', '2021', '2022', '2023', '2024'],
                  datasets: [
                    {
                      label: 'Solar',
                      data: [580, 820, 1100, 1450, 1850],
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                    {
                      label: 'Wind',
                      data: [650, 780, 950, 1200, 1500],
                      borderColor: 'rgb(54, 162, 235)',
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    }
                  ]
                }}
                options={{ 
                  responsive: true, 
                  plugins: { 
                    legend: { position: 'top' },
                    title: { display: true, text: 'Renewable Energy Growth Trends' }
                  } 
                }} 
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Energy Source Distribution 2024</Card.Title>
              <Pie 
                data={{
                  labels: ['Solar', 'Wind', 'Hydro', 'Geothermal', 'Biomass'],
                  datasets: [{
                    data: [35, 25, 20, 10, 10],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.7)',
                      'rgba(54, 162, 235, 0.7)',
                      'rgba(255, 206, 86, 0.7)',
                      'rgba(75, 192, 192, 0.7)',
                      'rgba(153, 102, 255, 0.7)'
                    ]
                  }]
                }}
                options={{ 
                  responsive: true, 
                  plugins: { 
                    legend: { position: 'right' },
                    title: { display: true, text: 'Renewable Energy Mix' }
                  } 
                }} 
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>CO2 Emission Reduction by Sector</Card.Title>
              <Bar 
                data={{
                  labels: ['Power', 'Transportation', 'Industry', 'Buildings', 'Agriculture'],
                  datasets: [{
                    label: 'CO2 Reduction (Million Tons)',
                    data: [180, 120, 90, 60, 30],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)'
                    ]
                  }]
                }}
                options={{ 
                  responsive: true,
                  plugins: {
                    title: { display: true, text: 'Sector-wise Carbon Emission Reduction' }
                  }
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Investment in Clean Tech</Card.Title>
              <Doughnut 
                data={{
                  labels: ['Solar Tech', 'Wind Tech', 'Energy Storage', 'Grid Tech', 'Other'],
                  datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.7)',
                      'rgba(54, 162, 235, 0.7)',
                      'rgba(255, 206, 86, 0.7)',
                      'rgba(75, 192, 192, 0.7)',
                      'rgba(153, 102, 255, 0.7)'
                    ]
                  }]
                }}
                options={{ 
                  responsive: true,
                  plugins: {
                    title: { display: true, text: 'Clean Technology Investments' }
                  }
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Recent Clean Energy Innovations</Card.Title>
              <ul className="list-unstyled">
                <li className="mb-2">
                  🌞 Perovskite Solar Cells: Breakthrough in solar efficiency, reaching 29.1% conversion rate
                </li>
                <li className="mb-2">
                  💨 Offshore Floating Wind Turbines: Expanding renewable energy in deeper ocean regions
                </li>
                <li className="mb-2">
                  🔋 Solid-State Battery Technology: Enhanced energy density and safety for electric vehicles
                </li>
                <li className="mb-2">
                  🌊 Green Hydrogen Production: Using renewable energy for zero-emission hydrogen
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;