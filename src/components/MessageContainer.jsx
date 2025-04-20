import React, { useEffect, useRef } from "react";
import Message from "./Message"; // Import the Message component
import LoadingSkeleton from "./LoadingSkeleton";
const MessageContainer = ({ messages, isLoading }) => {
  const bottomRef = useRef(null); // Ref to track the bottom of the container

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
   <>
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message.text} // Render plain text from the message object
          isUser={message.isUser} // Pass the isUser property
        />
      ))}
      {isLoading && (
       <LoadingSkeleton/>
      )}
      {/* Invisible div to ensure we scroll to the bottom */}
      <div ref={bottomRef}></div>
      </>
  );
};

export default MessageContainer;
