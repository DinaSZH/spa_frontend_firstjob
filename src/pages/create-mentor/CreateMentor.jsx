import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
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

export default function CreateMentor() {
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

  const handleSave = async () => {
    try {
      const mentorData = {
        position: form.values.position,
        company: form.values.company,
        cityId: form.values.cityId,
        cost: form.values.cost,
        about: form.values.about,
        telegramLink: form.values.telegramLink,
        format: formatJob(form.values.format),
        currency: form.values.currency,
        experience: formatExperience(form.values.experience),
      };

      await dispatch(createMentorProfile(mentorData));
      navigate("/profile/mentor");
    } catch (error) {
      console.error("Error creating mentor:", error);
    }
  };
  const form = useForm({
    initialValues: {
      telegramLink: "",
      cityId: 1,
      position: "",
      company: "",
      cost: 0,
      currency: "KZT",
      format: "Online",
      experience: "6+ years",
      about: "",
    },

    validate: {
      telegramLink: (value) =>
        value.length < 1 ? "telegramLink required" : null,
      position: (value) => (value.length < 1 ? "position required" : null),
      company: (value) => (value.length < 1 ? "company required" : null),
      cityId: (value) => (value < 1 ? "city required" : null),
      cost: (value) => (value < -1 ? "Can not be negative or empty" : null),
      currency: (value) => (value.length < 1 ? "currency required" : null),
      format: (value) => (value.length < 1 ? "format required" : null),
      experience: (value) => (value.length < 1 ? "experience required" : null),
      about: (value) => (value.length < 1 ? "about required" : null),
    },
  });

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="flex-end">
          <Button
            onClick={() => navigate("/profile")}
            variant="filled"
            color="rgba(51, 44, 44, 1)"
            mb={10}
          >
            Go to profile page
          </Button>
        </Group>
        <Text size="xl" fw={700} mb="lg">
          Create Mentor Profile
        </Text>

        <Paper radius="md" withBorder p="lg" color="#228BE6" shadow="xs">
          <Box mx="auto">
            <form onSubmit={form.onSubmit(handleSave)}>
              <TextInput
                mt="sm"
                label="Telegram link"
                placeholder="Input Telegram link"
                {...form.getInputProps("telegramLink")}
                required
              />

              <TextInput
                mt="sm"
                label="Position"
                placeholder="Input position"
                {...form.getInputProps("position")}
                required
              />
              <TextInput
                mt="sm"
                label="Company"
                placeholder="Input company name"
                {...form.getInputProps("company")}
                required
              />

              <Select
                mt="sm"
                label="City"
                placeholder="Search city"
                data={cities}
                value={cityId}
                onChange={(value) => setCityId(value)}
                searchable
                nothingFoundMessage="Nothing found..."
                {...form.getInputProps("cityId")}
                required
              />
              <Flex
                mih={50}
                gap="sm"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                <NumberInput
                  mt="sm"
                  label="Cost"
                  placeholder="Input Cost"
                  min={0}
                  max={1000000}
                  {...form.getInputProps("cost")}
                  required
                />
                <Select
                  mt="sm"
                  label="Currency"
                  placeholder="Pick value"
                  data={["KZT", "USD", "RUB"]}
                  {...form.getInputProps("currency")}
                  required
                />
              </Flex>

              <Select
                mt="sm"
                label="Mentorship format"
                placeholder="Pick value"
                data={["Online", "Offline"]}
                {...form.getInputProps("format")}
                required
              />
              <Select
                mt="sm"
                label="Experience"
                placeholder="Pick value"
                data={[
                  "No experience",
                  "Less than year",
                  "1-3 years",
                  "3-6 years",
                  "6+ years",
                ]}
                {...form.getInputProps("experience")}
                required
              />
              <Textarea
                mt="sm"
                label="About me"
                placeholder="Input description"
                {...form.getInputProps("about")}
                required
              />
              <Button type="submit" mt="lg">
                Submit
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
      <Space h="lg" />
    </main>
  );
}
