const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const apiUrl = "http://localhost:5000/customers"

// const customers = [
//   { id: "1", name: "Dolly Parton", email: "dolly@email.com", age: 74 },
//   { id: "2", name: "Kenny Rogers", email: "kennym@email.com", age: 80 },
//   { id: "3", name: "Zac Brown", email: "zac@email.com", age: 40 },
// ];

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
        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id == args.id) {
        //     return customers[i];
        //   }
        // }
        return axios.get(`${apiUrl}/${args.id}`)
                    .then(customer => customer.data)
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args){
        // return customers
        return axios.get(apiUrl)
                    .then(customers => customers.data)
      }
    }
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString)},
        email: { type: new GraphQLNonNull(GraphQLString)},
        age: { type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parentValue, args){
        return axios.post(apiUrl, {
          name: args.name,
          email: args.email,
          age: args.age
        })
        .then(customer => customer.data)
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue, args){
        return axios.delete(`${apiUrl}/${args.id}`)
        .then(customer => customer.data)
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        age: { type: GraphQLInt},
      },
      resolve(parentValue, args){
        return axios.patch(`${apiUrl}/${args.id}`, args)
        .then(customer => customer.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
