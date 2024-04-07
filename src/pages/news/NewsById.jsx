import { Image, Container, Title, Text, Space, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import image from "../../assets/images/404.svg";
import classes from "../NotFound/NotFound.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNewsById } from "../../store/slices/newsSlice";
import { useParams } from "react-router-dom";
export function NewsById() {
  const newsId = useSelector((state) => state.news.newsId);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getNewsById(id));
  }, []);
  return (
    <Container className="container p7">
      <Paper radius="md" withBorder p="lg" color="#228BE6" shadow="xs">
        <Image src={newsId.imageUrl} className={classes.mobileImage} />
        <Image src={newsId.imageUrl} className={classes.desktopImage} />
        <Text className={classes.title}>{newsId.title}</Text>
        <Space h="xs" />
        <Text c="dimmed">
          Created at: {newsId.createdAt ? newsId.createdAt.split("T")[0] : ""}
        </Text>
        <Space h="xs" />
        <Text size="lg">{newsId.text}</Text>
        <Space h="xs" />
        <Text c="blue">
          {newsId.author}, {newsId.company}
        </Text>
        <Space h="xs" />
      </Paper>
    </Container>
  );
}
