import React from "react";
import { Heading, Image, Button, Flex, Text } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { UserCard } from "../components/UI/UserCard";
import { CategoryCard } from "../components/UI/CategoryCard";
import { DeleteEvent } from "../components/UI/DeleteEvent";
import { EditEvent } from "../components/UI/EditEvent";
import { motion } from "framer-motion";

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
    <motion.div
    style={{ overflowX: "hidden" }}
    initial={{ x: "-100vw" }} 
    animate={{ x: 0 }} 
    transition={{ duration: 1, type: "spring", stiffness: 120 }} 
>
    // Main container flexbox
    <Flex height="100vh" width="100vw" align="center" justify="center"
    mb={8} mt={4}>
      {/* Event details container */}
      <Flex
        bg="white"
        align="center"
        justify="center"
        direction="column"
        maxWidth="90vw" // Changed max width
        paddingY={8} // Added padding top and bottom
        borderRadius={10}
        //zIndex={1}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 4)" // Added shadow for better visual separation
      >
        {/* Event image */}
        <Image
          src={event.image}
          alt={event.title}
          borderRadius="6rem 0 6rem 0" // Added border radius for top corners
          maxWidth="100%" // Adjusted to maintain aspect ratio
          height={"20vh"}
        />

        {/* Event title and description */}
        <Heading>{event.title}</Heading>
        <Text fontWeight="bold">{event.description}</Text>

        {/* Event details */}
        <Flex
          direction="column"
          align="center"
          gap={1}
          flexWrap="wrap"
          padding={4}
        >
          <Text style={{ fontSize: "10px" }}>📅 {date}</Text>
          <Text style={{ fontSize: "10px" }}>
            🕑 {start} - {end}
          </Text>
          <Text style={{ fontSize: "10px" }}>📍 {event.location}</Text>
          {/* Display event category */}
          <CategoryCard event={event} />
        </Flex>

        {/* Event creator details */}
        <Flex padding={2}>
          <UserCard userId={event.createdBy} />
        </Flex>

        {/* Edit, delete, and home button */}
        <Flex gap={4} justifyContent="center">
          <EditEvent event={event} />
          <DeleteEvent event={event} />
          {/* Link to navigate back to the home page */}
          <Link to="/">
            <Button size="sm">Home</Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
    </motion.div>
  );
};
