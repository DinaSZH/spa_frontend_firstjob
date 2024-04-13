import Header from "../../components/header/Header";
import MyResumes from "../../components/myresumes/MyResumes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyResumes } from "../../store/slices/resumeSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Group, Text } from "@mantine/core";

export default function Resumes() {
  const dispacth = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes);
  const navigate = useNavigate();

  useEffect(() => {
    dispacth(getMyResumes());
  }, []);

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="space-between">
          <Text size="xl" fw={700} mb="lg">
            My Resumes
          </Text>
          <Button
            onClick={() => navigate("/create-resume")}
            variant="filled"
            color="rgba(61, 61, 61, 1)"
            mb={10}
          >
            Create resume
          </Button>
        </Group>
        <MyResumes resumes={resumes} />
      </Container>
    </main>
  );
}
