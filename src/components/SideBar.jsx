import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Text,
  Icon,
  Button,
  useColorModeValue,
  useMediaQuery,Spacer
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns"; 
import { FiMenu, FiPlus, FiMessageSquare, FiTrash2 } from "react-icons/fi";
import { ChatIcon } from "@chakra-ui/icons"; // For ChatBot icon
import ColorToggleButton from "./ColorToggleButton"; // Assuming you have this component
import { motion } from "framer-motion";
import TypingDots from "./TypingDots";
import { Sparkles } from "lucide-react";


const MotionSparkle = motion(Sparkles);

const MotionFlex = motion(Flex);



// Desktop Sidebar Component
const DesktopSidebar = ({ conversationHistory, currentChatIndex, onLoadConversation, newChat,clearHistory}) => {
  const [extended, setExtended] = useState(false);
  const bg = useColorModeValue("blue.50", "blue.900");
  const hoverBg = useColorModeValue("blue.100", "blue.700");
  const borderColor = useColorModeValue("blue.200", "blue.600");
  
  return (
    <Flex
      direction="column"
      bg={bg}
      h="100vh"
      w={extended ? "265px" : "65px"}
      transition="width 0.2s"
      borderRight="1px solid"
      borderColor={borderColor}
      justify="space-between"
      boxShadow="md"
    >
      <VStack align="stretch" p={4} spacing={4}>
        <IconButton
          icon={<FiMenu />}
          aria-label="Toggle menu"
          variant="ghost"
          size="sm"
          onClick={() => setExtended((prev) => !prev)}
        />
        <Flex
          align="center"
          gap={4}
          cursor="pointer"
          p={1}
          borderRadius="md"
          _hover={{ bg: hoverBg }}
          onClick={() => newChat(currentChatIndex)}
        >
          <Icon as={FiPlus} boxSize={5} />
          {extended && <Text fontSize="sm">New Chat</Text>}
        </Flex>
        {extended && conversationHistory?.length > 0 && (
          <Box>
  <Text fontWeight="bold" mb={2}>
    Conversation History
  </Text>
  <Box overflowY="auto" height="50vh"> {/* Use height to limit the scrollable area */}
    {conversationHistory
      .filter(conversation => conversation && conversation.timestamp)
      .map((conversation, index) => (
        <Flex
          key={index}
          align="center"
          gap={2}
          p={1}
          borderRadius="md"
          _hover={{ bg: hoverBg }}
          cursor="pointer"
          onClick={() => onLoadConversation(index)}
        >
          <Icon as={FiMessageSquare} boxSize={4} />
          <Text 
            fontSize="sm" 
            noOfLines={1} 
            w={20} 
            overflow="hidden" 
            textOverflow="ellipsis"
            textAlign="left"
          >
            {conversation?.messages?.[0]?.text?.slice(0, 18) + "..." || "Empty"}
          </Text>
          <Text fontSize="9px" color="gray.500" noOfLines={1}>
            {formatDistanceToNow(new Date(conversation.timestamp), { addSuffix: true })}
          </Text>
        </Flex>
      ))}
  </Box>
</Box>

        )}
        
      </VStack>
      <VStack align="stretch" p={4} spacing={2}>
      {extended && (
  <Text
    fontSize="9px"
    textAlign="center"
    // fontStyle="italic"
    bgGradient="linear(to-r, blue.300, blue.400)"
    bgClip="text"
    
  >
    Gen AI Config Generator 0.0.1v
  </Text>
)}

      <Flex
          align="center"
          gap={4}
          cursor="pointer"
          p={1}
          color="blue.500"
          borderRadius="md"
          _hover={{ bg: hoverBg }}
          onClick={() => clearHistory()}
        >
          <Icon as={FiTrash2} boxSize={5} />
          {extended && <Text fontSize="sm">Clear History</Text>}
        </Flex>
      </VStack>
    </Flex>
  );
};

