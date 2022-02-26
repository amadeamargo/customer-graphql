const express = require('express')
const app = express()
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema.js')

app.use('/graphql', expressGraphQL({
  schema: schema, 
  graphiql: true
}))
app.listen(4000, () => { console.log('Server listening on PORT 4000')})