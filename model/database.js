const mongoose = require("mongoose");

const databaseSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    }, 
    lastName: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    },
    arrivalDate: {
        required: true,
        type: Date,
        default: Date.now
    },
    depatureDate: {
        required: true,
        type: Date,
        default: Date
    },
    numberOfAdults: {
        required: true,
        type: Number,
    },
    numberOfChildren: {
        required: true,
        type: Number,
        default: 0
    },
    comments: {
        type: String,
        default: "The user said nothing"
    }
})

module.exports = mongoose.model("BookingInfo", databaseSchema);