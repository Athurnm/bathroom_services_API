const mongoose = require('mongoose');

const CleanlinessCommandScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {type: String, required: true, default: "Cleanliness"},
    username: {type: String, default:'Admin'},
    timeStamp: { type : Date, default: Date.now },
    command: {type: String, required: true},
    toilet: {type: Number, required: true},
    assignto: {type: String, required: true, default: "Janitor"}, //will change with janitor database and using janitor id
    solved: {type: Boolean, default: false}
});

module.exports = mongoose.model('Cleanliness_command', CleanlinessCommandScheme);
