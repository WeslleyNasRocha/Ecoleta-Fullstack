module.exports = {
  client: {
    service: {
      name: 'Ecoleta',
      includes: ['./graphql/schema.graphql','./pages/**/*.tsx'],
      // localSchemaFile: './graphql/schema.graphql',
    },
  },
}
