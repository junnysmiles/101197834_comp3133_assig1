const User = require('./models/User');
const Listing = require('./models/Listing');
const Booking = require('./models/Booking');

exports.resolvers = {
    Query: {
        // Get users just for debugging purposes
        getUsers: async (parent, args) => {
            return await User.find({})
        },
        login: async (parent, args) => {
            let user = await User.findOne({$and: [{username: args.username}, {password: args.password}]})

            if(!user) {
                throw new Error("User invalid, or combination does not match...")
            }

            if(user.type == 'customer') {
                return {secret: process.env.user_pw}
            }

            if(user.type == 'admin') {
                return {secret: process.env.admin_pw}
            }
        },
        searchListingByName: async (parent, args) => {
            return await Listing.find({"listing_title" : args.listing_title});
        },
        searchListingByCity: async (parent, args) => {
            return await Listing.find({"city" : args.city});
        },
        searchListingByPostalCode: async (parent, args) => {
            return await Listing.find({"postal_code" : args.postal_code});
        },
        searchBookingById: async (parent, args) => {
            return await Booking.find({"booking_id" : args.booking_id})
        },
        viewUserBookings: async (parent, args) => {
            if(args.username && args.secret == process.env.user_pw) {
                return await Booking.find({username: args.username})
            } else {
                throw new Error("Only this user can access...")
            }
        },
        viewAllListings: async (parent, args) => {
            return await Listing.find({})
        },
        viewListingsCreatedByAdmin: async (parent, args) => {
            if(args.secret == process.env.admin_pw) {
                return await Listing.find({})
            } else {
                throw new Error("Admin Access Only")
            }
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const email = args.email
            const password = args.password

            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const isValidEmail = emailExpression.test(String(email).toLowerCase())

            const passExpression = /^[A-Za-z0-9#$&_]+$/
            const isValidPass = passExpression.test(String(password))

            if(!isValidEmail) {
                throw new Error("Email invalid format!")
            }

            if(!isValidPass) {
                throw new Error("Password can only contain uppercase, lowercase, numbers, and special characters!")
            }

            let newUser = new User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                password: args.password,
                email: args.email,
                type: args.type
            });
            return await newUser.save()
        },
        createListing: async (parent, args) => {
            const email = args.email

            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const isValidEmail = emailExpression.test(String(email).toLowerCase())

            if(!isValidEmail) {
                throw new Error("Email invalid format!")
            }

            if(args.secret == process.env.admin_pw) {
                let newListing = new Listing({
                    listing_id: args.listing_id,
                    listing_title: args.listing_title,
                    description: args.description,
                    street: args.street,
                    city: args.city,
                    postal_code: args.postal_code,
                    price: args.price,
                    email: args.email,
                    username: args.username
                })
                return await newListing.save()
            } else {
                throw new Error("You must be an admin to create a listing!")
            }
        },
        createBooking: async (parent, args) => {
            if(args.secret == process.env.user_pw) {
                let newBooking = new Booking({
                    listing_id: args.listing_id,
                    booking_id: args.booking_id,
                    booking_date: args.booking_date,
                    booking_start: args.booking_start,
                    booking_end: args.booking_end,
                    username: args.username
                })
                return await newBooking.save()
            } else {
                throw new Error("Failed to create booking.")
            }
        }
    }
}