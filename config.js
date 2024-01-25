import withApollo from "next-with-apollo";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";


export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_APP_URL,
  cache: new InMemoryCache()
});

export default withApollo(
  () => {
    return client;
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);
