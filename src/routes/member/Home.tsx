import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import BookList from "../../components/BookList";

const Home: React.FC = () => {
  return (
    <Box>
      <Heading mb={8}>Books</Heading>
      <BookList />
    </Box>
  );
};
export default Home;
