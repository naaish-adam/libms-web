import React, { useContext } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useCheckOutBookMutation } from "../graphql/mutations/CheckOutBook";
import to from "await-to-js";
import UserContext from "../contexts/UserContext";

interface CheckOutBookProps {
  bookId: number;
}

const CheckOutBook: React.FC<CheckOutBookProps> = ({ bookId }) => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [checkOutBook, { loading }] = useCheckOutBookMutation();

  return (
    <Button
      onClick={async () => {
        const [error, result] = await to(
          checkOutBook({
            variables: { checkOutBookInput: { bookId, borrowerId: user!.id } },
          })
        );

        const errorMessage =
          result?.data?.checkOutBook.error ||
          (error ? "An error occurred" : null);

        if (errorMessage) {
          toast({
            title: errorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        toast({
          title: "Successfully checked out book!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }}
      isLoading={loading}
      size="xs"
      colorScheme="green"
      fontSize="xs"
      fontWeight="bold"
      rounded="lg"
      textTransform="uppercase"
    >
      Check Out
    </Button>
  );
};
export default CheckOutBook;
