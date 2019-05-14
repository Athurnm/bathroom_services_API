const mongoose = require('mongoose');

const BathroomCleanlinessReportScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {type: String, required: true, default: "Cleanliness"},
    timeStamp: { type : Date, default: Date.now },
    report: {type: String, required: true},
    toilet: {type: Number, required: true}
});

module.exports = mongoose.model('Cleanliness_report', BathroomCleanlinessReportScheme);
