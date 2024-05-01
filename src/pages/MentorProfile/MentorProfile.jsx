import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Flex, Paper, Space, Title } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { Group, Text } from "@mantine/core";
import { getMentorProfile } from "../../store/slices/mentorSlice";
import {
  IconBrandTelegram,
  IconBuildingBroadcastTower,
  IconCoin,
  IconFileDescription,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";

export default function MentorProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mentor = useSelector((state) => state.mentor.mentorProfile);

  useEffect(() => {
    dispatch(getMentorProfile());
  }, []);

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="flex-end">
          {mentor && (
            <Button
              onClick={() => navigate("/edit-mentor")}
              variant="filled"
              color="rgba(51, 44, 44, 1)"
              mb={10}
            >
              Edit Profile
            </Button>
          )}
        </Group>

        {mentor ? (
          <>
            <Text size="xl" fw={700} mb="lg">
              Mentor Profile
            </Text>
            <Paper radius="md" withBorder p="lg" color="#228BE6" shadow="xs">
              <Text mt={5} size="xl" fw={700}>
                {mentor?.firstname} {mentor?.lastname}
              </Text>
              <Text mt={5} size="lg">
                Position: {mentor?.position}, {mentor?.company}
              </Text>
              <Space h="xs" />
              <Group gap={10} mt={10}>
                <IconMapPin />
                <Text>
                  {mentor?.city}, {mentor?.country}
                </Text>
              </Group>
              <Group gap={10} mt={10}>
                <IconBrandTelegram />
                <Text>Telegram: {mentor?.telegramLink}</Text>
              </Group>
              <Group gap={10} mt={10}>
                <IconMail />
                <Text>Email: {mentor?.email}</Text>
              </Group>
              <Group gap={10} mt={10}>
                <IconCoin />
                <Text>
                  Cost: {mentor?.cost} {mentor?.currency}
                </Text>
              </Group>
              <Group gap={10} mt={10}>
                <IconBuildingBroadcastTower />
                <Text>Format: {mentor?.format}</Text>
              </Group>
              <Group gap={10} mt={10}>
                <IconFileDescription />
                <Text>Experience: {mentor?.experience}</Text>
              </Group>
              <Text mt={10} fw={700} size="xl">
                About me:
              </Text>
              <Text mt={10} size="lg">
                {mentor?.about}
              </Text>
              <Text mt={10}>
                {mentor?.createdAt
                  ? `Created: ${mentor?.createdAt.split("T")[0]}`
                  : ""}
              </Text>
              <Space h="xs" />
            </Paper>
          </>
        ) : (
          <Flex
            gap="lg"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
            mt={40}
          >
            <Title>Create your Mentor profile.</Title>
            <Button
              onClick={() => navigate("/create-mentor")}
              variant="filled"
              color="rgba(51, 44, 44, 1)"
            >
              Create Profile
            </Button>
          </Flex>
        )}
      </Container>
      <Space h="lg" />
    </main>
  );
}
