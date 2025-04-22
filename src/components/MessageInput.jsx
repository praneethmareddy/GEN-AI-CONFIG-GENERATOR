import {
  Box,
  Textarea,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSend, FiPaperclip } from "react-icons/fi";
import { useRef, useState } from "react";

const MessageInput = ({ onSend, isLoading }) => {
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef();

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !isLoading) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && !isLoading) {
      onSend(file);
      event.target.value = "";
    }
  };

  const inputBg = useColorModeValue("white", "gray.700");
  const inputBorder = useColorModeValue("gray.300", "gray.600");
  const inputFocusBorder = useColorModeValue("blue.400", "blue.300");

  return (
    <Box position="relative" w="full" px={{ base: 0, md: 0 }} mt={4}>
      <Textarea
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        borderRadius="xl"
        resize="none"
        minH="60px"
        maxH="160px"
        rows={3}
        px={4}
        py={3}
        fontSize="sm"
        boxShadow="md"
        bg={inputBg}
        border="1px solid"
        borderColor={inputBorder}
        _focusVisible={{
          borderColor: inputFocusBorder,
          boxShadow: "0 0 0 1px " + inputFocusBorder,
        }}
        pr="90px" // Space for buttons inside
      />

      <Box position="absolute" right="16px" bottom="10px" display="flex" gap="2">
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          display="none"
        />

        <IconButton
          icon={<FiPaperclip />}
          aria-label="Attach file"
          size="sm"
          variant="ghost"
          onClick={() => fileInputRef.current.click()}
          isDisabled={isLoading}
        />
        <IconButton
          icon={<FiSend />}
          aria-label="Send"
          size="sm"
          colorScheme="blue"
          borderRadius="full"
          onClick={handleSend}
          isDisabled={!inputValue.trim() || isLoading}
        />
      </Box>
    </Box>
  );
};

export default MessageInput;
