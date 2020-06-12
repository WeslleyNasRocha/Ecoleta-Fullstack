import { extendType, objectType } from '@nexus/schema'
import { Context } from '../context'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.id('id')
    t.string('image')
    t.string('title')
    t.string('image_url', {
      resolve: (root) => `/static/${root.image}`,
    })
  },
})

export const ItemQueryResolver = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('items', {
      type: Item,
      resolve: async (root, args, context: Context) =>
        await context.prisma.item.findMany(),
    })
  },
})
