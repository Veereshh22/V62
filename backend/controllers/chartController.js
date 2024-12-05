const ChartData = require('../models/chart');

exports.createChartData = async (req, res) => {
  try {
    const { type, data, metadata } = req.body;
    
    const newChartData = new ChartData({
      type,
      data,
      metadata,
      year: new Date().getFullYear()
    });

    await newChartData.save();
    
    res.status(201).json({
      message: 'Chart data created successfully',
      data: newChartData
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating chart data',
      error: error.message
    });
  }
};

exports.getChartData = async (req, res) => {
  try {
    const { type, year } = req.query;
    
    const query = {
      year: year || new Date().getFullYear()
    };
    
    if (type) {
      query.type = type;
    }

    const chartData = await ChartData.find(query);
    
    // Transform data for frontend
    const transformedData = {
      renewableGrowth: {
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
      },
      energySourceDistribution: {
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
      },
      co2Reduction: {
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
      },
      investmentTrends: {
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
      }
    };

    res.status(200).json(transformedData);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching chart data',
      error: error.message
    });
  }
};

exports.updateChartData = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, metadata } = req.body;

    const updatedChartData = await ChartData.findByIdAndUpdate(
      id,
      {
        data,
        metadata,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedChartData) {
      return res.status(404).json({
        message: 'Chart data not found'
      });
    }

    res.status(200).json({
      message: 'Chart data updated successfully',
      data: updatedChartData
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating chart data',
      error: error.message
    });
  }
};

exports.getYearlyInsights = async (req, res) => {
  try {
    const yearlyInsights = {
      keyMilestones: [
        'Global renewable energy capacity exceeded 3,000 GW',
        'Solar and wind now account for 38% of global electricity generation',
        'Renewable energy investments reached $500 billion globally',
        'Carbon emissions reduced by 2.1 billion tons compared to 2023'
      ],
      emergingTrends: [
        'Rapid growth in green hydrogen technologies',
        'Increased focus on energy storage solutions',
        'Expansion of offshore wind power installations',
        'Integration of AI in renewable energy management'
      ],
      regionalHighlights: {
        Europe: 'Leading in offshore wind and solar installations. Aggressive carbon reduction policies driving clean energy adoption.',
        AsiaPacific: 'Rapid growth in solar and wind capacity. Significant investments in green technology infrastructure.',
        NorthAmerica: 'Increasing corporate commitments to renewable energy. Technological innovations in energy storage and grid management.'
      }
    };

    res.status(200).json(yearlyInsights);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching yearly insights',
      error: error.message
    });
  }
};