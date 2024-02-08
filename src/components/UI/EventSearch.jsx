import React, { useState, useRef } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Text,
  Box,
} from "@chakra-ui/react";
import { EventCard } from "./Eventcard";
import { Link } from "react-router-dom";
import { FaArrowCircleUp } from "react-icons/fa";

export const EventSearch = ({ events }) => {
  // Searchfield
  const [searchField, setSearchField] = useState("");
  const handleChange = (event) => setSearchField(event.target.value);
  const handleRefresh = () => window.location.reload(false);

  // Filter on category
  const [value, setValue] = useState("all");

  const filterEvents = (categoryNumber) => {
    return events.filter((event) => {
      const categories = JSON.stringify(event.categoryIds);
      return categories.includes(
        Number(categoryNumber) || String(categoryNumber)
      );
    });
  };

  const eventsMassaged = (() => {
    switch (value) {
      case "1":
        return filterEvents(1);
      case "2":
        return filterEvents(2);
      case "3":
        return filterEvents(3);
      default:
        return events;
    }
  })();

  // Filter by searchfield
  const matchedEvents = eventsMassaged.filter((event) => {
    const eventTitleJson = JSON.stringify(event.title);
    return eventTitleJson.toLowerCase().includes(searchField.toLowerCase());
  });

  // Ref for scroll to top button
  const scrollToTopRef = useRef(null);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Flex
      direction="column"
      bg="gray.700" // Darker background color
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      width="100vw"
      textColor={"white"}
    >
      {/* Search bar */}
      <Box
        position="fixed"
        top="2.5rem"
        left="0"
        right="0"
        bg="gray.800" // Darker background color
        paddingY={1} // Decreased vertical padding
        paddingX={2} // Horizontal padding
        zIndex={99}
        display="flex"
        justifyContent="space-between" // Align radio buttons to the right
        width="100%" // Full width
        marginBottom={4} // Added margin bottom
      >
        <InputGroup size="sm"> {/* Decreased input size */}
          <InputLeftElement fontSize="sm">🔍</InputLeftElement> {/* Decreased font size */}
          <Input
            type="text"
            variant="filled"
            placeholder="Search by name"
            focusBorderColor="white"
            backgroundColor="gray.200"
            onChange={handleChange}
          />
        </InputGroup>
        <RadioGroup value={value} onChange={setValue} colorScheme="blue">
          <Flex gap={2} wrap="no-wrap" alignItems="center" marginLeft={10}>
            <Radio size="sm" value="all">All</Radio> {/* Decreased radio button size */}
            <Radio size="sm" value="1">Sports</Radio>
            <Radio size="sm" value="2">Games</Radio>
            <Radio size="sm" value="3">Relaxation</Radio>
          </Flex>
        </RadioGroup>
      </Box>

      {/* Main content */}
      <Box marginTop={10}> {/* Added top margin */}
        <Box
          overflowY="auto" // Enable vertical scrolling
          width="100%"
          paddingY={4} // Add vertical padding
        >
          <Flex
            gap={8}
            padding={4}
            wrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            {matchedEvents.length === 0 && (
              <Box>
                <Flex
                  direction="column"
                  gap={4}
                  borderRadius={10}
                  justifyContent="center"
                  alignItems="center"
                  bg="gray.500"
                  padding={6}
                  width="300px"
                >
                  <Heading paddingBottom={4}>Auuch! </Heading>
                  <Text>No events of this kind were found...</Text>
                  <Button color="gray.400" onClick={handleRefresh}>Try again</Button>
                </Flex>
              </Box>
            )}
            {matchedEvents.map((event) => (
              <Link to={`/event/${event.id}`} key={event.id}>
                <EventCard event={event} />
              </Link>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* Scroll to top button */}
      <Box ref={scrollToTopRef} />
      <Button
        onClick={scrollToTop}
        position="fixed"
        bottom="40px"
        right="20px"
        zIndex="999"
        bgColor={"darkorange"}
        _hover={{
          bgColor: "gray.800",
          color: "darkorange",
        }}
      >
        <FaArrowCircleUp />
      </Button>
    </Flex>
  );
};
