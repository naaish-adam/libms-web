import {
  gql,
  LazyQueryHookOptions,
  QueryHookOptions,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
import { BookFields } from "../fragments";

interface Paginated<T> {
  edges: [
    {
      cursor: string;
      node: T;
    }
  ];
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface Book {
  id: number;
  name: string;
  isbn?: number;
  cover?: string;
  author: string;
  publishedDate: Date;
}

interface Forward {
  first?: number;
  after?: string;
  last?: never;
  before?: never;
}
interface Backward {
  last?: number;
  before?: string;
  first?: never;
  after?: never;
}

type Pagination = Forward | Backward;

interface BookListBase {
  filter?: {
    searchTerm?: string;
  };
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
