import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Text,
} from "@mantine/core";
import { getTestById } from "../../store/slices/testSlice";

export default function TestId() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { fullTest, loadingTest } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(getTestById(id));
  }, []);

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="flex-start">
          <Button
            onClick={() => navigate(`/tests`)}
            variant="filled"
            color="blue"
            mb={10}
          >
            Back
          </Button>
        </Group>

        <Paper
          mt={20}
          radius="md"
          withBorder
          p="lg"
          color="#228BE6"
          shadow="xs"
        >
          {loadingTest ? (
            <>
              <Center h={500}>
                <Loader color="blue" size={100} />
              </Center>
            </>
          ) : (
            <>
              <Text size="xl" fw={700} mt="md">
                Test title: {fullTest.name}
              </Text>
              <Text
                size="md"
                mt="sm"
                style={{
                  maxHeight: "90px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Test description: {fullTest.description}
              </Text>
              <Text size="md" mt="sm">
                Threshold Score: {fullTest.thresholdScore}
              </Text>
              <Text size="md" mt="sm">
                Total Score: {fullTest.totalScore}
              </Text>
              <Text size="md" fw={700} mt="md">
                Test questions:
              </Text>
              <Text>
                {fullTest.questions.map((question, index) => (
                  <div key={index}>
                    <h2>
                      {index + 1}: {question.question}
                    </h2>
                    <ul>
                      {question.answers.map((answer, answerIndex) => (
                        <li key={answerIndex}>{answer.answer}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Text>
            </>
          )}
        </Paper>
      </Container>
    </main>
  );
}
