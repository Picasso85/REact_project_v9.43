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
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        opacity: 0.9,
        transform: "rotate(5deg)",
        filter: "auto",
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
        bg: 'gray.100' // Zmiana koloru tła przy najechaniu
      }}
    >
      <Image
        src={event.image}
        alt={event.title}
        boxSize="xs"
        borderTopRadius={6}
        transition="transform 0.3s ease"
        _hover={{ transform: 'scale(1.05)' }} // Zwiększenie obrazu przy najechaniu
      />
      <Heading padding={4}>{event.title}</Heading>
      <Flex maxWidth="xs" wrap="wrap">
        <Text align="center" transition="color 0.3s ease" _hover={{ color: 'blue.500' }}>{event.description}</Text> {/* Zmiana koloru tekstu przy najechaniu */}
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
