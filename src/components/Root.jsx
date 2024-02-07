import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Flex, Heading } from "@chakra-ui/react";
import { EventsContext } from "../Context";
import "@fontsource/pacifico";
import "@fontsource/open-sans";
import { Footer } from "./UI/Footer";


export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const Root = () => {
  const { users, categories } = useLoaderData();

  return (
    <Flex
      bgImage="../images/React.jpg"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      height="100%"
      bgPosition="center"
      zIndex={-1}
      
    >
      <Heading
        fontSize="4xl"
        color="gray"
        textAlign="left"
        padding={4}
        position="fixed"
        bottom="2rem"
        zIndex={100}
        width="450px"
      >
        The Events in your's city!
      </Heading>

      <Navigation />
      <EventsContext.Provider value={{ users, categories }}>
        <Outlet />
      </EventsContext.Provider>
      <Footer></Footer>
    </Flex>
  );
};
