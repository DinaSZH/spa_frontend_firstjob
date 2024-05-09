import MyResumes from "../../components/myresumes/MyResumes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllResumesHR } from "../../store/slices/resumeSlice";
import {
  Center,
  Container,
  Group,
  Loader,
  Text,
  Title,
} from "@mantine/core";

export default function ResumeDB() {
  const dispacth = useDispatch();
  const { resumesHR, loading } = useSelector((state) => state.resume);

  useEffect(() => {
    dispacth(getAllResumesHR());
  }, []);

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="space-between">
          <Text size="xl" fw={700} mb="lg">
            Resume Database
          </Text>
        </Group>
        {loading ? (
          <>
            <Center h={500}>
              <Loader color="blue" size={100} />
            </Center>
          </>
        ) : (
          <MyResumes resumes={resumesHR} />
        )}
        {!resumesHR && !loading && (
          <Container >
            <Title >There is no resumes.</Title>
          </Container>
        )}
      </Container>
    </main>
  );
}
