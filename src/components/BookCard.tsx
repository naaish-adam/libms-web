import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

interface BookCardProps {
  name: string;
  author: string;
  cover?: string;
  publishedDate: Date;
}

const BookCard: React.FC<BookCardProps> = ({
  name,
  author,
  cover,
  publishedDate,
}) => {
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
          src={cover || "https://i.mydramalist.com/wlAmnf.jpg"}
          alt="avatar"
        />

        <Box p={5}>
          <Link
            display="block"
            fontSize="2xl"
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
          >
            {name}
          </Link>
          <Flex mt={2} justify="space-between">
            <chakra.span
              fontSize="sm"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              {author}
            </chakra.span>

            <chakra.span
              fontSize="sm"
              fontStyle="italic"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              {publishedDate.getFullYear()}
            </chakra.span>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default BookCard;
