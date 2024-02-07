import React from "react";
import { Heading, Image, Button, Flex, Text } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { UserCard } from "../components/UI/UserCard";
import { CategoryCard } from "../components/UI/CategoryCard";
import { DeleteEvent } from "../components/UI/DeleteEvent";
import { EditEvent } from "../components/UI/EditEvent";

// Loader function to fetch event data
export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return {
    event: await event.json(),
  };
};

// Component to display an individual event
export const EventPage = () => {
  // Fetch event data using the loader
  const { event } = useLoaderData();

  // Extract date, start time, and end time from the event
  const date = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end = event.endTime.split("T")[1].slice(0, 5);

  return (
    // Main container flexbox
    <Flex height="100vh" width="100vw" align="center" justify="center">
      {/* Event details container */}
      <Flex
        bg="white"
        align="center"
        justify="center"
        direction="column"
        minWidth="280px"
        maxW="20vw"
        paddingBottom={4}
        gap={4}
        borderRadius={10}
        zIndex={1}
        _hover={{
          transform: "scale(1.1)",
        }}
      >
        {/* Event image */}
        <Image
          src={event.image}
          alt={event.title}
          width="100%"
          height="100%"
          borderTopRadius={6}
        />

        {/* Event title and description */}
        <Heading
          align="center"
          justify="center"
        >{event.title}</Heading>
        <Text fontWeight="bold">{event.description}</Text>

        {/* Event details */}
        <Flex
          direction="column"
          align="center"
          gap={1}
          flexWrap="wrap"
          padding={4}
        >
          <Text>📅 {date}</Text>
          <Text>
            🕑 {start} - {end}
          </Text>
          <Text align="center">📍{event.location}</Text>
          {/* Display event category */}
          <CategoryCard event={event} />
        </Flex>

        {/* Event creator details */}
        <Flex 
        padding={2}
        zIndex={5}>
          <UserCard userId={event.createdBy} />
        </Flex>

        {/* Edit, delete, and home button */}
        <Flex gap={4} flexWrap="wrap" justifyContent="center">
          <EditEvent event={event} />
          <Flex gap={4}>
            <DeleteEvent event={event} />

            {/* Link to navigate back to the home page */}
            <Link to="/">
              <Button size="sm">Home</Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
