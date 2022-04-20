import React from 'react';
import { Stack, Box, Link, Flex, Popover, PopoverTrigger, PopoverContent, Icon, useColorModeValue } from '@chakra-ui/react';
import { DesktopSubNav } from './DesktopSubNav';

export const DesktopNav = ({linkItems}) => {
    const popoverContentBgColor = useColorModeValue("white", "gray.800");
  
    return (
      <Stack direction={"row"} spacing={4}>
        {linkItems.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  href={navItem.href ?? "#"}
                  style={{ textDecoration: "none" }}
                  _focus={{ boxShadow: "none" }}
                >
                  <Flex
                    align="center"
                    p="2"
                    mx="2"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                      bg: "cyan.400",
                      color: "white",
                    }}
                  >
                    {navItem.icon && (
                      <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                          color: "white",
                        }}
                        as={navItem.icon}
                      />
                    )}
                    {navItem.label}
                  </Flex>
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  