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
} from "@chakra-ui/react";
import { useCheckOutsQuery } from "../graphql/queries/CheckOuts";
import BookCover from "./BookCover";

interface Props {
  userId: number;
}

const MyCheckOuts: React.FC<Props> = ({ userId }) => {
  const { data, loading } = useCheckOutsQuery({
    variables: { first: 10, filter: { returned: false, userId } },
  });

  if (loading) {
    return <Spinner />;
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
                <Button variant="ghost" size="xs" colorScheme="orange">
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
