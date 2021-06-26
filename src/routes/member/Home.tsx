import { Flex, Box, Heading } from "@chakra-ui/react";
import React from "react";
import AddBook from "../../components/AddBook";
import BookList from "../../components/BookList";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <Box>
      <Heading mb={8}>Books</Heading>

      <BookList />
    </Box>
  );
};
export default Home;
