import { gql, MutationHookOptions, useMutation } from "@apollo/client";
import { Copy, CopyStatus } from "../../interfaces";

interface AddCopyQuery {
  addCopy: {
    error: string;
    copy: Copy;
  };
}

interface AddCopyInput {
  copyInput: {
    bookId: number;
    status: CopyStatus;
    rackNo: string;
  };
}

export const ADD_COPY = gql`
  mutation AddCopy($copyInput: CopyInput!) {
    addCopy(copyInput: $copyInput) {
      error
      copy {
        rackNo
        status
      }
    }
  }
`;

export function useAddCopyMutation(
  baseOptions?: MutationHookOptions<AddCopyQuery, AddCopyInput>
) {
  return useMutation<AddCopyQuery, AddCopyInput>(ADD_COPY, baseOptions);
}
