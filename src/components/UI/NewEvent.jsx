import {
  Flex,
  Button,
  Input,
  Stack,
  Select,
  Card,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { EventsContext } from "../../Context";
import { useActionData } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

// Send request to add event
export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();
  const newId = await json.id;

  return {
    status: response.status,
    id: newId,
  };
};

export const NewEvent = () => {
  const [sentToast, setSentToast] = useState(false);
  const { users, categories } = useContext(EventsContext);
  const toast = useToast();

  // use data from POST request for status and newId
  const response = useActionData();
  const id = response?.id;
  const status = response?.status;

  if (response !== undefined && !sentToast) {
    switch (status) {
      case 201:
        toast({
          title: "Success!",
          description: "Your event was added successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setSentToast(true);
        break;
      default:
        toast({
          title: "Woah",
          description: `Something happened! Not sure what "${status}" means though...`,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        setSentToast(true);
    }
  }

  return (
    <Flex maxH="100vh" width="100vw" align="center" justify="center" overflowY="auto">
    <Card width="90%" maxW="400px" gap={2} padding={2} fontSize="sm" pt={20}>
      <CardHeader>
        <Heading align="center" justify="center" size="sm">Create a new event...</Heading>
      </CardHeader>

      {/* Add button after adding an event successfully, to direct to the event page */}
      {status === 201 && (
        <Flex justify="center">
          <Link to={`/event/${id}`}>
            <Button size="sm" color="gray" bgColor={"gray.400"}>
              Go to your Event!
            </Button>
          </Link>
        </Flex>
      )}

      <Text align="center">Fill in the information about your event:</Text>
      <Form method="post" id="new-event-form">
        <Stack spacing={2}>
          <Input
            placeholder="Event title"
            type="text"
            name="title"
            required="required"
            size="sm"
          />
          <Input
            placeholder="Description"
            type="text"
            name="description"
            required="required"
            size="sm"
          />
          <Input
            placeholder="Image URL"
            type="url"
            name="image"
            required="required"
            size="sm"
          />
          <Input
            type="datetime-local"
            variant="outline"
            placeholder="Start time"
            name="startTime"
            required="required"
            size="sm"
          />
          <Input
            type="datetime-local"
            variant="outline"
            placeholder="End time"
            name="endTime"
            required="required"
            size="sm"
          />
          <Input
            placeholder="Location"
            type="text"
            name="location"
            required="required"
            size="sm"
          />

          <Select
            placeholder="Category"
            name="categoryIds"
            required="required"
            size="sm"
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id} type="number">
                {category.name}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Select user"
            name="createdBy"
            required="required"
            size="sm"
          >
            {users.map((user) => (
              <option value={user.id} key={user.id} type="number">
                {user.name}
              </option>
            ))}
          </Select>
          {/* Hide submit button after adding an event successfully to prevent multiple adds */}
          {status !== 201 && (
            <Button type="submit" variant="ghost" bgColor={"gray.500"} textColor={"black"}>
              Submit
            </Button>
          )}
        </Stack>
      </Form>
    </Card>
  </Flex>
);
};
