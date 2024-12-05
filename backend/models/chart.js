const mongoose = require('mongoose');

const ChartDataSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'renewableCapacity', 
      'energySourceDistribution', 
      'co2Reduction', 
      'investmentTrends',
      'globalMilestones',
      'emergingTrends'
    ],
    required: true
  },
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  metadata: {
    title: String,
    description: String,
    source: String
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