import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const httpLink = createHttpLink({
  uri: "https://immune-tarpon-93.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_KEY ?? ""
  }
})

export const gqlClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

