import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://dev-retro-wizard-demo.pantheonsite.io/graphql',
  }),
  cache: new InMemoryCache(),
});