import React from "react";
import { Divider, HStack, Text } from "@chakra-ui/react";

interface DividerWithLabelProps {
  label: string;
}

const DividerWithLabel: React.FC<DividerWithLabelProps> = ({ label }) => {
  return (
    <HStack my={4} spacing={4}>
      <Text fontSize="md" fontWeight="semibold">
        {label}
      </Text>
      <Divider flex={1} />
    </HStack>
  );
};

export default DividerWithLabel;
