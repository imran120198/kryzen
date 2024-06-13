import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { LogOut } from "../Redux/Auth/auth.action";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    // Dispatch the logOut action when the "Log Out" button is clicked
    dispatch(LogOut());
  };

  return (
    <Flex
      justifyContent={"space-between"}
      spacing="70px"
      backgroundColor={"teal"}
    >
      <Box>
        <Text p={"20px"} fontSize="30px" fontWeight={"bold"}>
          Kryzen
        </Text>
      </Box>
      <Box>
        <HStack
          justifyContent="center"
          fontWeight={"bold"}
          spacing="50px"
          mt={"20px"}
          mr={"40px"}
        >
          <Text color={"black"} fontSize="20px">
            <NavLink>Product</NavLink>
          </Text>
          <Text color={"black"} fontSize="20px">
            {isAuth ? "" : <NavLink to="/">Signup</NavLink>}
          </Text>
          <Text color={"black"} fontSize="20px">
            {isAuth ? (
              <Button onClick={handleLogOut}>Log Out</Button>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </Text>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Navbar;
