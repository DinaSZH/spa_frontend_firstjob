import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Center,
  Container,
  Loader,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { IconCertificate } from "@tabler/icons-react";
import classes from "./Tests.module.css";
import {
  getMyTests,
  getPlatformTestById,
  getPlatformTests,
} from "../../store/slices/testSlice";
import ModalTest from "../../components/ModalTest/ModalTest";
import { useDisclosure } from "@mantine/hooks";
import ModalTestPlatform from "../../components/ModalTestPlatform/ModalTestPlatform";
import KeycloakService from "../../services/KeycloakService";

export default function PlatformTest() {
  const dispatch = useDispatch();
  const platformTests = useSelector((state) => state.test.platformTests);
  const {platformTest, loadingTest} = useSelector((state) => state.test);
  const [openedTest, { open: openTest, close: closeTest }] =
    useDisclosure(false);

  useEffect(() => {
    dispatch(getPlatformTests());
  }, []);

  const handleTakeTest = (id) => {
    dispatch(getPlatformTestById(id));
    openTest();
  };

  return (
    <main>
      <Container size="lg" py="xl">
        <Center>
          <Text size="xl" fw={700}>
            {" "}
            Test platforms for obtaining a certificate
          </Text>
        </Center>

        {platformTests && platformTests.length > 0 ? (
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
            {platformTests &&
              platformTests.map((item) => (
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

                  <Text size="sm" c="blue" mt="sm">
                    Status: {item.status}
                  </Text>

                  {KeycloakService.getUserRole() && (
                    <Button mt="sm" onClick={() => handleTakeTest(item.id)}>
                      Take the test
                    </Button>
                  )}
                </Card>
              ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
            <Skeleton height={300} radius="xl" />
            <Skeleton height={300} radius="xl" />
            <Skeleton height={300} radius="xl" />
            <Skeleton height={300} radius="xl" />
            <Skeleton height={300} radius="xl" />
            <Skeleton height={300} radius="xl" />
          </SimpleGrid>
        )}
      </Container>

      <ModalTestPlatform
        opened={openedTest}
        close={closeTest}
        fullTestData={platformTest}
        loading={loadingTest}
      />
    </main>
  );
}
