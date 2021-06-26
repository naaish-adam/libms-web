import { gql, MutationHookOptions, useMutation } from "@apollo/client";
import { CheckOut } from "../../interfaces";

interface CheckOutBookQuery {
  checkOutBook: {
    error: string;
    checkOut: CheckOut;
  };
}

interface CheckOutBookInput {
  checkOutBookInput: {
    bookId: number;
    borrowerId: number;
  };
}

export const CHECK_OUT_BOOK = gql`
  mutation CheckOutBook($checkOutBookInput: CheckOutBookInput!) {
    checkOutBook(checkOutBookInput: $checkOutBookInput) {
      error
      checkOut {
        id
        returned
        dueAt
      }
    }
  }
`;

export function useCheckOutBookMutation(
  baseOptions?: MutationHookOptions<CheckOutBookQuery, CheckOutBookInput>
) {
  return useMutation<CheckOutBookQuery, CheckOutBookInput>(
    CHECK_OUT_BOOK,
    baseOptions
  );
}

interface ReturnBookQuery {
  returnBook: true;
}

interface ReturnBookInput {
  id: number;
}

export const RETURN_BOOK = gql`
  mutation ReturnBook($id: Int!) {
    returnBook(id: $id)
  }
`;

export function useReturnBookMutation(
  baseOptions?: MutationHookOptions<ReturnBookQuery, ReturnBookInput>
) {
  return useMutation<ReturnBookQuery, ReturnBookInput>(
    RETURN_BOOK,
    baseOptions
  );
}
