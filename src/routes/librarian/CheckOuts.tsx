import React from "react";
import { Box, Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import CheckOutTable from "../../components/CheckOutTable";
import { useState } from "react";

const CheckOuts: React.FC = () => {
  const [tab, setTab] = useState<"borrowed" | "returned">("borrowed");

  return (
    <Box>
      <Flex mb={8} justify="space-between" align="center">
        <Heading>Check Outs</Heading>
        <ButtonGroup>
          <Button
            size="sm"
            colorScheme={tab === "borrowed" ? "blue" : undefined}
            onClick={() => setTab("borrowed")}
          >
            Borrowed
          </Button>
          <Button
            size="sm"
            colorScheme={tab === "returned" ? "blue" : undefined}
            onClick={() => setTab("returned")}
          >
            Returned
          </Button>
        </ButtonGroup>
      </Flex>

      {tab === "borrowed" ? (
        <CheckOutTable returned={false} />
      ) : (
        <CheckOutTable returned={true} />
      )}
    </Box>
  );
};
export default CheckOuts;
