import { SimpleGrid, Box, Text, Image } from "@chakra-ui/react";

const SampleQuestions = ({ onClick }) => {
  const sampleQuestions = [
    "How do you create a responsive navbar using CSS and JavaScript?",
    "What is the difference between React and Angular?",
    "How does Chakra UI simplify development?",
    "Tell me a joke!",
  ];

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 2 }}
      spacing={{ base: 2, sm: 3, md: 4 }} // Dynamic spacing based on screen size
      mt={4}
      className="main cards"
    >
      {sampleQuestions.map((question, index) => (
        <Box
          key={index}
          className="card"
          bg="#f0f4f9"
          borderRadius="10px"
          p={4}
          cursor="pointer"
          position="relative"
          height={{ base: "3rem", sm: "4rem", md: "5rem" }} // Dynamic height
          _hover={{ bg: "#dfe4ea" }}
          onClick={() => onClick(question)}
        >
          <Text
            fontSize={{ base: "14px", sm: "16px", md: "17px" }} // Dynamic font size
            color="#585858"
            mb={2}
            isTruncated // Truncate text with "..." if it overflows
          >
            {question}
          </Text>
          <Image
            src="./search.png" // Sample icon
            alt="Question Icon"
            w={{ base: 4, sm: 5, md: 6 }} // Dynamic size
            h={{ base: 4, sm: 5, md: 6 }}
            position="absolute"
            bottom="10px"
            right="10px"
            borderRadius="20px"
            bg="white"
            p="5px"
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default SampleQuestions;
