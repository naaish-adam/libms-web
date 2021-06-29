import React, { useContext, useEffect, useState } from "react";
import {
  Route,
  Routes,
  Link as RouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Box,
  Spinner,
  Flex,
  Button,
  Heading,
  HStack,
  VStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import Login from "./components/Login";
import UserContext from "./contexts/UserContext";
import { UserRole } from "./interfaces";

import LibrarianHome from "./routes/librarian/Home";
import MemberHome from "./routes/member/Home";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import CheckOuts from "./routes/librarian/CheckOuts";
import MyBooks from "./routes/member/MyBooks";
import Reserves from "./routes/librarian/Reserves";

export const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user, loading, logout } = useContext(UserContext);
  const [site, setSite] = useState<"library" | "office" | null>(null);

  const navBg = useColorModeValue("", "");

  useEffect(() => {
    if (user) {
      const savedSite: any = localStorage.getItem("site");
      if (savedSite) {
        setSite(savedSite);
      } else {
        if (user.role === UserRole.LIBRARIAN) {
          setSite("office");
        } else {
          setSite("library");
        }
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

  const active = (route: string) =>
    route === pathname
      ? {
          color: "blue.400",
          fontWeight: "bold",
        }
      : {};

  return (
    <>
      {site === "office" ? (
        <>
          <Box bg={navBg} py={2} boxShadow="md">
            <Flex align="center" justify="space-between" w="70%" mx="auto">
              <Heading fontSize="3xl">LIBMS</Heading>
              <HStack>
                <Button
                  size="sm"
                  onClick={() => {
                    setSite("library");
                    localStorage.setItem("site", "library");
                    navigate("/", { replace: true });
                  }}
                >
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
            <HStack spacing={4} mb={8}>
              <Link {...active("/")} colorScheme="red" as={RouterLink} to="/">
                Home
              </Link>
              <Link {...active("/check-outs")} as={RouterLink} to="/check-outs">
                Check Outs
              </Link>
              <Link {...active("/reserves")} as={RouterLink} to="/reserves">
                Reserves
              </Link>
            </HStack>
            <Routes>
              <Route path="/" element={<LibrarianHome />} />
              <Route path="check-outs" element={<CheckOuts />} />
              <Route path="reserves" element={<Reserves />} />
            </Routes>
          </Box>
        </>
      ) : (
        <>
          <Box bg={navBg} py={2} boxShadow="md">
            <Flex align="center" justify="space-between" w="70%" mx="auto">
              <Heading
                cursor="pointer"
                onClick={() => navigate("/")}
                fontSize="3xl"
              >
                LIBMS
              </Heading>
              <HStack>
                {user.role === UserRole.LIBRARIAN && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSite("office");
                      localStorage.setItem("site", "office");
                      navigate("/", { replace: true });
                    }}
                  >
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
            <HStack spacing={4} mb={8}>
              <Link {...active("/")} as={RouterLink} to="/">
                Home
              </Link>
              <Link {...active("/my-books")} as={RouterLink} to="/my-books">
                My Books
              </Link>
            </HStack>
            <Routes>
              <Route path="/" element={<MemberHome />} />
              <Route path="/my-books" element={<MyBooks />} />
            </Routes>
          </Box>
        </>
      )}
    </>
  );
};
