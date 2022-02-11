import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      userName
      avatar
    }
  }
`;

export default function useMe() {
  /* check if user has token */
  const hasToken = useReactiveVar(isLoggedInVar);

  /* useQuery - skip when user does not have token (=== not logged in) */
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  /* useEffect - if no ME found, loguserOut --> detect it when the query data changes */
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);

  return { data };
}
