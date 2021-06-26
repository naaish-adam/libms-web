import { gql, MutationHookOptions, useMutation } from "@apollo/client";

interface DeleteBookQuery {
  deleteBook: Boolean;
}

interface DeleteBookInput {
  id: number;
}

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(id: $id)
  }
`;

export function useDeleteBookMutation(
  baseOptions?: MutationHookOptions<DeleteBookQuery, DeleteBookInput>
) {
  return useMutation<DeleteBookQuery, DeleteBookInput>(DELETE_BOOK, {
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
