import {
  SimpleGrid,
  Card,
  Text,
  Container,
  Center,
  Loader,
} from "@mantine/core";
import classes from "./Mentors.module.css";
import {
  IconCoin,
  IconFileDescription,
  IconMail,
  IconUserSquare,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllMentors } from "../../store/slices/mentorSlice";
import { Link } from "react-router-dom";

export function Mentors() {
  const dispatch = useDispatch();
  const { mentors, loading } = useSelector((state) => state.mentor);

  useEffect(() => {
    dispatch(getAllMentors());
  }, []);
  const cards = mentors.map((article) => (
    <Card
      key={article.id}
      shadow="sm"
      padding="xl"
      p="md"
      radius="md"
      className={classes.card}
    >
      <Link to={`/mentors/${article.id}`}>
        <Center>
          <IconUserSquare size={150} color="#9e9e9e" />
        </Center>
        <Text className={classes.title} mt={5}>
          {article.firstname} {article.lastname}
        </Text>
        <Text size="xs" tt="uppercase" color="black" fw={600} mt={10}>
          {article.position}
        </Text>
        <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
          <IconMail /> {article.email}
        </Text>
        <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
          <IconCoin /> {article.cost} {article.currency}
        </Text>
        <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
          <IconFileDescription /> {article.experience}
        </Text>
      </Link>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      {loading ? (
        <>
          <Center h={500}>
            <Loader color="blue" size={100} />
          </Center>
        </>
      ) : (
        <>
          <Center>
            <Text size="xl" mb={20} fw={700}>
              Find your mentor
            </Text>
          </Center>
          <SimpleGrid cols={{ base: 1, sm: 4 }}>{cards}</SimpleGrid>
        </>
      )}
    </Container>
  );
}
