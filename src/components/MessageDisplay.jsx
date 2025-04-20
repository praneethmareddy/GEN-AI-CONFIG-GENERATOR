import React, { useState } from 'react';
import {
  Box,
  Button,
  Code,
  useColorMode,
  useToast,
  VStack,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import 'highlight.js/styles/github.css';

const MessageDisplay = ({ message }) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [copiedBlock, setCopiedBlock] = useState(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleCopyCode = (codeText, index) => {
    navigator.clipboard.writeText(codeText);
    setCopiedBlock(index);
    toast({
      title: 'Code copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => setCopiedBlock(null), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopiedMessage(true);
    toast({
      title: 'Message copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const renderMarkdown = (text) => {
    let blockIndex = -1;

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeText = String(children).replace(/\n$/, '');
            blockIndex++;

            if (!inline && match) {
              return (
                <Box
                  position="relative"
                  my={4}
                  borderRadius="md"
                  bg={colorMode === 'dark' ? 'gray.900' : 'gray.100'}
                  borderWidth="1px"
                  borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                  w="full"
                >
                  <Box
                    as="pre"
                    p={4}
                    maxH="300px"
                    overflow="auto"
                    fontSize="sm"
                    fontFamily="monospace"
                    w="full"
                  >
                    <Code
                      as="code"
                      className={className}
                      whiteSpace="pre"
                      display="block"
                      w="full"
                      bg={colorMode === 'dark' ? 'gray.900' : 'gray.100'}
                      {...props}
                    >
                      {children}
                    </Code>
                  </Box>
                  <Button
                    position="absolute"
                    top={2}
                    right={2}
                    size="xs"
                    onClick={() => handleCopyCode(codeText, blockIndex)}
                    variant="ghost"
                    colorScheme="teal"
                    aria-label="Copy code"
                  >
                    {copiedBlock === blockIndex ? <CheckIcon /> : <CopyIcon />}
                  </Button>
                </Box>
              );
            }

            return (
              <Code
                fontSize="sm"
                fontFamily="monospace"
                borderRadius="md"
                px={1.5}
                py={0.5}
                bg={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                whiteSpace="pre-wrap"
                {...props}
              >
                {children}
              </Code>
            );
          },
          pre({ children }) {
            return <Box w="full">{children}</Box>;
          },
          table({ children }) {
            return (
              <Box my={4} overflowX="auto" w="full">
                <Box
                  as="table"
                  width="full"
                  borderWidth="1px"
                  borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                  borderRadius="md"
                  overflow="hidden"
                >
                  {children}
                </Box>
              </Box>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  return (
    <Box position="relative" w="full">
      <Button
        size="xs"
        variant="ghost"
        position="absolute"
        top={1}
        right={1}
        colorScheme="blue"
        onClick={handleCopyMessage}
        aria-label="Copy message"
      >
        {copiedMessage ? <CheckIcon /> : <CopyIcon />}
      </Button>

      <VStack align="start" spacing={4} width="full">
        {renderMarkdown(message)}
      </VStack>
    </Box>
  );
};

export default MessageDisplay;
