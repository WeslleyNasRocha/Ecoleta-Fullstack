import { makeSchema } from '@nexus/schema'
import { nexusPrismaPlugin } from 'nexus-prisma'
import path from 'path'
import * as AllTypes from './modules'

export const schema = makeSchema({
  types: AllTypes,
  plugins: [nexusPrismaPlugin()],
  outputs: {
    typegen: path.join(
      process.cwd(),
      'graphql',
      'generated',
      'nexus-typegen.ts'
    ),
    schema: path.join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: path.join(process.cwd(), 'graphql', 'context.ts'),
        alias: 'Context',
      },
    ],
  },
})
