import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const httpLink = createHttpLink({
  uri: "https://immune-tarpon-93.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "yEzc7jWO3nVzQc7hrdExoEys5lgToa3Gr7W80KY87xA82NOQ9d1kfoaBczguaTtQ",
  }
})

export const gqlClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

