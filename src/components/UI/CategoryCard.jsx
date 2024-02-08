import { useContext } from "react";
import { EventsContext } from "../../Context";
import { Flex, Tag } from "@chakra-ui/react";

export const CategoryCard = ({ event }) => {
  const { categories } = useContext(EventsContext);

  const eventCategoryIds = Array.isArray(event.categoryIds)
    ? event.categoryIds
    : [Number(event.categoryIds)];

  const categoryList = categories
    .filter((category) => eventCategoryIds.includes(category.id))
    .map((category) => category.name);

  return (
    <Flex gap={4}>
      {categoryList.map((category) => (
        <Tag
          key={category}
          size="sm"
          variant="outline"
          color="black"
          align="center"
          textAlign="center"
        >
          {category}
        </Tag>
      ))}
    </Flex>
  );
};
