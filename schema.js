// ok heres what you need to do:
/**
 * view all user bookings logged in as user
 * view all listings added by admin as admin
 */

const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        password: String!
        email: String!
        type: String!
    }

    type Listing {
        id: ID!
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        username: String!
    }

    type Booking {
        id: ID!
        listing_id: String!
        booking_id: String!
        booking_date: Date!
        booking_start: Date!
        booking_end: Date!
        username: String!
    }

    type Authentication {
        secret: String
    }

    scalar Date

    type Query {
        getUsers : [User]

        login(username: String!, password: String!) : Authentication

        searchListingByName(listing_title: String!) : [Listing]
        searchListingByCity(city: String!) : [Listing]
        searchListingByPostalCode(postal_code: String!) : [Listing]

        searchBookingById(booking_id: String!) : [Booking]

        viewUserBookings(username: String!, secret: String!) : [Booking]

        viewAllListings : [Listing]
        viewListingsCreatedByAdmin(secret: String!) : [Listing]
    }

    type Mutation {
        createUser(
            username: String!
            firstname: String!
            lastname: String!
            password: String!
            email: String!
            type: String!
        ) : User

        createListing(
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            postal_code: String!
            price: Float!
            email: String!
            username: String!
            secret: String!
        ) : Listing

        createBooking(
            listing_id: String!
            booking_id: String!
            booking_date: Date!
            booking_start: Date!
            booking_end: Date!
            username: String!
            secret: String!
        ) : Booking
    }
`