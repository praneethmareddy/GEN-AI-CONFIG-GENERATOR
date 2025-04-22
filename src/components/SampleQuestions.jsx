import { SimpleGrid, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi"; // Feather Search Icon

const MotionBox = motion(Box);
const MotionIcon = motion(FiSearch);

const SampleQuestions = ({ onClick }) => {
  const sampleQuestions = [
    "Give me Telus CIQ",
    "Give me global-master-ne-template",
    "Update telus 22.A.0 template to 22.A.1",
    "Get me a global master Template",
  ];

  const cardGradient = useColorModeValue(
    "linear(to-r, #3182CE, #63B3ED)",
    "linear(to-r, #2C5282, #2A4365)"
  );

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} mt={4}>
      {sampleQuestions.map((question, index) => (
        <MotionBox
          key={index}
          bgGradient={cardGradient}
          borderRadius="lg"
          p={3}
          cursor="pointer"
          position="relative"
          height="4.5rem"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          _hover={{
            transform: "scale(1.03)",
            boxShadow: "lg",
          }}
          transition="all 0.3s ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onClick(question)}
        >
          <Text fontSize="sm" fontWeight="medium" color="white" isTruncated>
            {question}
          </Text>

          <MotionIcon
            size="24px"
            color="#3182CE"
            style={{
              background: "#fff",
              borderRadius: "50%",
              padding: "6px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            }}
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </MotionBox>
      ))}
    </SimpleGrid>
  );
};

export default SampleQuestions;
