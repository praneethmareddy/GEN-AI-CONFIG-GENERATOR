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



// Desktop Sidebar Component
const DesktopSidebar = ({ conversationHistory, currentChatIndex, onLoadConversation, newChat,clearHistory}) => {
  const [extended, setExtended] = useState(false);
  const bg = useColorModeValue("gray.100", "gray.800");
  const hoverBg = useColorModeValue("gray.300", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.700");

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
            {conversationHistory.filter(conversation => conversation && conversation.timestamp)
              

             
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

                {/* <Spacer /> */}
                <Text fontSize="9px" color="gray.500" noOfLines={1}>
                    {formatDistanceToNow(new Date(conversation.timestamp), { addSuffix: true })}
                  </Text>
              </Flex>
            )
               )}
          </Box>
        )}
      </VStack>
      <VStack align="stretch" p={4} spacing={4}>
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
  isLoading,clearHistory
}) => {
  const [extended, setExtended] = useState(false);
  const bg = useColorModeValue("gray.100", "gray.800");
  const hoverBg = useColorModeValue("gray.300", "gray.600");

  return (
    <>
      <Flex
        bg={useColorModeValue("blue.500", "blue.700")}
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
        <Flex align="center" gap={2}>
          <Icon as={ChatIcon} boxSize={6} />
          <Flex align="center" justify="center" direction="column">
            <Text fontWeight="bold">ChatBot</Text>
            <Box height="8px">
              {isLoading && <Text fontSize="xs">typing...</Text>}
            </Box>
          </Flex>
        </Flex>
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
      </Flex>
      {extended && (
        <Box
          position="absolute"
          top="48px"
          left={0}
          w="100%"
          bg={bg}
          p={4}
          boxShadow="lg"
          zIndex={10}
        >
          <VStack align="stretch" spacing={4}>
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
            {conversationHistory?.length > 0 ? (
              conversationHistory.map((conversation, index) => (
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
  w={20} 
  overflow="hidden" 
  textOverflow="ellipsis"
  textAlign="left"
>
  {conversation?.messages?.[0]?.text?.slice(0, 18) + "..." || "Empty"}
</Text>
                  <Spacer />
                  <Text fontSize="6px" color="gray.500" noOfLines={1} justify="flex-end">
                    {formatDistanceToNow(new Date(conversation.timestamp), { addSuffix: true })}
                  </Text>
                </Flex>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500" px={10} textAlign={"left"}>
                No conversations yet.
              </Text>
            )}
            <Button
              leftIcon={<FiTrash2 />}
              colorScheme="blue"
              color="blue.500"
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
