import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  NumberInput,
  Paper,
  Select,
  Space,
  TextInput,
  Textarea,
} from "@mantine/core";
import { POINT_CONTENT } from "../../config/end-point";
import { useDispatch, useSelector } from "react-redux";
import { Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createMentorProfile } from "../../store/slices/mentorSlice";
import {
  IconBrandTelegram,
  IconBuildingBroadcastTower,
  IconCoin,
  IconFileDescription,
  IconMail,
  IconMapPin,
  IconUserSquare,
} from "@tabler/icons-react";

export default function MentorProfile() {
  const [cityId, setCityId] = useState();
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${POINT_CONTENT}/api/content/vacancies/cities`).then((res) => {
      const transformedCities = res.data.map((city) => ({
        value: city.id.toString(),
        label: city.name,
      }));
      setCities(transformedCities);
    });
  }, []);

  const formatExperience = (experience) => {
    switch (experience) {
      case "No experience":
        return "NO_EXPERIENCE";
      case "Less than year":
        return "LESS_THAN_YEAR";
      case "1-3 years":
        return "ONE_TO_THREE";
      case "3-6 years":
        return "THREE_TO_SIX";
      case "6+ years":
        return "MORE_THAN_SIX";
      default:
        return "";
    }
  };

  const formatJob = (format) => {
    switch (format) {
      case "Online":
        return "ONLINE";
      case "Offline":
        return "OFFLINE";
      default:
        return "";
    }
  };

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="flex-end">
          <Button
            onClick={() => navigate("/edit-mentor")}
            variant="filled"
            color="rgba(51, 44, 44, 1)"
            mb={10}
          >
            Edit Profile
          </Button>
        </Group>
        <Text size="xl" fw={700} mb="lg">
          Mentor Profile
        </Text>

        <Paper radius="md" withBorder p="lg" color="#228BE6" shadow="xs">
          <Text mt={5} size="xl" fw={700}>
            {" "}
            {/* {mentor.firstname} {mentor.lastname}  */}
            Firstname lastname
          </Text>
          <Text mt={5} size="lg">
            {/* {mentor.position}, {mentor.company} */}
            position company
          </Text>
          <Space h="xs" />
          <Group gap={10} mt={10}>
            <IconMapPin />
            <Text>city, country</Text>
          </Group>
          <Group gap={10} mt={10}>
            <IconBrandTelegram />
            <Text>Telegram: telegramLink</Text>
          </Group>
          <Group gap={10} mt={10}>
            <IconMail />
            <Text>Email: email</Text>
          </Group>
          <Group gap={10} mt={10}>
            <IconCoin />
            <Text>Cost: cost, currency</Text>
          </Group>
          <Group gap={10} mt={10}>
            <IconBuildingBroadcastTower />
            <Text>Format: format</Text>
          </Group>
          <Group gap={10} mt={10}>
            <IconFileDescription />
            <Text>Experience: experience</Text>
          </Group>
          <Text mt={10} fw={700} size="xl">
            About me:
          </Text>
          <Text mt={10} size="lg">
            {/* {mentor.about} */}
            about
          </Text>
          <Space h="xs" />
        </Paper>
      </Container>
      <Space h="lg" />
    </main>
  );
}
