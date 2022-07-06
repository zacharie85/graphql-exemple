const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const app = express();
const PORT = 2500;

const path = require('path');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql')); // load files content .graphql
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log('====================================');
    console.log("Server graphQl is listeneing on port " + PORT);
    console.log('====================================');
})