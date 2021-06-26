import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

const MyBooks: React.FC = () => {
  return (
    <Box>
      <Flex mb={8} justify="space-between" align="center">
        <Heading>My Books</Heading>
      </Flex>
    </Box>
  );
};
export default MyBooks;
