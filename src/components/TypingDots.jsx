import { HStack, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Dot = motion(Box);

const TypingDots = () => {
  return (
    <HStack spacing={1} mt={1}>
      {[0, 1, 2].map((i) => (
        <Dot
          key={i}
          w={1.5} // Smaller width
          h={1.5} // Smaller height
          borderRadius="full"
          bg="white"
          animate={{ 
            opacity: [0.3, 1, 0.3], 
            scale: [0.7, 1.2, 0.7]  // Scale from small to big to small
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.2,
          }}
        />
      ))}
    </HStack>
  );
};

export default TypingDots;
