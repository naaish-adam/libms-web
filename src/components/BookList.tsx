import { Button, Input, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { BookListQuery, useBookListQuery } from "../graphql/queries/BookList";
import BookCard from "./BookCard";

interface BookListProps {}

const BookList: React.FC<BookListProps> = ({}) => {
  const pageLimit = 10;
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

  const hasPrevPage = data?.books.pageInfo.hasPreviousPage;
  const hasNextPage = data?.books.pageInfo.hasNextPage;

  const startCursor = data?.books.pageInfo.startCursor;
  const endCursor = data?.books.pageInfo.endCursor;

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
              book={{
                id: book.node.id,
                name: book.node.name,
                author: book.node.author,
                publishedDate: new Date(book.node.publishedDate),
                cover: book.node.cover,
                copies: book.node.copies,
              }}
            />
          </WrapItem>
        ))}
      </Wrap>
      {(hasPrevPage || hasNextPage) && (
        <>
          <Button
            disabled={!hasPrevPage}
            onClick={() =>
              fetchMore({
                variables: {
                  first: undefined,
                  last: pageLimit,
                  before: startCursor,
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
                  after: endCursor,
                },
                updateQuery,
              })
            }
          >
            Next
          </Button>
        </>
      )}
    </>
  );
};
export default BookList;