// Mobile Sidebar Component
const MobileSidebar = ({
  conversationHistory,
  currentChatIndex,
  onLoadConversation,
  newChat,
  isLoading,
  clearHistory,
}) => {
  const [extended, setExtended] = useState(false);
  const bg = useColorModeValue("blue.50", "blue.900");
  const hoverBg = useColorModeValue("blue.100", "blue.700");
  const borderColor = useColorModeValue("blue.200", "blue.600");
  const headerGradient = useColorModeValue(
    "linear(to-r, #3182CE, #63B3ED)",
    "linear(to-r, #2C5282, #2A4365)"
  );
  return (
    <>
      <Flex
        bg={useColorModeValue("blue.400", "blue.800")}
        color="white"
        align="center"
        justify="space-between"
        px={3}
        py={2}
        position="fixed"
        top={0}
        left={0}
        w="100%"
        zIndex={10}
        boxShadow="lg"
      >
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

        {/* {!isMobile && (
          <Box position="absolute" right={4}>
            <ColorToggleButton />
          </Box>
        )} */}
        <Flex align="flex-end">
          <IconButton
            icon={<FiMenu />}
            aria-label="Toggle menu"
            variant="ghost"
            size="sm"
            onClick={() => setExtended((prev) => !prev)}
          />
          <ColorToggleButton />
        </Flex>
      </MotionFlex>
        
      </Flex>

      {extended && (
        <Box
          position="absolute"
          top="20vh"
          left={0}
          w="100%"
          h="80vh"
          bg={bg}
          boxShadow="lg"
          zIndex={10}
          p={4}
        >
          <VStack align="stretch" spacing={4} height="100%">
            <Button
              leftIcon={<FiPlus />}
              onClick={() => {
                newChat(currentChatIndex);
                setExtended(false);
              }}
              justifyContent="flex-start"
              w="full"
            >
              New Chat
            </Button>

            <Box
              overflowY="auto"
              flex="1"
              pr={1}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#555',
                },
              }}
            >
              {conversationHistory?.length > 0 ? (
                conversationHistory
                  .filter(convo => convo && convo.timestamp)
                  .map((conversation, index) => (
                    <Flex
                      key={index}
                      align="center"
                      gap={2}
                      p={2}
                      borderRadius="md"
                      _hover={{ bg: hoverBg }}
                      cursor="pointer"
                      onClick={() => {
                        onLoadConversation(index);
                        setExtended(false);
                      }}
                    >
                      <Icon as={FiMessageSquare} />
                      <Text
                        fontSize="sm"
                        noOfLines={1}
                        w="20"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        textAlign="left"
                      >
                        {conversation?.messages?.[0]?.text?.slice(0, 18) + "..." || "Empty"}
                      </Text>
                      <Spacer />
                      <Text fontSize="8px" color="gray.500" noOfLines={1}>
                        {formatDistanceToNow(new Date(conversation.timestamp), { addSuffix: true })}
                      </Text>
                    </Flex>
                  ))
              ) : (
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  No conversations yet.
                </Text>
              )}
            </Box>

            <Button
              leftIcon={<FiTrash2 />}
              colorScheme="blue"
              color="blue.900"
              onClick={clearHistory}
              justifyContent="flex-start"
              w="full"
            >
              Clear History
            </Button>
          </VStack>
        </Box>
      )}
    </>
  );
};


// Main Sidebar Component
const Sidebar = ({ conversationHistory = [], onLoadConversation, newChat, currentChatIndex, isLoading , setConversationHistory}) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  // Common function to clear history
const clearHistory = () => {
    
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("conversationHistory");
    }
  //   window.location.reload();
    setConversationHistory([]);
  };
  return isMobile ? (
    <MobileSidebar
      conversationHistory={conversationHistory}
      onLoadConversation={onLoadConversation}
      newChat={newChat}
      currentChatIndex={currentChatIndex}
      isLoading={isLoading}
      clearHistory={clearHistory}
    />
  ) : (
    <DesktopSidebar
      conversationHistory={conversationHistory}
      onLoadConversation={onLoadConversation}
      newChat={newChat}
      currentChatIndex={currentChatIndex}
      clearHistory={clearHistory}
    />
  );
};

export default Sidebar;
