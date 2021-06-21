import { Flex, Box, Heading } from "@chakra-ui/react";
import React from "react";
import AddBook from "../../components/AddBook";
import BookList from "../../components/BookList";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <Box>
      <Flex mb={8} justify="space-between" align="center">
        <Heading>Member's Books</Heading>
        <AddBook />
      </Flex>
      <BookList />
    </Box>
  );
};
export default Home;
