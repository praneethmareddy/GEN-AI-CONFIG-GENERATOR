import React, { useState, useEffect } from "react";
import Sidebar from "./components/SideBar";
import ChatContainer from "./components/ChatContainer";
import MessageContainer from "./components/MessageContainer";
import MessageInput from "./components/MessageInput";
import Greetings from "./components/Greetings";
import SampleQuestions from "./components/SampleQuestions";
import { Flex, Box } from "@chakra-ui/react";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("conversationHistory")) || [];
    const savedMessages = JSON.parse(localStorage.getItem("currentChat")) || [];
    setConversationHistory(savedHistory);
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "conversationHistory",
      JSON.stringify(conversationHistory)
    );
  }, [conversationHistory]);

  useEffect(() => {
    localStorage.setItem("currentChat", JSON.stringify(messages));
  }, [messages]);

  const saveChatToHistory = (newMessages) => {
    const updatedHistory = [...conversationHistory];

    if (currentChatIndex !== null) {
      // Update the existing chat in history
      updatedHistory[currentChatIndex] = {
        ...updatedHistory[currentChatIndex],
        messages: newMessages || messages,
        timestamp: new Date().toISOString(),
      };
    } else {
      // Create a new chat in history
      updatedHistory.push({
        messages: newMessages || messages,
        timestamp: new Date().toISOString(),
      });
      setCurrentChatIndex(updatedHistory.length - 1); // Set index for the new chat
    }

    setConversationHistory(updatedHistory);
  };

  const handleSend = (text) => {
    const userMessage = { text, isUser: true };
    const updatedMessages = [...messages, userMessage];
  
    setMessages(updatedMessages);
    setLoading(true);
  
    // ❌ Don't call saveChatToHistory here
  
    setTimeout(() => {
      const botResponse = { text: `Here's what I found: ${text}`, isUser: false };
      const newMessages = [...updatedMessages, botResponse];
  
      setMessages(newMessages);
      setLoading(false);
  
      // ✅ Save only after bot has replied
      saveChatToHistory(newMessages);
    }, 10000);
  };
  
  const newChat = () => {
    if (messages.length > 0) {
      saveChatToHistory(); // Save the current chat
    }
    setMessages([]); // Clear messages
    setCurrentChatIndex(null); // Reset index
    setLoading(false); // 🔥 Stop loading
    localStorage.removeItem("currentChat");
  };
  
  

  const onLoadConversation = (index) => {
    saveChatToHistory(); // Save the current chat if it exists
    const selectedConversation = conversationHistory[index];
    if (selectedConversation) {
      setMessages(selectedConversation.messages); // Load selected chat messages
      setCurrentChatIndex(index); // Set the current chat index
    }
  };

  return (
    <Flex h="100vh" w="100vw" overflow="hidden">
      <Sidebar
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
        onLoadConversation={onLoadConversation}
        newChat={newChat}
        isLoading={loading}
      />
      <ChatContainer isLoading={loading}>
        <Box
          flex="1"
          overflowY="auto"
          p={4}
          bg="gray.50"
          borderRadius="md"
          minH="70vh"
          maxH="70vh"
        >
          {!messages.length && !loading ? (
            <>
              <SampleQuestions onClick={handleSend} />
              <Greetings />
            </>
          ) : (
            <MessageContainer messages={messages} isLoading={loading} />
          )}
        </Box>
        <MessageInput onSend={handleSend} isLoading={loading} />
      </ChatContainer>
    </Flex>
  );
};

export default App;
