import React, { Fragment } from "react";
import {
  List,
  ListItem,
  Flex,
  HStack,
  Box,
  Heading,
  Divider,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useReservesQuery } from "../graphql/queries/Reserves";
import BookCover from "./BookCover";

interface Props {
  userId: number;
}

const MyReserves: React.FC<Props> = ({ userId }) => {
  const { data, loading } = useReservesQuery({
    variables: { first: 10, filter: { userId, active: true } },
  });

  if (loading) {
    return <Spinner ml="50%" pt={5} />;
  }

  if ((data?.reserves.edges.length as number) === 0) {
    return (
      <Text pt={5} textAlign="center" fontSize="lg" fontWeight="bold">
        nothing here 🥺
      </Text>
    );
  }

  return (
    <List>
      {data?.reserves.edges.map((co, i) => (
        <Fragment key={co.node.id}>
          <ListItem>
            <Flex justify="space-between" align="center">
              <HStack>
                <BookCover url={co.node.book.cover} w={20} mr={4} />

                <Box pb={1}>
                  <Heading color="gray.200" as="h3" size="lg">
                    {co.node.book.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.400">
                    {co.node.book.author},{" "}
                    {new Date(co.node.book.publishedDate).getFullYear()}
                  </Text>
                </Box>
              </HStack>

              <HStack spacing={2}>
                <Text color="gray.400" fontSize="xs">
                  Position in Queue
                </Text>
                <Text fontWeight="bold">{co.node.position}</Text>
              </HStack>
            </Flex>
          </ListItem>
          {i < data.reserves.edges.length - 1 && <Divider my={2.5} />}
        </Fragment>
      ))}
    </List>
  );
};
export default MyReserves;
