import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Center,
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

export function Mentors() {
  const dispatch = useDispatch();
  const mentors = useSelector((state) => state.mentor.mentors);

  useEffect(() => {
    dispatch(getAllMentors());
  }, []);
  const cards = mentors.map((article) => (
    <Card
      key={article.title}
      shadow="sm"
      padding="xl"
      p="md"
      radius="md"
      component="a"
      href={`/mentors/${article.id}`}
      className={classes.card}
    >
      <Center>
        <IconUserSquare size={150} color="#9e9e9e" />
      </Center>
      <Text className={classes.title} mt={5}>
        {article.firstname} {article.lastname}
      </Text>
      <Text size="xs" tt="uppercase" fw={600} mt={10}>
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
    </Card>
  ));

  return (
    <div className="container p7">
      <Center>
        <Text size="xl" fw={700}>
          Find your mentor
        </Text>
      </Center>

      <SimpleGrid cols={{ base: 1, sm: 4 }}>{cards}</SimpleGrid>
    </div>
  );
}
