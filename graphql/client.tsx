import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

interface WithApolloProps {
  apolloClient?: ApolloClient<NormalizedCacheObject>
  apolloState: NormalizedCacheObject
  [x: string]: any
}

export interface WithApolloContext extends NextPageContext {
  apolloClient?: ApolloClient<NormalizedCacheObject>
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 */
export function withApollo(PageComponent: NextPage, { ssr = true } = {}) {
  const WithApollo = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: WithApolloProps) => {
    const client = apolloClient || initApolloClient(apolloState)
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }
    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: WithApolloContext) => {
      const { AppTree } = ctx

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.

      const apolloClient = initApolloClient()
      ctx.apolloClient = apolloClient
      // console.log(apolloClient)
      // Run wrapped getInitialProps methods
      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      // Only on the server
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res?.finished) {
          return pageProps
        }
        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr')

            await getDataFromTree(
              <AppTree pageProps={{ ...pageProps, apolloClient }} />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }
          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind()
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()
      return {
        ...pageProps,
        apolloState,
      }
    }
  }

  return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
export const initApolloClient = (initialState?: NormalizedCacheObject) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState)
  }

  return apolloClient
}

/**
 * Creates and configures the ApolloClient
 */
export const createApolloClient = (apolloState: NormalizedCacheObject = {}) => {
  const ssrMode = typeof window === 'undefined'
  const cache = new InMemoryCache().restore(apolloState)

  return new ApolloClient({
    ssrMode,
    link: createIsomorphLink(),
    cache,
  })
}

const createIsomorphLink = () => {
  const { HttpLink } = require('apollo-link-http')
  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  })
}
