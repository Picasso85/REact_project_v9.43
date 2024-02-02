import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const DeleteEvent = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const deleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });
      return response.status;
    } catch (error) {
      console.error("Error deleting event:", error);
      return null;
    }
  };

  const handleDelete = async () => {
    const status = await deleteEvent();

    const showToast = (title, description, statusType) => {
      toast({
        title,
        description,
        status: statusType,
        duration: 3000,
        isClosable: true,
      });
    };

    switch (status) {
      case 200:
        showToast("Success!", "Your event was deleted successfully", "success");
        break;
      case 404:
        showToast(
          "Oh no",
          `The event you tried to delete cannot be found (${status})`,
          "error"
        );
        break;
      default:
        showToast(
          "Oh no",
          `Something happened! Not sure what "${status}" means though...`,
          "warning"
        );
    }
  };

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this event?</ModalBody>

          <ModalFooter gap={4}>
            <Link to="/">
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </Link>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
