const mongoose = require('mongoose');

const AvailabilityManagementScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, default:'Admin'},
    timeStamp: { type : Date, default: Date.now },
    toilet: {type: Number, required: true}, //will change into toilet database and using toilet_id
    availableTime: {type: String, required: true},
    isAvailable: {type: Boolean, required: true,default: false}
});

module.exports = mongoose.model('Availability_Management', AvailabilityManagementScheme);
