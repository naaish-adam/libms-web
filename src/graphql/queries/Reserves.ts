import {
  gql,
  LazyQueryHookOptions,
  QueryHookOptions,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
import { Reserve, Paginated, Pagination } from "../../interfaces";
import { BookFields } from "../fragments";

export interface ReservesFilter {
  active: boolean;
  searchTerm?: string;
  onlyAvailable?: boolean;
  userId?: number;
}

interface ReservesBase {
  filter: ReservesFilter;
}

export type ReservesVariables = Pagination & ReservesBase;
export interface ReservesQuery {
  reserves: Paginated<Reserve>;
}

export const RESERVES = gql`
  ${BookFields}
  query Reserves(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: ReservesFilterInput!
  ) {
    reserves(
      first: $first
      after: $after
      last: $last
      before: $before
      filter: $filter
    ) {
      edges {
        node {
          id
          active
          book {
            ...BookFields
          }
          reserver {
            username
          }
          position
          createdAt
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

export function useReservesQuery(
  baseOptions?: QueryHookOptions<ReservesQuery, ReservesVariables>
) {
  return useQuery<ReservesQuery, ReservesVariables>(RESERVES, baseOptions);
}
export function useReservesLazyQuery(
  baseOptions?: LazyQueryHookOptions<ReservesQuery, ReservesVariables>
) {
  return useLazyQuery<ReservesQuery, ReservesVariables>(RESERVES, baseOptions);
}
