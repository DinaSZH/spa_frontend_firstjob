import React from "react";
import { Button, Flex, Notification, rem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  return (
    <Flex
      gap="md"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
      className="mt24"
    >
      <Notification
        withCloseButton={false}
        icon={checkIcon}
        withBorder
        color="teal"
        title="Your data has been sent successfully!"
        style={{ width: "100%" }}
      >
        Please check your email! <br></br>
        The answer will come to you by email
      </Notification>
      <Button onClick={() => navigate("/")}>Back to main page</Button>
    </Flex>
  );
};

export default Success;
