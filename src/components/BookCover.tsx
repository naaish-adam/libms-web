import React from "react";
import { ChakraProps, Image } from "@chakra-ui/react";

interface BookCoverProps extends ChakraProps {
  url?: string;
}

const BookCover: React.FC<BookCoverProps> = ({ url, ...props }) => {
  return (
    <Image
      src={url || "https://i.mydramalist.com/wlAmnf.jpg"}
      alt="book cover image"
      {...props}
    />
  );
};
export default BookCover;
