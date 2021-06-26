import {
  gql,
  LazyQueryHookOptions,
  QueryHookOptions,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
import { Book, Paginated, Pagination } from "../../interfaces";
import { BookFields } from "../fragments";

export interface BookListFilter {
  searchTerm?: string;
  onlyAvailable?: boolean;
}
interface BookListBase {
  filter?: BookListFilter;
}

export type BookListVariables = Pagination & BookListBase;
export interface BookListQuery {
  books: Paginated<Book>;
}

export const BOOK_LIST = gql`
  ${BookFields}
  query BookList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: BooksFilterInput
  ) {
    books(
      first: $first
      after: $after
      last: $last
      before: $before
      filter: $filter
    ) {
      edges {
        node {
          ...BookFields
          copies {
            id
            rackNo
            status
          }
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

export function useBookListQuery(
  baseOptions?: QueryHookOptions<BookListQuery, BookListVariables>
) {
  return useQuery<BookListQuery, BookListVariables>(BOOK_LIST, baseOptions);
}
export function useBookListLazyQuery(
  baseOptions?: LazyQueryHookOptions<BookListQuery, BookListVariables>
) {
  return useLazyQuery<BookListQuery, BookListVariables>(BOOK_LIST, baseOptions);
}
