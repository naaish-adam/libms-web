import { gql, MutationHookOptions, useMutation } from "@apollo/client";
import { Book } from "../../interfaces";
import { BookFields } from "../fragments";

enum BookMutations {
  ADD = "addBook",
  UPDATE = "updateBook",
}
type AddBookQuery = Record<BookMutations, Book>;

interface AddBookInput {
  bookInput: {
    name: string;
    isbn?: string;
    cover?: string;
    author: string;
    publishedDate: number;
  };
}

export const ADD_BOOK = gql`
  ${BookFields}
  mutation AddBook($bookInput: BookInput!) {
    addBook(bookInput: $bookInput) {
      ...BookFields
    }
  }
`;

export const UPDATE_BOOK = gql`
  ${BookFields}
  mutation UpdateBook($bookInput: BookInput!) {
    updateBook(bookInput: $bookInput) {
      ...BookFields
    }
  }
`;

export function useAddBookMutation(
  baseOptions?: MutationHookOptions<AddBookQuery, AddBookInput>
) {
  return useMutation<AddBookQuery, AddBookInput>(ADD_BOOK, {
    update(cache) {
      cache.modify({
        fields: {
          books() {},
        },
      });
    },
    ...baseOptions,
  });
}

export function useUpdateBookMutation(
  baseOptions?: MutationHookOptions<AddBookQuery, AddBookInput>
) {
  return useMutation<AddBookQuery, AddBookInput>(UPDATE_BOOK, {
    update(cache) {
      cache.modify({
        fields: {
          books() {},
        },
      });
    },
    ...baseOptions,
  });
}
