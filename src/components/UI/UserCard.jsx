import React, { useContext, useEffect, useState } from "react";
import { EventsContext } from "../../Context";
import { Flex, Heading, Image } from "@chakra-ui/react";

export const UserCard = ({ userId }) => {
  const { users } = useContext(EventsContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]); // Adding userId 

  // check check.....
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="row" align="center" gap={4}>
      <Image
        src={userData.image}
        alt={userData.name}
        borderRadius={200}
        boxSize="100px"
        bgColor={"yellow.300"}
      />
      <div>
        <p>Event created by</p>
        <Heading 
          fontSize="2em"
          color="black"
        >{userData.name}</Heading>
      </div>
    </Flex>
  );
};