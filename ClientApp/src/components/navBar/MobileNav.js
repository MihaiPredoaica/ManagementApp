import React from 'react';
import { Stack, useColorModeValue } from '@chakra-ui/react';
import { MobileNavItem } from './MobileNavItem';
import { MobileLoginMenu } from '../api-authorization/MobileLoginMenu';

export const MobileNav = ({linkItems}) => {
    return (
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
      >
        {linkItems.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
        <MobileLoginMenu />
      </Stack>
    );
  };