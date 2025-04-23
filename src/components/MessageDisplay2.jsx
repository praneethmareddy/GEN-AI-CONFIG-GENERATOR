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
  useColorModeValue,
} from "@chakra-ui/react";

const parseTemplate = (raw) => {
  const lines = raw.trim().split("\n").map(line => line.trim()).filter(Boolean);
  const sections = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("@")) {
      if (current) sections.push(current);
      current = {
        section: line.slice(1),
        headers: [],
        rows: [],
      };
    } else if (current && current.headers.length === 0) {
      current.headers = line.split(",").map((h) => h.trim());
    } else if (current) {
      const values = line.split(",").map((v) => v.trim());
      while (values.length < current.headers.length) values.push(""); // pad empty
      current.rows.push(values);
    }
  }

  if (current) sections.push(current);
  return sections;
};

const MessageDisplay2 = ({ message }) => {
  const isTemplate = message.includes("@") && message.includes(",");
  const cardBg = useColorModeValue("white", "gray.700");
  const tableHeaderBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (!isTemplate) return <Text>{message}</Text>;

  const sections = parseTemplate(message);

  return (
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

          <Table variant="simple" size="sm">
            <Thead bg={tableHeaderBg}>
              <Tr>
                {sec.headers.map((h, i) => (
                  <Th key={i} color="gray.600" fontSize="sm">
                    {h}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {sec.rows.map((row, rIdx) => (
                <Tr key={rIdx}>
                  {row.map((val, cIdx) => (
                    <Td key={cIdx} fontSize="sm">
                      {val || "-"}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ))}
    </VStack>
  );
};

export default MessageDisplay2;
