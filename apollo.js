import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = "token";

/* Reactive Var */
export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

/* Login: 1. set AsyncStorage; 2. set Reactive Vars */
export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);

  isLoggedInVar(true);
  tokenVar(token);
};

/* Logout: set AsyncStorage; 2. set Reactive Vars */
export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(""); // empty token
};

/* HTTP link */
const httpLink = createHttpLink({
  //uri: "https://selfish-lionfish-56.loca.lt",
  uri: "http://localhost:4000/",
});

/* Authentication link (for request headers) */
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(), // no arg input --> use the tokenVar
    },
  };
});

/* cache definition for FEED; export for cache persist (app preload) */
export const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

// init apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: apolloCache,
});

export default client;
