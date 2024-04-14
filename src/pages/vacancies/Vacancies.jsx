import MyVacancies from "../../components/myvacancies/MyVacancies";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyVacancies } from "../../store/slices/vacancySlice";
import { Button, Container, Group, Text } from "@mantine/core";

export default function Vacancies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vacancies = useSelector((state) => state.vacancy.vacancies);
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
          <Button
            onClick={() => navigate("/create-vacancy")}
            variant="filled"
            color="rgba(61, 61, 61, 1)"
            mb={10}
          >
            Create vacancy
          </Button>
        </Group>
        <MyVacancies vacancies={vacancies} />
      </Container>
    </main>
  );
}
