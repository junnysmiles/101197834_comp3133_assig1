const express = require('express');
const mongoose = require('mongoose');
const TypeDefs = require('./schema');
Resolvers = require('./resolvers');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

//Store sensetive information to env variables
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGODB_URL;

//Connect to mongoDB Atlas
const connect = mongoose.connect(url, 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(success => {
    console.log('Mongodb connection successful!')
}).catch(err => {
    console.log('MongoDB Connection ERROR...' + err)
});

//Define Apollo Server
const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers
});

const app = express();
app.use(bodyParser.json());
app.use('*', cors());
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () =>
  console.log(`🔥 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));