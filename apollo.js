import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* Reactive Var */
export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

/* Login: 1. set AsyncStorage; 2. set Reactive Vars */
export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["loggedIn", "yes"],
    ["token", token],
  ]);

  isLoggedInVar(true);
  tokenVar(token);
};

// init apollo client
const client = new ApolloClient({
  uri: "https://terrible-squid-22.loca.lt",
  cache: new InMemoryCache(),
});

export default client;
