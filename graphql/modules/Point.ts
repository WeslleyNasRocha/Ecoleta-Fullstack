import { extendType, inputObjectType, objectType } from '@nexus/schema'
import { Context } from '../context'

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

const createOnePointInput = inputObjectType({
  name: 'PointCreateInput',
  definition: (t) => {
    t.string('image', { nullable: false })
    t.string('name', { nullable: false })
    t.string('email', { nullable: false })
    t.string('whatsapp', { nullable: false })
    t.float('latitude', { nullable: false })
    t.float('longitude', { nullable: false })
    t.string('city', { nullable: false })
    t.string('uf', { nullable: false })
    t.list.int('itemIds', { nullable: false })
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
    t.field('createOnePoint', {
      type: 'Point',
      args: { data: createOnePointInput },
      resolve: async (root, args, ctx: Context) => {
        const {
          image,
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          city,
          uf,
          itemIds,
        } = args.data
        const serializedItems = itemIds.map((id: number) => ({ id }))
        const createdPoint = await ctx.prisma.point.create({
          data: {
            image,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items: {
              connect: serializedItems,
            },
          },
          include: { items: true },
        })

        return createdPoint
      },
    })
  },
})
