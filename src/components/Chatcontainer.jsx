import { Box, Flex, Text, Icon, useColorModeValue, useMediaQuery} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import ColorToggleButton from "./ColorToggleButton";

const ChatContainer = ({ children ,isLoading}) => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex
      direction="column"
      border="1px solid"
      borderColor={borderColor}
      bg={bg}
      // borderRadius="md"
      w="100%"
      // maxW="500px"
      h="100vh" // Full height of the viewport
      mx="auto"
      mt={0}
      shadow="md"
      
    >
      {/* Header */}
      {!isMobile ? (<Flex
        bg={useColorModeValue("blue.500", "blue.700")}
        color="white"
        align="center"
        justify="space-between"
        px={4}
        py={3}
        // borderTopRadius="md"
      >
        <Flex align="center" gap={2}>
          <Icon as={ChatIcon} boxSize={6} />
          <Flex  align="center" // Centers children horizontally
             justify="center" direction="column">
          <Text fontWeight="bold">ChatBot</Text>
          <Box height="8px"> 
        {isLoading && (
          <Text fontSize="xs">typing...</Text>
        )}
      </Box>
        </Flex>
        </Flex>
        {/* Small toggle button */}
        <ColorToggleButton />
      </Flex>):(<Flex
        bg={useColorModeValue("blue.500", "blue.700")}
        color="white"
        align="center"
        justify="space-between"
        px={4}
        py={4}
        // borderTopRadius="md"
      >
      </Flex>)}

      {/* Main chat area */}
      <Box
        flex="1" // Ensures the main area expands to fill available space
        overflowY="auto" // Enables scrolling when content overflows
        p={4}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default ChatContainer;
