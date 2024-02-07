import { useContext } from "react";
import { EventsContext } from "../../Context";
import { Flex, Heading, Image } from "@chakra-ui/react";

export const loader =  async ({ params }) => {
  const users = await fetch(`http://localhost:3000/users`);

  return {
    userName: await users.json(),
  };
};
export const UserCard = ({ userId }) => {
  const { users } = useContext(EventsContext);
  const user = users.find((user) => user.id === Number(userId));

  return (
    <Flex direction="row" align="center" gap={4}>
      <Image
        src={user?.image}
        alt={user?.name}
        borderRadius={200}
        boxSize="100px"
        bgColor={"blackAlpha.300"}
      />
      <div>
        <p>Event created by</p>
        <Heading 
          fontSize="2em"
          color="black"
        >{user?.name}</Heading>
      </div>
    </Flex>
  );
};
