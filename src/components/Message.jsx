import { Box, HStack, Icon, Text, useColorMode , useColorModeValue} from "@chakra-ui/react";
import { FaUser, FaRobot } from "react-icons/fa";
import MessageDisplay from "./MessageDisplay";
import ReactMarkdown from "react-markdown";
const Message = ({ message = "", isUser = false }) => {
  const { colorMode } = useColorMode(); // Get the current theme mode
  const isDark = colorMode === "dark";
  const messageGradient = useColorModeValue(
    // "linear(to-r, blue.600, blue.400)",
    "linear(to-r, blue.400, blue.300)"
  );
  
  // Shared styles for message box
  const messageBoxStyles = {
    px: 4,
    py: 2,
    borderRadius: "lg",
    maxW: "75%",
    fontSize: "sm",
  };

  return (
    <HStack
      justifyContent={isUser ? "flex-end" : "flex-start"}
      spacing={2}
      maxW="100%"
      mb={2}
    >
      {/* Bot's message layout */}
      {!isUser && (
        <>
          <Icon
            as={FaRobot}
            boxSize={5}
            color={isDark ? "blue.300" : "blue.500"}
            aria-label="Bot Icon"
            
          />
          <Box
             bg={isDark ? "gray.600" : "gray.200"}
           color={isDark ? "gray.100" : "black"}
            {...messageBoxStyles}
          >
            <MessageDisplay message={message}/>
            {/* <Text>{message}</Text> */}
            {/* <ReactMarkdown>{message}</ReactMarkdown> */}
          </Box>
        </>
      )}

      {/* User's message layout */}
      {isUser && (
        <>
          <Box
           bgGradient={messageGradient}
            color="white"
            {...messageBoxStyles}
          >
            <Text>{message}</Text>
          </Box>
          <Icon
            as={FaUser}
            boxSize={5}
            
            color={isDark ? "blue.300" : "blue.500"}
            aria-label="User Icon"
          />
        </>
      )}
    </HStack>
  );
};

export default Message;
