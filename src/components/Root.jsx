import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Flex } from "@chakra-ui/react";
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
      bgColor={"gray.700"}
      zIndex={-1}
      
    >
      <Navigation />
      <EventsContext.Provider value={{ users, categories }}>
        <Outlet />
      </EventsContext.Provider>
      <Footer></Footer>
    </Flex>
  );
};
