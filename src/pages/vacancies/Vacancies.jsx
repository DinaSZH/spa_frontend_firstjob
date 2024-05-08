import MyVacancies from "../../components/myvacancies/MyVacancies";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyVacancies } from "../../store/slices/vacancySlice";
import {
  Button,
  Center,
  Container,
  Group,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import classes from "./MyVacancies.module.css";

export default function Vacancies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vacancies = useSelector((state) => state.vacancy.vacancies);
  const { loadingVacancy } = useSelector((state) => state.vacancy);

  useEffect(() => {
    dispatch(getMyVacancies());
  }, []);

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="space-between">
          <Text size="xl" fw={700} mb="lg">
            My Vacancies
          </Text>
            <Button onClick={() => navigate('/create-vacancy')}  variant="filled" color="rgba(61, 61, 61, 1)" mb={10}>
              Create vacancy
            </Button>
        </Group>
        {loadingVacancy ? (
          <>
            <Center h={500}>
              <Loader color="blue" size={100} />
            </Center>
          </>
        ) : (
          <MyVacancies vacancies={vacancies} />
        )}

        {!vacancies && (
          <Container className={classes.root}>
            <Title className={classes.title}>There is no vacancies.</Title>
            <Text
              c="dimmed"
              size="lg"
              ta="center"
              className={classes.description}
            >
              You do not have any vacancies, create a vacancy by clicking on the
              button "Create Vacancy"
            </Text>
          </Container>
        )}
      </Container>
    </main>
  );
}
