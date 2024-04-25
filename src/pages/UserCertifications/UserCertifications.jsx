import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  deleteResumeById,
  downloadResumeById,
} from "../../store/slices/resumeSlice";

import {
  Container,
  Chip,
  Flex,
  Group,
  Paper,
  Text,
  SimpleGrid,
  Card,
  Center,
  Title,
  Button,
} from "@mantine/core";
import {
  IconAward,
  IconCertificate,
  IconDownload,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

export default function UserCertifications({ item }) {
  const [certifications, setCertifications] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container size="lg" py="xl">
      <Text size="lg" fw={700} mt="md">
        My certificaations
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        <Card
          shadow="md"
          radius="md"
          padding="xl"
          withBorder
          className="flex flex-ai-c flex-jc-c"
        >
          <div>
            <IconCertificate
              style={{ width: 50, height: 50, color: "#00abfb" }}
            />
          </div>
          <Text size="lg" fw={700} mt="md">
            Name
          </Text>
          <Text weight={500} size="md" color="dimmed" mt="sm">
            Description
          </Text>
          <Text size="sm" color="dimmed" mt="sm">
            Threshold Score: 3
          </Text>
          <Text size="sm" color="dimmed" mt="sm">
            Total Score: 30
          </Text>
          <Chip
            mt="sm"
            icon={<IconDownload style={{ width: 16, height: 16 }} />}
            variant="light"
            size="md"
            onClick={() => dispatch(downloadResumeById(item.id))}
            defaultChecked
          >
            Download
          </Chip>
        </Card>
      </SimpleGrid>

      {certifications && certifications.length > 0 ? (
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {certifications &&
            certifications.map((item) => (
              <Card
                key={item.id}
                shadow="md"
                radius="md"
                padding="xl"
                className="flex flex-ai-c flex-jc-c"
              >
                <div>
                  <IconCertificate
                    style={{ width: 50, height: 50, color: "#00abfb" }}
                  />
                </div>
                <Text size="lg" fw={700} mt="md">
                  {item.name}
                </Text>
                <Text weight={500} size="md" color="dimmed" mt="sm">
                  {item.description}
                </Text>
                <Text size="sm" color="dimmed" mt="sm">
                  Threshold Score: {item.thresholdScore}
                </Text>
                <Text size="sm" color="dimmed" mt="sm">
                  Total Score: {item.totalScore}
                </Text>
                <Button mt="sm">Take the test</Button>
              </Card>
            ))}
        </SimpleGrid>
      ) : (
        <Container pt={40}>
          <Title ta="center" mb={20}>
            There is no certifications.
          </Title>
          <Text c="dimmed" size="lg" ta="center" mb={20}>
            You do not have any certifications, to acquire platform
            certifications, proceed to the platform test section
          </Text>
          <NavLink to="/platform/tests" className="flex flex-ai-c flex-jc-c">
            <Button ta="center" mb={20} color="gray">
              Go to Platform tests
            </Button>
          </NavLink>
        </Container>
      )}
    </Container>
  );
}
