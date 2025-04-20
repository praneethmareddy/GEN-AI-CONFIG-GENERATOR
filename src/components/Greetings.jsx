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
      h={isSmallScreen ? "15vh" : "25vh"} // Dynamic height
      textAlign="center"
      px={4} // Padding for small screens
    >
      <Text
        fontSize={isSmallScreen ? "20px" : "28px"} // Dynamic font size for the first greeting
        
        
      >
       <span>Hello, mate</span> 
      </Text>
      <Text
        fontSize={isSmallScreen ? "16px" : "20px"} // Dynamic font size for the second greeting
       
      >
        How Can I Assist You Today?
      </Text>
    </Box>
  );
};

export default Greetings;
