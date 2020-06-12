import { extendType, objectType } from '@nexus/schema'

export const Point = objectType({
  name: 'Point',
  definition: (t) => {
    t.model.id('id')
    t.model.string('image')
    t.model.string('name')
    t.model.string('email')
    t.model.string('whatsapp')
    t.model.float('latitude')
    t.model.float('longitude')
    t.model.string('city')
    t.model.string('uf')
    // t.model.items({})
  },
})

export const PointQueryResolver = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.point()
  },
})

export const PoinMutationResolver = extendType({
  type: 'Mutation',
  definition: (t) => {
    // t.
  },
})

// export const AddPointInput = inputObjectType({
//   name: 'AddPointInput',
//   definition(t) {
//     t.string('image', {
//       required: true,
//       default:
//         'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
//     })
//     t.string('name', { required: true })
//     t.string('email', { required: true })
//     t.string('whatsapp', { required: true })
//     t.float('latitude', { required: true })
//     t.float('longitude', { required: true })
//     t.string('city', { required: true })
//     t.string('uf', { required: true })
//     t.list.int('item_ids', { required: true })
//   },
// })

// export const PointMutationResolver = extendType({
//   type: 'Mutation',
//   definition: (t) => {
//     t.field('addPoint', {
//       type: 'Point',
//       nullable: true,
//       args: {
//         data: AddPointInput,
//       },
//       resolve: async (
//         root,
//         args: { data: typeof AddPointInput },
//         context: Context
//       ) => {
//         const createdPoint = await context.prisma.point.create({
//           data: {
//             city: args
//           },
//         })

//         return null
//       },
//     })
//   },
// })
