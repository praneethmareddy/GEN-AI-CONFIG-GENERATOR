import { Box, Textarea, IconButton } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { useState } from "react";

const MessageInput = ({ onSend, isLoading }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue);
      setInputValue(""); // Clear input
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !isLoading) {
      event.preventDefault(); // Prevent new line
      handleSend();
    }
  };

  return (
    <Box mt={4} display="flex" alignItems="center" gap={2}>
      <Textarea
        placeholder="Type your query..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        flex="1"
        borderRadius="md"
        resize="none"
        rows={1} // make it smaller
        minH="40px" // set minimum height
        py={2} // optional: tighten padding
      />
      <IconButton
        aria-label="Send"
        icon={<FiSend />}
        colorScheme="blue"
        borderRadius="full"
        onClick={handleSend}
        isDisabled={!inputValue.trim() || isLoading}
      />
    </Box>
  );
};

export default MessageInput;
