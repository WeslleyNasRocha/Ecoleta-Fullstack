import { extendType, objectType, stringArg } from '@nexus/schema'
import fetch from 'isomorphic-unfetch'

export const Region = objectType({
  name: 'Region',
  definition: (t) => {
    t.id('id')
    t.string('sigla')
    t.string('nome')
  },
})

export const UF = objectType({
  name: 'UF',
  definition: (t) => {
    t.id('id')
    t.string('sigla')
    t.string('nome')
    t.field('regiao', {
      type: 'Region',
    })
  },
})

export const Mesorregiao = objectType({
  name: 'Mesorregiao',
  definition: (t) => {
    t.id('id')
    t.string('nome')
    t.field('UF', {
      type: 'UF',
    })
  },
})

export const Microrregiao = objectType({
  name: 'Microrregiao',
  definition: (t) => {
    t.id('id')
    t.string('nome')
    t.field('mesorregiao', {
      type: 'Mesorregiao',
    })
  },
})

export const Municipio = objectType({
  name: 'Municipio',
  definition: (t) => {
    t.id('id')
    t.string('nome')
    t.field('microrregiao', {
      type: 'Microrregiao',
    })
  },
})

export const QueryAddress = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('ufs', {
      type: UF,
      args: { orderBy: stringArg({ required: false }) },
      resolve: async (root, args) => {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados${
            args.orderBy ? `?orderBy=${args.orderBy}` : ''
          }`
        )
        if (!response.ok) {
          throw new Error('Could not fetch the ufs')
        }

        return await response.json()
      },
    })
    t.list.field('citiesByUF', {
      type: Municipio,
      args: {
        uf: stringArg({ required: true }),
        orderBy: stringArg({ required: false }),
      },
      resolve: async (root, args) => {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${
            args.uf
          }/municipios${args.orderBy ? `?orderBy=${args.orderBy}` : ''}`
        )

        if (!response.ok) {
          throw new Error('Could not fetch the cities')
        }

        return await response.json()
      },
    })
  },
})
