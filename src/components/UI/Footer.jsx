import React from "react";
import { Flex, Text } from "@chakra-ui/react";

export const Footer = ({ screenSize }) => {
  return (
    <Flex
      bg={"#171c24"}
      width={"100%"}
      height={"2rem"}
      p={2}
      position={"fixed"}
      bottom={"0"}
      justify={"center"}
      align={{ base: "center", md: "center" }}
    >
      <Text color={"WhiteSmoke"} fontSize={(screenSize && screenSize.width <= 700) ? "xx-small" : "md"}>
        © 2028 All rights reserved{" "}
      </Text>
    </Flex>
  );
};