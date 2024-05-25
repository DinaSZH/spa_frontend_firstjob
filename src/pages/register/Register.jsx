import { Link } from "react-router-dom";
import KeycloakService from "../../services/KeycloakService";
import { Button, Center, Paper, Space } from "@mantine/core";
import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconGauge, IconUser, IconCookie } from "@tabler/icons-react";
import classes from "./Register.module.css";

export default function Register() {
  const theme = useMantineTheme();

  return (
    <main>
      <Center>
        <Container size="lg" py="xl">
          <Title order={2} className={classes.title} ta="center" mt="sm">
            Sign up for new users
          </Title>

          <Text c="dimmed" className={classes.description} ta="center" mt="md">
            Welcome to Our Community! Thank you for choosing to register with
            us. By creating an account, you're unlocking a world of
            possibilities and exclusive benefits.
          </Text>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
            <Card shadow="md" radius="md" className={classes.card} padding="xl">
              <IconGauge
                style={{ width: rem(50), height: rem(50) }}
                stroke={2}
                color={theme.colors.blue[6]}
              />
              <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                Signup HR
              </Text>
              <Text fz="sm" c="dimmed" mt="sm">
                "By signing up, you're gaining access to a comprehensive suite
                of tools and resources designed to streamline your HR processes
                and empower your organization.",
              </Text>
              <Space h="md" />
              <Link to="/register/hr" style={{ color: "#fff" }}>
                <Button style={{ width: "100%" }}>Sign up hr</Button>
              </Link>
            </Card>

            <Card shadow="md" radius="md" className={classes.card} padding="xl">
              <IconUser
                style={{ width: rem(50), height: rem(50) }}
                stroke={2}
                color={theme.colors.blue[6]}
              />
              <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                Signup employee
              </Text>
              <Text fz="sm" c="dimmed" mt="sm">
                By signing up, you're gaining access to a wealth of resources
                and tools designed to enhance your work experience and empower
                your professional growth.
              </Text>
              <Space h="md" />
              <Button onClick={() => KeycloakService.doRegister()}>
                Sign up employee
              </Button>
            </Card>
            <Card shadow="md" radius="md" className={classes.card} padding="xl">
              <IconCookie
                style={{ width: rem(50), height: rem(50) }}
                stroke={2}
                color={theme.colors.blue[6]}
              />
              <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                Signup mentors
              </Text>
              <Text fz="sm" c="dimmed" mt="sm">
                By signing up as a mentor, you're joining a network of
                experienced individuals. Share your knowledge, expertise, and
                insights with mentees.
              </Text>
              <Space h="md" />
              <Link
                to="/register/mentor"
                className="w-full"
                style={{ color: "#fff" }}
              >
                <Button style={{ width: "100%" }}>Sign up mentor</Button>
              </Link>
            </Card>
          </SimpleGrid>
        </Container>
      </Center>
    </main>
  );
}
