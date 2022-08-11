import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

export const UserProfileForm = (props) => {
  const { user, editMutation } = props;
  const inputFile = useRef(null);

  const handleClick = () => {
    inputFile.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files && event.target.files[0];

    if (!fileUploaded) {
      return;
    }

    setImage(URL.createObjectURL(fileUploaded));

    console.log(URL.createObjectURL(fileUploaded));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const [name, setName] = useState(user ? user.userName : "");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState(user ? user.email : "");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const stackColor = useColorModeValue("#e8e9ec", "#0b1437");
  const labelColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const borderColor = useColorModeValue("gray.700", "gray.400");

  const handleSaveClick = async () => {
    console.log(name, email);
    if (!name || !email) {
      setNameError(name === "");
      setEmailError(email === "");
    } else {
      editMutation.mutate(
        { name, id: user.id, email, image },
        {
          onSuccess: () => {
            // onClose();
          },
        }
      );
    }
  };

  return (
    <Box
      maxW={"full"}
      w={"500px"}
      mt={15}
      bg={stackColor}
      borderRadius="lg"
      p={8}
      color={labelColor}
      shadow="base"
    >
      <VStack spacing={5}>
        <Heading margin={"10px"} marginLeft={"30px"}>
          Accout Profile
        </Heading>

        <FormControl>
          <FormLabel textAlign={"center"}>Account Photo</FormLabel>
          <FormLabel textAlign={"center"}>
            {image?.length === 0 ? (
              <Avatar
                alignSelf={"center"}
                size={"2xl"}
                src="user.png"
                borderRadius="full"
                boxSize="150px"
                m={2}
              />
            ) : (
              <Avatar
                alignSelf={"center"}
                size={"2xl"}
                src={image}
                borderRadius="full"
                boxSize="150px"
                m={2}
              />
            )}
          </FormLabel>
        </FormControl>
        <Button onClick={handleClick} textAlign={"center"}>
          Browse
        </Button>
        <input
          type="file"
          id="file"
          onChange={handleChange}
          ref={inputFile}
          style={{ display: "none" }}
          accept="image/jpeg, image/png"
        />
        <FormControl isRequired isInvalid={nameError}>
          <FormLabel>Name</FormLabel>

          <InputGroup>
            <Input
              borderColor={borderColor}
              value={name}
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
            />
          </InputGroup>
          <FormErrorMessage>
            {nameError && "Valid user name required."}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={emailError}>
          <FormLabel>Email</FormLabel>

          <InputGroup>
            <Input
              type="email"
              name="email"
              value={email}
              borderColor={borderColor}
              onChange={(e) => {
                setEmail(e.target.value);
                const emailIsvalid = validateEmail(e.target.value);
                console.log(emailIsvalid, emailError);
                emailIsvalid == null
                  ? setEmailError(true)
                  : setEmailError(false);
              }}
            />
          </InputGroup>
          <FormErrorMessage>
            {emailError && "Valid user email required."}
          </FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="blue"
          bg="blue.400"
          color="white"
          onClick={async () => await handleSaveClick()}
          _hover={{
            bg: "blue.500",
          }}
          w={"100px"}
        >
          Save
        </Button>
      </VStack>
    </Box>
  );
};
