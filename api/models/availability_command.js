const mongoose = require('mongoose');

const AvailabilityCommandScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {type: String, required: true, default: "Availability"},
    username: {type: String, default:'Admin'},
    timeStamp: { type : Date, default: Date.now },
    command: {type: String, required: true},
    toilet: {type: Number, required: true}, //will change into toilet database and using toilet_id
    assignto: {type: String, required: true, default: "Engineer"}, //will change with janitor database and using janitor id
    solved: {type: Boolean, default: false}
});

module.exports = mongoose.model('Availability_Command', AvailabilityCommandScheme);
