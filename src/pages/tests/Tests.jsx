import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Loader,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { IconCertificate } from "@tabler/icons-react";
import classes from "./Tests.module.css";
import { getMyTests } from "../../store/slices/testSlice";

export default function Tests() {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.apply.tests);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyTests());
  }, []);

  return (
    <main>
      <div className="container">
        <div className="flex flex-ai-c flex-jc-end ptb7">
          <button
            className="button button-black"
            onClick={() => navigate(`/create-test`)}
          >
            Create test
          </button>
        </div>

        {tests.length > 0 ? (
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
                </Card>
              ))}
          </SimpleGrid>
        ) : (
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
      </div>
    </main>
  );
}
