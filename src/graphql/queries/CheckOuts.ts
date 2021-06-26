import {
  gql,
  LazyQueryHookOptions,
  QueryHookOptions,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
import { CheckOut, Paginated, Pagination } from "../../interfaces";

import { BookFields } from "../fragments";

interface CheckOutsBase {
  filter: {
    returned: boolean;
    searchTerm?: string;
  };
}

export type CheckOutsVariables = Pagination & CheckOutsBase;
export interface CheckOutsQuery {
  checkOuts: Paginated<CheckOut>;
}

export const CHECK_OUTS = gql`
  ${BookFields}
  query CheckOuts(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: CheckOutsFilterInput!
  ) {
    checkOuts(
      first: $first
      after: $after
      last: $last
      before: $before
      filter: $filter
    ) {
      edges {
        node {
          id
          borrower {
            id
            username
          }
          copy {
            id
            book {
              ...BookFields
            }
          }
          dueAt
          updatedAt
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export function useCheckOutsQuery(
  baseOptions?: QueryHookOptions<CheckOutsQuery, CheckOutsVariables>
) {
  return useQuery<CheckOutsQuery, CheckOutsVariables>(CHECK_OUTS, baseOptions);
}
export function useCheckOutsLazyQuery(
  baseOptions?: LazyQueryHookOptions<CheckOutsQuery, CheckOutsVariables>
) {
  return useLazyQuery<CheckOutsQuery, CheckOutsVariables>(
    CHECK_OUTS,
    baseOptions
  );
}
