import { makeSchema } from '@nexus/schema'
import { nexusPrismaPlugin } from 'nexus-prisma'
import * as AllTypes from './modules'

// console.log(path.join);

export const schema = makeSchema({
  types: AllTypes,
  plugins: [nexusPrismaPlugin()],
  outputs: {
    // schema: path.resolve(__dirname, 'graphql/generated/schema.gen.graphql'),
    // typegen: path.join(__dirname, 'graphql/generated/nexusTypes.gen.ts'),
  },
})
