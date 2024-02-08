import { Form } from "react-router-dom";
import { Button, Stack, Input, Select, Heading, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { EventsContext } from "../../Context";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

export const action = async ({ request, params }) => {
  const formData = Object.fromEntries(request.entries());
  const response = await fetch(
    `http://localhost:3000/events/${params.eventId}`,
    {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.status;
};

export const EditEvent = ({ event }) => {
  const [succesfulUpdate, setSuccesfulUpdate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, categories } = useContext(EventsContext);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const eventId = event.target.getAttribute("data-event-id");

    try {
      const response = await action({ request: formData, params: { eventId } });
      if (response === 200) {
        setSuccesfulUpdate(true);
        toast({
          title: "Success!",
          description: "Your event has been updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // auto-refresh
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast({
          title: "Error",
          description: `An error occurred while updating the event (Status: ${response})`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const massageDates = (date) => {
    const dateJson = JSON.stringify(date);
    if (dateJson.includes("00.000Z")) {
      return String(date.slice(0, -8));
    } else {
      return date;
    }
  };

  const refreshpage = () => {
    window.location.reload(false);
  };

  return (
    <>
      {succesfulUpdate ? (
        <Button
          size="sm"
          onClick={refreshpage}
        >
          Refresh to make another edit
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={onOpen}
        >
          Edit
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading align="center">Edit Event</Heading>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text align="center">
              Change the information you want below.
              <br />
              <b>
                Select a category and ,a user name etc...
              </b>
            </Text>

            <Form method="patch" id="edit-event-form" onSubmit={handleSubmit} data-event-id={event.id}>
              <Stack spacing={3}>
                <Input
                  placeholder="Event title"
                  type="text"
                  name="title"
                  required
                  defaultValue={event.title}
                />
                <Input
                  placeholder="Description"
                  type="text"
                  name="description"
                  required
                  defaultValue={event.description}
                />
                <Input
                  placeholder="Image url"
                  type="url"
                  name="image"
                  required
                  defaultValue={event.image}
                />
                <Input
                  type="datetime-local"
                  variant="outline"
                  placeholder="Start time"
                  name="startTime"
                  required
                  defaultValue={massageDates(event.startTime)}
                />
                <Input
                  type="datetime-local"
                  variant="outline"
                  placeholder="End time"
                  name="endTime"
                  required
                  defaultValue={massageDates(event.endTime)}
                />
                <Input
                  placeholder="Location"
                  type="text"
                  name="location"
                  required
                  defaultValue={event.location}
                />

                <Select placeholder="Category" name="categoryIds" required>
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>

                <Select placeholder="Select user" name="createdBy" required>
                  {users.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>

                <Button
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={20} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
