const User = require('./models/User');
const Listing = require('./models/Listing');
const Booking = require('./models/Booking');

exports.resolvers = {
    Query: {
        searchListingByName: async (parent, args) => {
            return await Listing.find({"listing_title" : args.listing_title});
        },
        searchListingByCity: async (parent, args) => {
            return await Listing.find({"city" : args.city});
        },
        searchListingByPostalCode: async (parent, args) => {
            return await Listing.find({"postal_code" : args.postal_code});
        }
    }
}