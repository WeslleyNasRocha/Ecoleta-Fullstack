import { extendType, objectType } from '@nexus/schema'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.model.id()
    t.model.image()
    t.model.title()
    t.model.points()

    t.string('imageUrl', {
      resolve: (root) => {
        return `/static/${root.image}`
      },
    })
  },
})

export const ItemQueryResolver = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.item()
    t.crud.items()
  },
})
