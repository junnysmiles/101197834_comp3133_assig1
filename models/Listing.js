const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    listing_id: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    listing_title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String, 
        required: true,
        maxLength: 1000,
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true,
        default: 0,
        validate(value) {
            if (value < 0.0){
               throw new Error("Please enter a valid price!");
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        validate: function(value){
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
            return emailRegex.test(value)
        }
    },
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;