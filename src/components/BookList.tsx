import { Button, Input, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { BookListQuery, useBookListQuery } from "../graphql/queries/BookList";
import BookCard from "./BookCard";

interface BookListProps {}

const BookList: React.FC<BookListProps> = ({}) => {
  const pageLimit = 2;
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const { data, loading, fetchMore, refetch } = useBookListQuery({
    variables: { first: pageLimit },
  });

  const updateQuery = (
    previousQueryResult: BookListQuery,
    options: {
      fetchMoreResult?: BookListQuery;
    }
  ) => {
    if (options.fetchMoreResult) {
      return options.fetchMoreResult;
    }
    return previousQueryResult;
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Input
        mb={8}
        placeholder="Search books by title, author or ISBN"
        onChange={({ target }) => setFilter(target.value)}
        onKeyDown={({ key }) =>
          key === "Enter"
            ? refetch({ first: pageLimit, filter: { searchTerm: filter } })
            : undefined
        }
      />
      <Wrap spacing="6">
        {data?.books.edges.map((book) => (
          <WrapItem key={book.node.id}>
            <BookCard
              name={book.node.name}
              author={book.node.author}
              cover={book.node.cover}
              publishedDate={new Date(book.node.publishedDate)}
            />
          </WrapItem>
        ))}
      </Wrap>
      <Button
        disabled={!data?.books.pageInfo.hasPreviousPage}
        onClick={() =>
          fetchMore({
            variables: {
              first: undefined,
              last: pageLimit,
              before: data?.books.pageInfo.startCursor,
            },
            updateQuery,
          })
        }
      >
        Back
      </Button>
      <Button
        disabled={!data?.books.pageInfo.hasNextPage}
        onClick={() =>
          fetchMore({
            variables: {
              first: pageLimit,
              after: data?.books.pageInfo.endCursor,
            },
            updateQuery,
          })
        }
      >
        Next
      </Button>
    </>
  );
};
export default BookList;
