import React, { useContext } from "react";
import { Button, useToast } from "@chakra-ui/react";
import to from "await-to-js";
import UserContext from "../contexts/UserContext";
import { useReserveBookMutation } from "../graphql/mutations/ReserveBook";

interface ReserveBookProps {
  bookId: number;
}

const ReserveBook: React.FC<ReserveBookProps> = ({ bookId }) => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [reserveBook, { loading }] = useReserveBookMutation();

  return (
    <Button
      onClick={async () => {
        const [error, result] = await to(
          reserveBook({
            variables: { reserveBookInput: { bookId, reserverId: user!.id } },
          })
        );

        const errorMessage =
          result?.data?.reserveBook.error ||
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
          title: "Successfully reserved book!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }}
      isLoading={loading}
      size="xs"
      colorScheme="blue"
      fontSize="xs"
      fontWeight="bold"
      rounded="lg"
      textTransform="uppercase"
    >
      Reserve
    </Button>
  );
};
export default ReserveBook;
