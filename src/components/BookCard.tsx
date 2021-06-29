import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { Book, CopyStatus } from "../interfaces";
import CheckOutBook from "./CheckOutBook";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  // are there any copies ?  is any copy available ? checkout : reserve : none
  const anyCopies = book.copies && book.copies.length > 0;
  const noOfCopies =
    book.copies?.filter((copy) => copy.status === CopyStatus.AVAILABLE)
      .length || 0;

  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="xs"
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          src={book.cover || "https://i.mydramalist.com/wlAmnf.jpg"}
          alt="avatar"
        />

        <Box p={5}>
          <Link
            display="block"
            fontSize="2xl"
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
          >
            {book.name}
          </Link>
          <Flex mt={2} justify="space-between">
            <chakra.span
              fontSize="sm"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              {book.author}
            </chakra.span>

            <chakra.span
              fontSize="sm"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              {book.publishedDate.getFullYear()}
            </chakra.span>
          </Flex>
        </Box>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
          bg="gray.900"
          roundedBottom="lg"
        >
          <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
            {noOfCopies} available
          </chakra.h1>
          {anyCopies &&
            (noOfCopies === 0 ? (
              <chakra.button
                px={2}
                py={1}
                bg="blue.500"
                fontSize="xs"
                fontWeight="bold"
                rounded="lg"
                textTransform="uppercase"
                _hover={{
                  bg: "blue.600",
                }}
              >
                Reserve
              </chakra.button>
            ) : (
              <CheckOutBook bookId={book.id} />
            ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default BookCard;
