import { AddIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState, type ReactNode } from "react";
import { api } from "~/utils/api";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const AuthenticatedNavbar: React.FC<{ user: Session["user"] }> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTask, setNewTask] = useState("");
  const createTask = api.task.create.useMutation();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>Logo</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Popover>
            <PopoverTrigger>
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
              >
                Create
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Create Task</PopoverHeader>
              <PopoverBody>
                <InputGroup size="md">
                  <Input
                    value={newTask}
                    onChange={(event) => setNewTask(event.target.value)}
                    pr="5rem"
                    placeholder="Make dinner"
                  />
                  <InputRightElement width="5rem">
                    <Button
                      onClick={() => void createTask.mutate({ title: newTask })}
                      type="submit"
                      h="1.75rem"
                      size="sm"
                    >
                      Create
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar size={"sm"} src={user.image || ""} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => void signOut()}>Sign out</MenuItem>
              {/* <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default AuthenticatedNavbar;
