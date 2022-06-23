const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    vote_average: {
        type: Number,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { versionKey: false })

module.exports = mongoose.model("Suggestion", suggestionSchema);