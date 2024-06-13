import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ".././App.css";
import Navbar from "../Components/Navbar";
import { LogIn } from "../Redux/Auth/auth.action";

const init = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(init);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  console.log(auth);

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    console.log(formData);
    await dispatch(LogIn(formData));
    setIsLoading(false); // Set loading to false after dispatch
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  let name = localStorage.getItem("name");

  if (auth.isAuth) {
    navigate(`/${name}/product-page`);
  }

  return (
    <div>
      <Navbar />

      <Heading marginBottom="20px">Login</Heading>

      <form onSubmit={handleForm} style={{ width: "100%" }}>
        <Container
          maxW="40%"
          mb="10"
          borderRadius="20"
          centerContent
          boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
        >
          <FormControl py="10" maxW="80%">
            <FormLabel fontWeight="700" mt="10">
              Email
            </FormLabel>
            <Input
              name="email"
              type="text"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required={true}
              variant="flushed"
              pl="3"
            />
            <FormLabel fontWeight="700" mt="10">
              Password
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                name="password"
                type={show ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                variant="flushed"
                pl="3"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              colorScheme="red"
              py="5"
              mt="10"
              type="submit"
              isLoading={isLoading} // Set loading state to button
              loadingText="Logging in"
            >
              Login
            </Button>
          </FormControl>
        </Container>
      </form>
    </div>
  );
};

export default Login;
