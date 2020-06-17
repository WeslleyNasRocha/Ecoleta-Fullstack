import { extendType, objectType } from '@nexus/schema'

export const Point = objectType({
  name: 'Point',
  definition: (t) => {
    t.model.id()
    t.model.image()
    t.model.name()
    t.model.email()
    t.model.whatsapp()
    t.model.latitude()
    t.model.longitude()
    t.model.city()
    t.model.uf()
    t.model.items()
  },
})

export const PointQueryResolver = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.point()
    t.crud.points()
    // t.field("")
  },
})

export const PoinMutationResolver = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOnePoint()
  },
})
