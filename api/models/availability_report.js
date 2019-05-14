const mongoose = require('mongoose');

const BathroomAvailabilityReportScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {type: String, required: true, default: "Availability"},
    report: {type: String, required: true},
    toilet: {type: Number, required: true}
});

module.exports = mongoose.model('Availability_report', BathroomAvailabilityReportScheme);
