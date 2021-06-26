import React, { useState, useRef, useEffect } from "react";
import { Flex, Box, Heading, Input, HStack, Checkbox } from "@chakra-ui/react";
import AddBook from "../../components/AddBook";
import BookTable from "../../components/BookTable";
import {
  useBookListLazyQuery,
  BookListFilter,
} from "../../graphql/queries/BookList";

const Home: React.FC = () => {
  const pageLimit = 10;
  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<BookListFilter>({});

  const [bookList, { data, loading }] = useBookListLazyQuery();

  useEffect(() => {
    bookList({
      variables: {
        first: pageLimit,
        filter,
      },
    });
  }, [bookList, filter]);

  const startCursor = data?.books.pageInfo.startCursor;
  const endCursor = data?.books.pageInfo.endCursor;

  const next = () => {
    bookList({
      variables: {
        first: pageLimit,
        after: endCursor,
        filter,
      },
    });
  };

  const back = () => {
    bookList({
      variables: {
        last: pageLimit,
        before: startCursor,
        filter,
      },
    });
  };

  return (
    <Box>
      <Flex mb={8} justify="space-between" align="center">
        <Heading>Books</Heading>
        <HStack spacing={4}>
          <div>
            <AddBook buttonProps={{ size: "sm" }} />
          </div>
          <Input
            ref={inputRef}
            size="sm"
            placeholder="Search book by ISBN, title or author"
            width={300}
            onKeyDown={({ key }) =>
              key === "Enter"
                ? setFilter({ ...filter, searchTerm: inputRef.current?.value })
                : undefined
            }
          />
          <Checkbox
            onChange={({ target }) =>
              setFilter({ ...filter, onlyAvailable: target.checked })
            }
          >
            Only Available
          </Checkbox>
        </HStack>
      </Flex>
      <BookTable data={data} loading={loading} next={next} back={back} />
    </Box>
  );
};
export default Home;
