import React from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { ReservesQuery } from "../graphql/queries/Reserves";

interface ReserveTableProps {
  data: ReservesQuery | undefined;
  loading: boolean;
  next: () => void;
  back: () => void;
}

const ReserveTable: React.FC<ReserveTableProps> = ({
  data,
  loading,
  next,
  back,
}) => {
  if (loading) {
    return <Spinner />;
  }

  const hasPrevPage = data?.reserves.pageInfo.hasPreviousPage;
  const hasNextPage = data?.reserves.pageInfo.hasNextPage;

  const displayNextAndPrev = hasPrevPage || hasNextPage;

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Book</Th>
            <Th>Reserver</Th>
            <Th>Reserved On</Th>
            <Th>Position</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.reserves.edges.map((reserve) => (
            <Tr key={reserve.node.id}>
              <Td fontWeight="semibold">{reserve.node.book.name}</Td>
              <Td>{reserve.node.reserver.username}</Td>
              <Td>{new Date(reserve.node.createdAt!).toDateString()}</Td>
              <Td>{reserve.node.position}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex mt={2} justifyContent="flex-end" gridGap={2}>
        {displayNextAndPrev && (
          <>
            <Button disabled={!hasPrevPage} onClick={back}>
              Back
            </Button>
            <Button disabled={!hasNextPage} onClick={next}>
              Next
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};
export default ReserveTable;
