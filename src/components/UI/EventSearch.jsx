import { useState } from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { EventCard } from "./Eventcard";
import { Link } from "react-router-dom";

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

  return (
    <Grid minH="100vh" w="98vw" templateColumns="repeat(8, 1fr)">
      <GridItem colSpan={2}>
        <Flex
          direction="column"
          padding={2}
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="80px"
          color="black"
        >
          <RadioGroup onChange={setValue} value={value} colorScheme="blue">
            <Flex direction="row" gap={4} wrap="wrap" justifyContent="center">
              <Radio value="all">All</Radio>
              <Radio value="1">Sports</Radio>
              <Radio value="2">Games</Radio>
              <Radio value="3">Relaxation</Radio>
            </Flex>
          </RadioGroup>

          <Flex width="100%" justifyContent="center" alignItems="center">
            <InputGroup>
              <InputLeftElement>🔍</InputLeftElement>
              <Input
                type="text"
                variant="filled"
                placeholder="Search by name"
                focusBorderColor="white"
                backgroundColor="gray.200"
                width="100%"
                onChange={handleChange}
              />
            </InputGroup>
          </Flex>
        </Flex>
      </GridItem>

      <GridItem colStart={5} colEnd={9}>
        <Flex
          gap={8}
          padding={4}
          wrap="wrap"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          {matchedEvents.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <EventCard event={event} />
            </Link>
          ))}
        </Flex>
      </GridItem>

      {matchedEvents.length < 1 && (
        <GridItem colStart={5}>
          <Flex
            direction="column"
            gap={4}
            borderRadius={10}
            justifyContent="center"
            alignItems="center"
            bg="white"
            padding={6}
            width="300px"
          >
            <Heading paddingBottom={4}>Auuch! </Heading>
            <Text>No events of this kind were found...</Text>
            <Button onClick={handleRefresh}>Try again</Button>
            <Text fontSize="3xl">Try again....</Text>
          </Flex>
        </GridItem>
      )}
    </Grid>
  );
};
