import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Box,
  Spinner,
  Flex,
  Button,
  Heading,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import Login from "./components/Login";
import UserContext, { UserRole } from "./contexts/UserContext";

import LibrarianHome from "./routes/librarian/Home";
import MemberHome from "./routes/member/Home";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";

export const App = () => {
  const { user, loading, logout } = useContext(UserContext);
  const [site, setSite] = useState<"library" | "office" | null>(null);

  const navBg = useColorModeValue("", "");

  useEffect(() => {
    if (user) {
      if (user.role === UserRole.LIBRARIAN) {
        setSite("office");
      } else {
        setSite("library");
      }
    }
  }, [user]);

  if (loading) {
    return (
      <Flex h="100vh" w="100vw" justify="center" align="center">
        <Spinner justifySelf="flex-end" />
      </Flex>
    );
  }

  if (!user) {
    return (
      <Flex h="100vh" justify="center" align="center">
        <VStack>
          <Heading>Login</Heading>
          <Box boxShadow="2xl" p={10}>
            <Login />
          </Box>
        </VStack>
      </Flex>
    );
  }

  if (!site) {
    return (
      <Flex h="100vh" w="100vw" justify="center" align="center">
        <Spinner justifySelf="flex-end" />
      </Flex>
    );
  }

  return (
    <BrowserRouter>
      {site === "office" ? (
        <>
          <Box bg={navBg} py={2} boxShadow="md">
            <Flex align="center" justify="space-between" w="70%" mx="auto">
              <Heading fontSize="3xl">LIBMS</Heading>
              <HStack>
                <Button size="sm" onClick={() => setSite("library")}>
                  Switch to library
                </Button>
                <ColorModeSwitcher />
                <Button
                  onClick={() => logout()}
                  colorScheme="red"
                  variant="link"
                >
                  logout
                </Button>
              </HStack>
            </Flex>
          </Box>
          <Box w="70%" mx="auto" py="40px">
            <Routes>
              <Route path="/" element={<LibrarianHome />} />
            </Routes>
          </Box>
        </>
      ) : (
        <>
          <Box bg={navBg} py={2} boxShadow="md">
            <Flex align="center" justify="space-between" w="70%" mx="auto">
              <Heading fontSize="3xl">LIBMS</Heading>
              <HStack>
                {user.role === UserRole.LIBRARIAN && (
                  <Button size="sm" onClick={() => setSite("office")}>
                    Switch to office
                  </Button>
                )}
                <ColorModeSwitcher />
                <Button
                  onClick={() => logout()}
                  colorScheme="red"
                  variant="link"
                >
                  logout
                </Button>
              </HStack>
            </Flex>
          </Box>
          <Box w="70%" mx="auto" py="40px">
            <Routes>
              <Route path="/" element={<MemberHome />} />
            </Routes>
          </Box>
        </>
      )}
    </BrowserRouter>
  );
};
