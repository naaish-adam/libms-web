import React, { useState, useRef, useEffect } from "react";
import { Flex, Box, Heading, Input, HStack } from "@chakra-ui/react";
import AddBook from "../../components/AddBook";
import ReserveTable from "../../components/ReserveTable";
import {
  useReservesLazyQuery,
  //ReservesFilter,
} from "../../graphql/queries/Reserves";

const Reserves: React.FC = () => {
  const pageLimit = 10;
  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState({});

  const [reserves, { data, loading }] = useReservesLazyQuery();

  useEffect(() => {
    reserves({
      variables: {
        first: pageLimit,
        //filter,
      },
    });
  }, [reserves, filter]);

  const startCursor = data?.reserves.pageInfo.startCursor;
  const endCursor = data?.reserves.pageInfo.endCursor;

  const next = () => {
    reserves({
      variables: {
        first: pageLimit,
        after: endCursor,
        // filter,
      },
    });
  };

  const back = () => {
    reserves({
      variables: {
        last: pageLimit,
        before: startCursor,
        //filter,
      },
    });
  };

  return (
    <Box>
      <Flex mb={8} justify="space-between" align="center">
        <Heading>Reserves</Heading>
        <HStack spacing={4}>
          <div>
            <AddBook buttonProps={{ size: "sm" }} />
          </div>
          <Input
            ref={inputRef}
            size="sm"
            placeholder="Search by book or reserver"
            width={300}
            onKeyDown={({ key }) =>
              key === "Enter"
                ? true //setFilter({ ...filter, searchTerm: inputRef.current?.value })
                : undefined
            }
          />
        </HStack>
      </Flex>
      <ReserveTable data={data} loading={loading} next={next} back={back} />
    </Box>
  );
};
export default Reserves;
