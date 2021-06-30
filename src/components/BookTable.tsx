import React from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Spinner,
  Flex,
  ButtonGroup,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useDeleteBookMutation } from "../graphql/mutations/DeleteBook";
import { BookListQuery } from "../graphql/queries/BookList";
import AddCopy from "./AddCopy";
import CopyLocations from "./CopyLocations";
import AddBook from "./AddBook";
import { CopyStatus } from "../interfaces";

interface BookTableProps {
  data: BookListQuery | undefined;
  loading: boolean;
  next: () => void;
  back: () => void;
}

const BookTable: React.FC<BookTableProps> = ({ data, loading, next, back }) => {
  const toast = useToast();

  const [deleteBook, { loading: deleting }] = useDeleteBookMutation();

  if (loading) {
    return <Spinner ml="50%" pt={5} />;
  }

  if ((data?.books.edges.length as number) === 0) {
    return (
      <Text pt={5} textAlign="center" fontSize="lg" fontWeight="bold">
        such empty 🥺
      </Text>
    );
  }

  const hasPrevPage = data?.books.pageInfo.hasPreviousPage;
  const hasNextPage = data?.books.pageInfo.hasNextPage;

  const displayNextAndPrev = hasPrevPage || hasNextPage;

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ISBN</Th>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Published On</Th>
            <Th textAlign="center">Copies</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.books.edges.map((book) => (
            <Tr key={book.node.id}>
              <Td>{book.node.isbn}</Td>
              <Td fontWeight="semibold">{book.node.name}</Td>
              <Td>{book.node.author}</Td>
              <Td>{new Date(book.node.publishedDate).toDateString()}</Td>
              <Td textAlign="center">
                {(() => {
                  const noOfCopies = book.node.copies?.length || 0;

                  const comp = <Text fontWeight="bold">{noOfCopies}</Text>;
                  if (noOfCopies === 0) {
                    return comp;
                  }
                  const isAvailable =
                    book.node.copies!.filter(
                      (copy) => copy.status === CopyStatus.AVAILABLE
                    ).length > 0;

                  return (
                    <CopyLocations
                      trigger={
                        <Box
                          color={isAvailable ? "green.200" : "orange.200"}
                          display="inline-block"
                          cursor="pointer"
                        >
                          {comp}
                        </Box>
                      }
                      copies={book.node.copies!}
                    />
                  );
                })()}
              </Td>
              <Td isNumeric>
                <ButtonGroup size="xs" variant="link" spacing="2">
                  <AddCopy
                    bookId={book.node.id}
                    buttonProps={{ title: "Add", colorScheme: "green" }}
                  />
                  <AddBook
                    book={{
                      id: book.node.id,
                      name: book.node.name,
                      author: book.node.author,
                      publishedDate: new Date(book.node.publishedDate),
                      cover: book.node.cover,
                      isbn: book.node.isbn,
                      category: book.node.category,
                    }}
                    buttonProps={{ title: "Edit", colorScheme: "blue" }}
                  />
                  <Button
                    isLoading={deleting}
                    onClick={async () => {
                      await deleteBook({ variables: { id: book.node.id } });
                      toast({
                        title: `Book deleted!`,
                        status: "success",
                        duration: 1500,
                        isClosable: true,
                      });
                    }}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex mt={2} justifyContent="flex-end" gridGap={2}>
        {displayNextAndPrev && (
          <>
            <Button disabled={!hasPrevPage} onClick={back}>
              Back
            </Button>
            <Button disabled={!hasNextPage} onClick={next}>
              Next
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};
export default BookTable;
