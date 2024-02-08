// Import necessary dependencies
import React from "react";
import { useLoaderData } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { EventSearch } from "../components/UI/EventSearch";

// Loader function to fetch events data
export const loader = async () => {
  // Fetch events data from the API
  const events = await fetch("http://localhost:3000/events");

  // Return the events data as a loader result
  return {
    events: await events.json(),
  };
};

// Component to display the list of events
export const EventsPage = () => {
  // Retrieve events data using the loader
  const { events } = useLoaderData();

  return (
    // Main container flexbox
    <Flex style={{ overflowX: "hidden" }}>
      {/* Display the EventSearch component with the fetched events data */}
      <EventSearch events={events} />
    </Flex>
  );
};
