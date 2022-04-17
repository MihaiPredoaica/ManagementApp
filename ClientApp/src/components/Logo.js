import React from "react";
import { Box, Image, Link, Text } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link href="/" fontSize="lg" fontWeight="bold">
        <Image src="Logo.ico" />
      </Link>
    </Box>
  );
}
