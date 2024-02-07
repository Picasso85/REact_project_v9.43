import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex
      as="nav"
      flexDirection="row"
      gap={4}
      position="fixed"
      top={0}
      width="100%"
      padding={2}
      backgroundColor="gray.800" 
      zIndex={999} 
    >
      <Link to="/">
        <Button size="xs" colorScheme="whiteAlpha">Home</Button>
      </Link>
      <Link to="/new">
        <Button size="xs" colorScheme="whiteAlpha">Add a new event</Button>
      </Link>
    </Flex>
  );
};
