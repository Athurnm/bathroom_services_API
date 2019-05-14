const mongoose = require('mongoose');

const WaterUsageLogScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timeStamp: {
        type: Date,
        default: Date.now
    },
    // Last Capacity before POST
    tempCapacity:{
        type: Number,
        default: 0
    },
    currentCapacity: {
        type: Number,
        required: true,
        default: 0
    },
    usageCapacity: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Water_usage', WaterUsageLogScheme);