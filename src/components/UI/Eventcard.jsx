import { Card, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { CategoryCard } from "./CategoryCard";

export const EventCard = ({ event }) => {
  const date = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end = event.endTime.split("T")[1].slice(0, 5);

  return (
    <Card 
    variant="filled" 
    paddingBottom={4} 
    align="center"
    _hover={{
      opacity: 0.9,
      transform: "scale(.95)",
      filter: "auto",
      blur: "0.4px",
    }}
    >
      <Image
        src={event.image}
        alt={event.title}
        boxSize="xs"
        borderTopRadius={6}
      />
      <Heading padding={4}>{event.title}</Heading>
      <Flex maxWidth="xs" wrap="wrap">
        <Text align="center">{event.description}</Text>
      </Flex>

      <br />
      <p>📅 {date}</p>
      <p>
        🕑 {start} - {end}
      </p> 
      <br /> 🎯 click me
      <CategoryCard event={event} />
    </Card>
  );
};
