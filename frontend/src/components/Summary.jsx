import { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { 
  Sun, 
  Wind, 
  Battery, 
  Factory, 
  Car, 
  Globe2,
  Target,
  TrendingUp,
  MapPin,
  Zap,
  LineChart
} from 'lucide-react';

const Summary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const progressChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return value + '%'
          }
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch insights data
        const insightsResponse = await axios.get('/api/chartData/insights');
        setSummaryData(insightsResponse.data);
  
        // Fetch chart data separately
        const chartResponse = await axios.get('/api/chartData/charts');
        
        // Instead of using find, create the yearlyGoalsProgress chart data
        setChartData({
          yearlyGoalsProgress: {
            labels: ['Solar Target', 'Wind Target', 'Energy Storage', 'Grid Modernization', 'CO2 Reduction'],
            datasets: [{
              label: 'Progress Percentage',
              data: [
                Math.round((chartResponse.data.renewableGrowth.datasets[0].data[4] / 2000) * 100), // Solar progress
                Math.round((chartResponse.data.renewableGrowth.datasets[1].data[4] / 1600) * 100), // Wind progress
                Math.round((chartResponse.data.investmentTrends.datasets[0].data[2] / 25) * 100),  // Energy Storage progress
                Math.round((chartResponse.data.investmentTrends.datasets[0].data[3] / 20) * 100),  // Grid progress
                Math.round((chartResponse.data.co2Reduction.datasets[0].data[0] / 200) * 100)      // CO2 reduction progress
              ],
              backgroundColor: [
                'rgba(255, 159, 64, 0.7)',  // Orange for Solar
                'rgba(54, 162, 235, 0.7)',   // Blue for Wind
                'rgba(75, 192, 192, 0.7)',   // Teal for Storage
                'rgba(153, 102, 255, 0.7)',  // Purple for Grid
                'rgba(255, 99, 132, 0.7)'    // Pink for CO2
              ],
              borderWidth: 1
            }]
          }
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Format the metrics for display
  const formatMetrics = (data) => {
    if (!data) return null;
    
    return {
      ...data,
      // Format renewable energy growth
      solarGrowth: Math.round(data.solarGrowth || 85),
      windGrowth: Math.round(data.windGrowth || 92),
      totalRenewableCapacity: Math.round(data.totalRenewableCapacity || 3350),
      
      // Format carbon emission reduction
      industrialCo2Reduction: Math.round(data.industrialCo2Reduction || 180),
      transportCo2Reduction: Math.round(data.transportCo2Reduction || 120),
      totalCo2Reduction: Math.round(data.totalCo2Reduction || 480),
      
      // Format investment numbers
      solarInvestment: Math.round(data.solarInvestment || 850),
      energyStorageInvestment: Math.round(data.energyStorageInvestment || 650),
      totalCleanTechInvestment: Number((data.totalCleanTechInvestment || 2.8).toFixed(1))
    };
  };

  if (loading) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <Zap className="text-success mb-3" size={40} />
        <h3 className="text-muted">Loading insights...</h3>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger m-4 d-flex align-items-center gap-2">
      <Target size={20} />
      {error}
    </div>
  );

  const formattedData = formatMetrics(summaryData);
  if (!formattedData) return null;

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
            <Sun size={32} className="text-warning" />
            <Wind size={32} className="text-info" />
          </div>
          <h1 className="display-5 mb-2">Clean Energy Insights</h1>
          <p className="text-muted lead">Annual overview of sustainable energy progress</p>
        </div>

        {/* Goals Progress Chart */}
        <Row className="g-4 mb-4">
          <Col md={12}>
            <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Header className="bg-primary bg-opacity-10 border-0">
                <h4 className="mb-0 text-primary d-flex align-items-center gap-2">
                  <LineChart size={20} />
                  Yearly Goals Progress
                </h4>
              </Card.Header>
              <Card.Body>
                <div style={{ height: '300px' }}>
                  {chartData?.yearlyGoalsProgress && (
                    <Bar 
                      data={chartData.yearlyGoalsProgress}
                      options={progressChartOptions}
                    />
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Metrics Cards */}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Header className="bg-success bg-opacity-10 border-0">
                <h4 className="mb-0 text-success">Renewable Energy Growth</h4>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
                  <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                    <Sun size={24} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Solar Capacity Increase</p>
                    <h3 className="mb-0">{formattedData.solarGrowth}%</h3>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
                  <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                    <Wind size={24} className="text-info" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Wind Energy Expansion</p>
                    <h3 className="mb-0">{formattedData.windGrowth}%</h3>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                    <Battery size={24} className="text-success" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Total Renewable Capacity</p>
                    <h3 className="mb-0">{formattedData.totalRenewableCapacity} GW</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Header className="bg-danger bg-opacity-10 border-0">
                <h4 className="mb-0 text-danger">Carbon Emission Reduction</h4>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
                  <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                    <Factory size={24} className="text-danger" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Industrial Sector Reduction</p>
                    <h3 className="mb-0">{formattedData.industrialCo2Reduction}M Tons</h3>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                    <Car size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Transportation Impact</p>
                    <h3 className="mb-0">{formattedData.transportCo2Reduction}M Tons</h3>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                    <Globe2 size={24} className="text-info" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Global CO2 Reduction</p>
                    <h3 className="mb-0">{formattedData.totalCo2Reduction}M Tons</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Header className="bg-primary bg-opacity-10 border-0">
                <h4 className="mb-0 text-primary">Clean Technology Investment</h4>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
                  <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                    <Sun size={24} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Solar Technology</p>
                    <h3 className="mb-0">${formattedData.solarInvestment}M</h3>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
                  <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                    <Battery size={24} className="text-success" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Energy Storage</p>
                    <h3 className="mb-0">${formattedData.energyStorageInvestment}M</h3>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                    <TrendingUp size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-muted mb-1">Total Clean Tech Investment</p>
                    <h3 className="mb-0">${formattedData.totalCleanTechInvestment}B</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Information Cards */}
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Header className="bg-warning bg-opacity-10 border-0">
                <h4 className="mb-0 text-warning d-flex align-items-center gap-2">
                  <Target size={20} />
                  Key Milestones
                </h4>
              </Card.Header>
              <Card.Body>
                {formattedData.keyMilestones.map((milestone, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-warning bg-opacity-10 p-2 me-3 small">
                      {index + 1}
                    </div>
                    <p className="mb-0">{milestone}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Header className="bg-success bg-opacity-10 border-0">
                <h4 className="mb-0 text-success d-flex align-items-center gap-2">
                  <TrendingUp size={20} />
                  Emerging Trends
                </h4>
              </Card.Header>
              <Card.Body>
                {formattedData.emergingTrends.map((trend, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-success bg-opacity-10 p-2 me-3 small">
                      {index + 1}
                    </div>
                    <p className="mb-0">{trend}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
              <Card.Header className="bg-info bg-opacity-10 border-0">
                <h4 className="mb-0 text-info d-flex align-items-center gap-2">
                  <MapPin size={20} />
                  Regional Highlights
                </h4>
              </Card.Header>
              <Card.Body>
                {Object.entries(formattedData.regionalHighlights).map(([region, highlight], index) => (
                  <div key={region} className="d-flex align-items-start mb-3">
                    <div className="rounded-circle bg-info bg-opacity-10 p-2 me-3 small">
                      {index + 1}
                    </div>
                    <div>
                      <strong className="d-block mb-1">{region}</strong>
                      <p className="mb-0 text-muted">{highlight}</p>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Summary;