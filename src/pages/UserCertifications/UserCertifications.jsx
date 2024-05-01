import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { downloadResumeById } from "../../store/slices/resumeSlice";

import {
  Container,
  Chip,
  Text,
  SimpleGrid,
  Card,
  Center,
  Title,
  Button,
} from "@mantine/core";
import { IconCertificate, IconDownload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import KeycloakService from "../../services/KeycloakService";
import {
  downloadCertificationById,
  getMyCertifications,
} from "../../store/slices/testSlice";

export default function UserCertifications({ item }) {
  const certifications = useSelector((state) => state.test.certifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyCertifications(KeycloakService.getEmail()));
  }, []);

  return (
    <Container size="lg" py="xl">
      <Text size="lg" fw={700} mt="md">
        My certificaations
      </Text>

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
                  {item.testName}
                </Text>
                <Text size="sm" color="dimmed" mt="sm">
                  Score: {item.userScore} out of {item.totalScore}
                </Text>
                <Chip
                  mt="sm"
                  icon={<IconDownload style={{ width: 16, height: 16 }} />}
                  variant="light"
                  size="md"
                  onClick={() => dispatch(downloadCertificationById(item.id))}
                  defaultChecked
                >
                  Download
                </Chip>
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
