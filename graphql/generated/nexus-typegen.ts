/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from '../context'

declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ItemCreateManyWithoutPointsInput: {
    // input type
    connect?: NexusGenInputs['ItemWhereUniqueInput'][] | null // [ItemWhereUniqueInput!]
    create?: NexusGenInputs['ItemCreateWithoutPointsInput'][] | null // [ItemCreateWithoutPointsInput!]
  }
  ItemCreateWithoutPointsInput: {
    // input type
    image: string // String!
    title: string // String!
  }
  ItemWhereUniqueInput: {
    // input type
    id?: number | null // Int
  }
  PointCreateInput: {
    // input type
    city: string // String!
    email: string // String!
    image: string // String!
    items?: NexusGenInputs['ItemCreateManyWithoutPointsInput'] | null // ItemCreateManyWithoutPointsInput
    latitude: number // Float!
    longitude: number // Float!
    name: string // String!
    uf: string // String!
    whatsapp: string // String!
  }
  PointWhereUniqueInput: {
    // input type
    id?: number | null // Int
  }
}

export interface NexusGenEnums {}

export interface NexusGenRootTypes {
  Item: {
    // root type
    id: number // Int!
    image: string // String!
    title: string // String!
  }
  Mesorregiao: {
    // root type
    id: string // ID!
    nome: string // String!
    UF: NexusGenRootTypes['UF'] // UF!
  }
  Microrregiao: {
    // root type
    id: string // ID!
    mesorregiao: NexusGenRootTypes['Mesorregiao'] // Mesorregiao!
    nome: string // String!
  }
  Municipio: {
    // root type
    id: string // ID!
    microrregiao: NexusGenRootTypes['Microrregiao'] // Microrregiao!
    nome: string // String!
  }
  Mutation: {}
  Point: {
    // root type
    city: string // String!
    email: string // String!
    id: number // Int!
    image: string // String!
    latitude: number // Float!
    longitude: number // Float!
    name: string // String!
    uf: string // String!
    whatsapp: string // String!
  }
  Query: {}
  Region: {
    // root type
    id: string // ID!
    nome: string // String!
    sigla: string // String!
  }
  UF: {
    // root type
    id: string // ID!
    nome: string // String!
    regiao: NexusGenRootTypes['Region'] // Region!
    sigla: string // String!
  }
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  ItemCreateManyWithoutPointsInput: NexusGenInputs['ItemCreateManyWithoutPointsInput']
  ItemCreateWithoutPointsInput: NexusGenInputs['ItemCreateWithoutPointsInput']
  ItemWhereUniqueInput: NexusGenInputs['ItemWhereUniqueInput']
  PointCreateInput: NexusGenInputs['PointCreateInput']
  PointWhereUniqueInput: NexusGenInputs['PointWhereUniqueInput']
}

export interface NexusGenFieldTypes {
  Item: {
    // field return type
    id: number // Int!
    image: string // String!
    imageUrl: string // String!
    points: NexusGenRootTypes['Point'][] // [Point!]!
    title: string // String!
  }
  Mesorregiao: {
    // field return type
    id: string // ID!
    nome: string // String!
    UF: NexusGenRootTypes['UF'] // UF!
  }
  Microrregiao: {
    // field return type
    id: string // ID!
    mesorregiao: NexusGenRootTypes['Mesorregiao'] // Mesorregiao!
    nome: string // String!
  }
  Municipio: {
    // field return type
    id: string // ID!
    microrregiao: NexusGenRootTypes['Microrregiao'] // Microrregiao!
    nome: string // String!
  }
  Mutation: {
    // field return type
    createOnePoint: NexusGenRootTypes['Point'] // Point!
  }
  Point: {
    // field return type
    city: string // String!
    email: string // String!
    id: number // Int!
    image: string // String!
    items: NexusGenRootTypes['Item'][] // [Item!]!
    latitude: number // Float!
    longitude: number // Float!
    name: string // String!
    uf: string // String!
    whatsapp: string // String!
  }
  Query: {
    // field return type
    citiesByUF: NexusGenRootTypes['Municipio'][] // [Municipio!]!
    item: NexusGenRootTypes['Item'] | null // Item
    items: NexusGenRootTypes['Item'][] // [Item!]!
    point: NexusGenRootTypes['Point'] | null // Point
    points: NexusGenRootTypes['Point'][] // [Point!]!
    ufs: NexusGenRootTypes['UF'][] // [UF!]!
  }
  Region: {
    // field return type
    id: string // ID!
    nome: string // String!
    sigla: string // String!
  }
  UF: {
    // field return type
    id: string // ID!
    nome: string // String!
    regiao: NexusGenRootTypes['Region'] // Region!
    sigla: string // String!
  }
}

export interface NexusGenArgTypes {
  Item: {
    points: {
      // args
      skip?: number | null // Int
    }
  }
  Mutation: {
    createOnePoint: {
      // args
      data: NexusGenInputs['PointCreateInput'] // PointCreateInput!
    }
  }
  Point: {
    items: {
      // args
      skip?: number | null // Int
    }
  }
  Query: {
    citiesByUF: {
      // args
      orderBy?: string | null // String
      uf: string // String!
    }
    item: {
      // args
      where: NexusGenInputs['ItemWhereUniqueInput'] // ItemWhereUniqueInput!
    }
    items: {
      // args
      skip?: number | null // Int
    }
    point: {
      // args
      where: NexusGenInputs['PointWhereUniqueInput'] // PointWhereUniqueInput!
    }
    points: {
      // args
      skip?: number | null // Int
    }
    ufs: {
      // args
      orderBy?: string | null // String
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames =
  | 'Item'
  | 'Mesorregiao'
  | 'Microrregiao'
  | 'Municipio'
  | 'Mutation'
  | 'Point'
  | 'Query'
  | 'Region'
  | 'UF'

export type NexusGenInputNames =
  | 'ItemCreateManyWithoutPointsInput'
  | 'ItemCreateWithoutPointsInput'
  | 'ItemWhereUniqueInput'
  | 'PointCreateInput'
  | 'PointWhereUniqueInput'

export type NexusGenEnumNames = never

export type NexusGenInterfaceNames = never

export type NexusGenScalarNames = 'Boolean' | 'Float' | 'ID' | 'Int' | 'String'

export type NexusGenUnionNames = never

export interface NexusGenTypes {
  context: Context.Context
  inputTypes: NexusGenInputs
  rootTypes: NexusGenRootTypes
  argTypes: NexusGenArgTypes
  fieldTypes: NexusGenFieldTypes
  allTypes: NexusGenAllTypes
  inheritedFields: NexusGenInheritedFields
  objectNames: NexusGenObjectNames
  inputNames: NexusGenInputNames
  enumNames: NexusGenEnumNames
  interfaceNames: NexusGenInterfaceNames
  scalarNames: NexusGenScalarNames
  unionNames: NexusGenUnionNames
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames']
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames']
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames']
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
}
