const mongoose = require('mongoose');
const ChartData = require('../models/chart');
require('dotenv').config();

// Initial data to seed
const initialData = [
  {
    type: 'renewableGrowth',
    data: {
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
    year: new Date().getFullYear(),
    metadata: 'Renewable Energy Growth Trends'
  },
  {
    type: 'energySourceDistribution',
    data: {
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
    year: new Date().getFullYear(),
    metadata: 'Global Renewable Energy Source Distribution'
  },
  {
    type: 'co2Reduction',
    data: {
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
    year: new Date().getFullYear(),
    metadata: 'Sector-wise CO2 Reduction Achievements'
  },
  {
    type: 'investmentTrends',
    data: {
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
    },
    year: new Date().getFullYear(),
    metadata: 'Renewable Energy Investment Distribution'
  },
  {
    type: 'co2Reduction',
    data: {
      labels: ['Global Reduction', 'Developed Countries', 'Developing Countries', 'Emerging Economies', 'Island Nations'],
      datasets: [{
        label: 'CO2 Reduction Comparison',
        data: [200, 85, 65, 40, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ]
      }]
    },
    year: new Date().getFullYear(),
    metadata: 'Global and Regional CO2 Reduction Comparisons'
  },
  {
    type: 'renewableGrowth',
    data: {
      labels: ['Hydropower', 'Solar', 'Wind', 'Geothermal', 'Biomass'],
      datasets: [
        {
          label: 'Installed Capacity (GW)',
          data: [1300, 850, 750, 150, 120],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }
      ]
    },
    year: new Date().getFullYear(),
    metadata: 'Renewable Energy Installed Capacity by Source'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connection established');

    // Clear existing data (optional)
    await ChartData.deleteMany({});
    console.log('Existing data cleared');

    // Insert new data
    const insertedData = await ChartData.insertMany(initialData);
    console.log(`${insertedData.length} documents inserted`);

    // Close the connection
    await mongoose.connection.close();
    console.log('Seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding script
seedDatabase();