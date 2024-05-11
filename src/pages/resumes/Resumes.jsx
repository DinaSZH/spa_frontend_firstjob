import Header from "../../components/header/Header";
import MyResumes from "../../components/myresumes/MyResumes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyResumes } from "../../store/slices/resumeSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  Container,
  Group,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import classes from "./Resume.module.css";

export default function Resumes() {
  const dispacth = useDispatch();
  const { resumes, loading } = useSelector((state) => state.resume);
  const navigate = useNavigate();

  useEffect(() => {
    dispacth(getMyResumes());
    console.log(loading);
  }, []);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

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
        {loading ? (
          <>
            <Center h={500}>
              <Loader color="blue" size={100} />
            </Center>
          </>
        ) : (
          <MyResumes resumes={resumes} />
        )}
        {resumes.length <1 && !loading && (
          <Container className={classes.root}>
            <Title className={classes.title}>There is no resumes.</Title>
            <Text
              c="dimmed"
              size="lg"
              ta="center"
              className={classes.description}
            >
              You do not have any resumes, create a resume by clicking on the
              button "Create Resume".
            </Text>
          </Container>
        )}
      </Container>
    </main>
  );
}
