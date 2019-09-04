const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema(
    {
        cityName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        description:{
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        temperature: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        icon: {
            type: String
        }
    }
);

module.exports = mongoose.model('Weather', weatherSchema);