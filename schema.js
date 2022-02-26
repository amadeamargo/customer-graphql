const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const customers = [
  { id: "1", name: "Dolly Parton", email: "dolly@email.com", age: 74 },
  { id: "2", name: "Kenny Rogers", email: "kennym@email.com", age: 80 },
  { id: "3", name: "Zac Brown", email: "zac@email.com", age: 40 },
];

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id == args.id) {
            return customers[i];
          }
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
