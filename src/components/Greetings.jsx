import { Box, Text, useMediaQuery } from "@chakra-ui/react";

const Greetings = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      className="greet"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // h={isSmallScreen ? "10vh" : "19vh"} // Dynamic height
      textAlign="center"
      px={2} // Padding for small screens
      py={2}
    >
      <Text
        fontSize={isSmallScreen ? "12px" : "16px"} // Dynamic font size for the first greeting
        my="2"
      >
       <span>Hello, mate</span> 
      </Text>
      <Text
        fontSize={isSmallScreen ? "11px" : "15px"} // Dynamic font size for the second greeting
       
      >
       Ask our Gen-AI config generator to provide the perfect configuration
      </Text>
    </Box>
  );
};

export default Greetings;
