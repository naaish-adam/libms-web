import { gql, MutationHookOptions, useMutation } from "@apollo/client";
import { Reserve } from "../../interfaces";

interface ReserveBookQuery {
  reserveBook: {
    error: string;
    reserve: Reserve;
  };
}

interface ReserveBookInput {
  reserveBookInput: {
    bookId: number;
    reserverId: number;
  };
}

export const RESERVE_BOOK = gql`
  mutation ReserveBook($reserveBookInput: ReserveBookInput!) {
    reserveBook(reserveBookInput: $reserveBookInput) {
      error
      reserve {
        id
        active
      }
    }
  }
`;

export function useReserveBookMutation(
  baseOptions?: MutationHookOptions<ReserveBookQuery, ReserveBookInput>
) {
  return useMutation<ReserveBookQuery, ReserveBookInput>(
    RESERVE_BOOK,
    baseOptions
  );
}
