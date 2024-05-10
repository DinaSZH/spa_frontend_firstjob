import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { IconCertificate } from "@tabler/icons-react";
import classes from "./Tests.module.css";
import { getMyTests } from "../../store/slices/testSlice";

export default function Tests() {
  const dispatch = useDispatch();
  const { tests, loadingTest } = useSelector((state) => state.test);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyTests());
  }, []);

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="flex-start">
          <Button
            onClick={() => navigate(`/create-test`)}
            variant="filled"
            color="blue"
            mb={10}
          >
            Create test
          </Button>
        </Group>

        {loadingTest ? (
          <>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
              <Skeleton height={300} radius="xl" />
              <Skeleton height={300} radius="xl" />
              <Skeleton height={300} radius="xl" />
              <Skeleton height={300} radius="xl" />
              <Skeleton height={300} radius="xl" />
              <Skeleton height={300} radius="xl" />
            </SimpleGrid>
          </>
        ) : (
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
            {tests &&
              tests.map((item) => (
                <Card
                  key={item.id}
                  shadow="md"
                  radius="md"
                  padding="xl"
                  className={classes.testContainer}
                >
                  <Link
                    to={`/tests/${item.id}`}
                    style={{ textDecoration: "none" }}
                    className="flex flex-jc-c flex-ai-c flex-cl"
                  >
                    <div>
                      <IconCertificate
                        style={{ width: 50, height: 50, color: "#00abfb" }}
                      />
                    </div>
                    <Text size="lg" fw={700} mt="md" style={{color: '#228be6'}} >
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
                  </Link>
                </Card>
              ))}
          </SimpleGrid>
        )}

        {tests.length < 1 && (
          <Container className={classes.root}>
            <Title className={classes.title}>There is no tests.</Title>
            <Text
              c="dimmed"
              size="lg"
              ta="center"
              className={classes.description}
            >
              You do not have any tests, create a test by clicking on the button
              "Create Test"
            </Text>
          </Container>
        )}
      </Container>
    </main>
  );
}
