import {
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  SimpleGrid,
  Button,
  Image,
} from "@chakra-ui/react";
import React from "react";

export const ProjectImagePicker = ({ image, setImage }) => {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button
          padding={5}
          borderWidth="1px"
          borderRadius="xl"
          borderColor="black"
          h="80px"
          w="80px"
        >
          <Image w={10} h={10} src={`Icons/icon_${image}.png`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Pick a project icon</PopoverHeader>
        <PopoverBody>
          <SimpleGrid columns={4} spacingX="10px" spacingY="10px">
            {Array.from({ length: 11 }, (x, i) => {
              return (
                <Button
                  key={i}
                  onClick={() => setImage(i)}
                  borderWidth="1px"
                  borderRadius="xl"
                  h="70px"
                  w="70px"
                >
                  <Image w={10} h={10} src={`Icons/icon_${i}.png`} />
                </Button>
              );
            })}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
