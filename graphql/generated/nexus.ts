/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "../context"



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
  PointWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Item: { // root type
    id: string; // ID!
    image: string; // String!
    title: string; // String!
  }
  Mutation: {};
  Point: { // root type
    city: string; // String!
    email: string; // String!
    id: number; // Int!
    image: string; // String!
    latitude: number; // Float!
    longitude: number; // Float!
    name: string; // String!
    uf: string; // String!
    whatsapp: string; // String!
  }
  Query: {};
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  PointWhereUniqueInput: NexusGenInputs['PointWhereUniqueInput'];
}

export interface NexusGenFieldTypes {
  Item: { // field return type
    id: string; // ID!
    image: string; // String!
    image_url: string; // String!
    title: string; // String!
  }
  Point: { // field return type
    city: string; // String!
    email: string; // String!
    id: number; // Int!
    image: string; // String!
    latitude: number; // Float!
    longitude: number; // Float!
    name: string; // String!
    uf: string; // String!
    whatsapp: string; // String!
  }
  Query: { // field return type
    items: NexusGenRootTypes['Item'][]; // [Item!]!
    point: NexusGenRootTypes['Point'] | null; // Point
  }
}

export interface NexusGenArgTypes {
  Query: {
    point: { // args
      where: NexusGenInputs['PointWhereUniqueInput']; // PointWhereUniqueInput!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Item" | "Mutation" | "Point" | "Query";

export type NexusGenInputNames = "PointWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}