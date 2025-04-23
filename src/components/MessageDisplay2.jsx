import React, { useState } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  IconButton,
  useColorMode,
  useToast,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";

const parseTemplate = (raw) => {
  const lines = raw.trim().split("\n").map(line => line.trim()).filter(Boolean);
  const sections = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("@")) {
      if (current) sections.push(current);
      current = { section: line.slice(1), headers: [], rows: [] };
    } else if (current && current.headers.length === 0) {
      current.headers = line.split(",").map(h => h.trim());
    } else if (current) {
      const values = line.split(",").map(v => v.trim());
      while (values.length < current.headers.length) values.push("");
      current.rows.push(values);
    }
  }
  if (current) sections.push(current);
  return sections;
};

const MessageDisplay2 = ({ message }) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const isDark = colorMode === "dark";

  const cardBg = useColorModeValue("white", "gray.700");
  const tableHeaderBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast({
      title: "Configuration copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = parseTemplate(message);

  return (
    <Box position="relative" w="full">
      <Box _hover={{ '.copy-config-btn': { display: 'inline-flex' } }}>
        <VStack align="stretch" spacing={4}>
          {sections.map((sec, idx) => (
            <Box
              key={idx}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="xl"
              p={4}
              bg={cardBg}
              boxShadow="md"
              overflowX="auto"
            >
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="blue.500"
                mb={3}
                borderBottom="1px solid"
                borderColor={borderColor}
                pb={1}
              >
                @{sec.section}
              </Text>

              <Table variant="striped" size="sm" w="full">
                <Thead bg={tableHeaderBg}>
                  <Tr>
                    {sec.headers.map((h, i) => (
                      <Th key={i} fontSize="sm">{h}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {sec.rows.map((row, rIdx) => (
                    <Tr key={rIdx}>
                      {row.map((val, cIdx) => (
                        <Td key={cIdx} fontSize="sm">{val || "-"}</Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ))}
        </VStack>

        {/* Copy Button (Entire Message) */}
        <IconButton
          icon={copied ? <CheckIcon /> : <CopyIcon />}
          aria-label="Copy config"
          size="sm"
          variant="ghost"
          colorScheme="blue"
          className="copy-config-btn"
          position="absolute"
          top={2}
          right={-2}
          display="none"
          _hover={{ transform: "scale(1.1)" }}
          onClick={handleCopy}
        />
      </Box>
    </Box>
  );
};

export default MessageDisplay2;
