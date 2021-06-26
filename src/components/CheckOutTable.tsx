import React from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useCheckOutsQuery } from "../graphql/queries/CheckOuts";
import { useReturnBookMutation } from "../graphql/mutations/CheckOutBook";

interface CheckOutProps {
  returned: boolean;
}

const CheckOutTable: React.FC<CheckOutProps> = ({ returned }) => {
  const pageLimit = 10;

  const toast = useToast();

  const { data, loading, fetchMore } = useCheckOutsQuery({
    variables: { first: pageLimit, filter: { returned } },
  });

  const [returnBook, { loading: returning }] = useReturnBookMutation();

  if (loading) {
    return <Spinner />;
  }

  const hasPrevPage = data?.checkOuts.pageInfo.hasPreviousPage;
  const hasNextPage = data?.checkOuts.pageInfo.hasNextPage;

  const startCursor = data?.checkOuts.pageInfo.startCursor;
  const endCursor = data?.checkOuts.pageInfo.endCursor;

  const displayNextAndPrev = hasPrevPage || hasNextPage;

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Book</Th>
            <Th>Borrower</Th>
            <Th>Due</Th>
            <Th>{returned ? "Returned At" : "Action"}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.checkOuts.edges.map((checkOut) => (
            <Tr key={checkOut.node.id}>
              <Td>{checkOut.node.copy.book?.name}</Td>
              <Td fontWeight="semibold">{checkOut.node.borrower.username}</Td>
              <Td>{new Date(checkOut.node.dueAt).toDateString()}</Td>
              <Td>
                {returned ? (
                  new Date(+(checkOut.node.updatedAt as Date)).toDateString()
                ) : (
                  <ButtonGroup size="xs" variant="link" spacing="2">
                    <Button
                      isLoading={returning}
                      colorScheme="orange"
                      onClick={async () => {
                        await returnBook({
                          variables: { id: checkOut.node.id },
                        });
                        toast({
                          title: "Successfully returned book!",
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        });
                      }}
                    >
                      Return
                    </Button>
                  </ButtonGroup>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex mt={2} justifyContent="flex-end" gridGap={2}>
        {displayNextAndPrev && (
          <>
            <Button
              disabled={!hasPrevPage}
              onClick={() =>
                fetchMore({
                  variables: {
                    first: undefined,
                    last: pageLimit,
                    before: startCursor,
                    filter: { returned },
                  },
                })
              }
            >
              Back
            </Button>
            <Button
              disabled={!hasNextPage}
              onClick={() =>
                fetchMore({
                  variables: {
                    first: pageLimit,
                    after: endCursor,
                    filter: { returned },
                  },
                })
              }
            >
              Next
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};
export default CheckOutTable;
