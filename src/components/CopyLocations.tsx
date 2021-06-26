import React, { ReactNode } from "react";
import {
  Box,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { Copy } from "../interfaces";

interface CopyLocationsProps {
  trigger: ReactNode;
  copies: Copy[];
}

const CopyLocations: React.FC<CopyLocationsProps> = ({ trigger, copies }) => {
  const initialFocusRef = React.useRef();
  const colors = {
    AVAILABLE: "green.200",
    RESERVED: "blue.200",
    CHECKED_OUT: "orange.200",
  };

  return (
    <Popover
      initialFocusRef={initialFocusRef as any}
      placement="top"
      closeOnBlur={false}
      trigger="hover"
      openDelay={500}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody p={5}>
          <Table size="sm" variant="simple">
            <Tbody>
              {copies.map((copy) => (
                <Tr fontWeight="bold" key={copy.id}>
                  <Td>{copy.rackNo}</Td>
                  <Td color={colors[copy.status]}>{copy.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CopyLocations;
