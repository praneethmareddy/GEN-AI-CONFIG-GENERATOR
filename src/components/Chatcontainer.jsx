import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import ColorToggleButton from "./ColorToggleButton";
import TypingDots from "./TypingDots";
import { Sparkles } from "lucide-react";


const MotionSparkle = motion(Sparkles);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

const ChatContainer = ({ children, isLoading }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  // Blue gradient for both light and dark mode
  const bgGradient = useColorModeValue(
    "linear(to-br, #ebf8ff, #bee3f8)", // light mode blues
    "linear(to-br, #1A365D, #2A4365)"  // dark mode blues
  );

  const headerGradient = useColorModeValue(
    "linear(to-r, #3182CE, #63B3ED)",
    "linear(to-r, #2C5282, #2A4365)"
  );

  return (
    <Flex
      direction="column"
      bgGradient={bgGradient}
      boxShadow="lg"
      w="100%"
      h="100vh"
      mx="auto"
      overflow="hidden"
      transition="all 0.3s ease"
    >
      {/* Header */}
      <MotionFlex
        bgGradient={headerGradient}
        color="white"
        align="center"
        justify="center"
        px={4}
        py={4}
        position="relative"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Flex align="center" direction="column">
          <Flex align="center" gap={2}>
          <MotionSparkle
      size={26}
      color="white"
      animate={{ rotate: [0, 15, -15, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
            <Text fontSize="md">
              GENERATIVE AI CONFIGURATION GENERATOR
            </Text>
          </Flex>

          {isLoading && (
            <TypingDots />
          )}
        </Flex>

        {!isMobile && (
          <Box position="absolute" right={4}>
            <ColorToggleButton />
          </Box>
        )}
      </MotionFlex>

      {/* Chat area */}
      <Box
        flex="1"
        overflowY="auto"
        p={4}
        sx={{
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': {
            background: useColorModeValue('#CBD5E0', '#4A5568'),
            borderRadius: '8px',
          },
        }}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default ChatContainer;
