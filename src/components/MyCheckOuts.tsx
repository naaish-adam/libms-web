import React, { Fragment } from "react";
import {
  List,
  ListItem,
  Flex,
  HStack,
  Box,
  Heading,
  VStack,
  Button,
  Divider,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useCheckOutsQuery } from "../graphql/queries/CheckOuts";
import { useReturnBookMutation } from "../graphql/mutations/CheckOutBook";
import BookCover from "./BookCover";
import { useState } from "react";

interface Props {
  userId: number;
}

const MyCheckOuts: React.FC<Props> = ({ userId }) => {
  const [returningId, setReturningId] = useState<number | null>(null);

  const toast = useToast();
  const { data, loading } = useCheckOutsQuery({
    variables: { first: 10, filter: { returned: false, userId } },
  });
  const [returnBook, { loading: returning }] = useReturnBookMutation();

  if (loading) {
    return <Spinner ml="50%" pt={5} />;
  }

  if ((data?.checkOuts.edges.length as number) === 0) {
    return (
      <Text pt={5} textAlign="center" fontSize="lg" fontWeight="bold">
        nothing here 🥺
      </Text>
    );
  }

  return (
    <List>
      {data?.checkOuts.edges.map((co, i) => (
        <Fragment key={co.node.id}>
          <ListItem>
            <Flex justify="space-between" align="center">
              <HStack>
                <BookCover url={co.node.copy.book?.cover} w={20} mr={4} />

                <Box pb={1}>
                  <Heading color="gray.200" as="h3" size="lg">
                    {co.node.copy.book?.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.400">
                    {co.node.copy.book?.author},{" "}
                    {new Date(co.node.copy.book!.publishedDate).getFullYear()}
                  </Text>
                </Box>
              </HStack>
              <VStack align="flex-end">
                <Button
                  onClick={async () => {
                    setReturningId(co.node.id);
                    await returnBook({
                      variables: { id: co.node.id },
                    });
                    toast({
                      title: "Successfully returned book!",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                  }}
                  isLoading={returning && returningId === co.node.id}
                  variant="ghost"
                  size="xs"
                  colorScheme="orange"
                >
                  return
                </Button>
                <Text color="gray.400" fontSize="xs" fontStyle="italic">
                  {new Date(co.node.dueAt).toDateString()}
                </Text>
              </VStack>
            </Flex>
          </ListItem>
          {i < data.checkOuts.edges.length - 1 && <Divider my={2.5} />}
        </Fragment>
      ))}
    </List>
  );
};
export default MyCheckOuts;
