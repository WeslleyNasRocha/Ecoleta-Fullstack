import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { context } from '../../graphql/context'
import { schema } from '../../graphql/schema'

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS'],
})

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  context,
})

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default cors(handler)
