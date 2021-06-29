import { Box, Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import MyCheckOuts from "../../components/MyCheckOuts";
import MyReserves from "../../components/MyReserves";
import UserContext from "../../contexts/UserContext";

const MyBooks: React.FC = () => {
  const { user } = useContext(UserContext);

  const [tab, setTab] = useState<"check-outs" | "reserves">("check-outs");

  return (
    <Box>
      <Flex mb={8} justify="space-between" align="center">
        <Heading>Check Outs</Heading>
        <ButtonGroup>
          <Button
            size="sm"
            colorScheme={tab === "check-outs" ? "blue" : undefined}
            onClick={() => setTab("check-outs")}
          >
            Check Outs
          </Button>
          <Button
            size="sm"
            colorScheme={tab === "reserves" ? "blue" : undefined}
            onClick={() => setTab("reserves")}
          >
            Reserves
          </Button>
        </ButtonGroup>
      </Flex>
      {tab === "check-outs" ? (
        <MyCheckOuts userId={user!.id} />
      ) : (
        <MyReserves userId={user!.id} />
      )}
    </Box>
  );
};
export default MyBooks;
