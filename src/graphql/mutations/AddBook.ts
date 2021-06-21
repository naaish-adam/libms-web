import { gql, MutationHookOptions, useMutation } from "@apollo/client";
import { BookFields } from "../fragments";

interface AddBookQuery {
  addBook: {
    id: number;
    name: string;
    isbn?: number;
    cover?: string;
    author: string;
    publishedDate: Date;
  };
}

interface AddBookInput {
  bookInput: {
    name: string;
    isbn?: number;
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

export function useAddBookMutation(
  baseOptions?: MutationHookOptions<AddBookQuery, AddBookInput>
) {
  return useMutation<AddBookQuery, AddBookInput>(ADD_BOOK, baseOptions);
}
