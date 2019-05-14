const mongoose = require('mongoose');

const WaterPollutionLogScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timeStamp: {
        type: Date,
        default: Date.now
    },
    // Last pollution rate before POST
    // Modify below
    tempPollutionRate:{
        type: Number,
        default: 0
    },
    currentPollutionRate: {
        type: Number,
        required: true,
        default: 0
    },
    toilet: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Water_pollution', WaterPollutionLogScheme);