const mongoose = require('mongoose');

const ChartDataSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'renewableGrowth', 
      'energySourceDistribution', 
      'co2Reduction', 
      'investmentTrends',
      'yearlyGoalsProgress'
    ],
    required: true
  },
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  data: {
    labels: [String],
    datasets: [{
      label: String,
      data: [Number],
      borderColor: {
        type: String,
        default: ''
      },
      backgroundColor: {
        type: [String],
        default: []
      }
    }]
  },
  metadata: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const ChartData = mongoose.model('ChartData', ChartDataSchema);

module.exports = ChartData;