import {
  Image,
  Container,
  Text,
  Space,
  Paper,
  Center,
  Loader,
  Button,
} from "@mantine/core";
import parse from "html-react-parser";
import classes from "../NotFound/NotFound.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNewsById } from "../../store/slices/newsSlice";
import { useNavigate, useParams } from "react-router-dom";
export function NewsById() {
  const { newsId, loading } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getNewsById(id));
  }, []);
  return (
    <Container className="container p7">
      <Button
        onClick={() => navigate("/news")}
        variant="filled"
        color="rgba(61, 61, 61, 1)"
        className="mb20"
      >
        Back
      </Button>
      {loading ? (
        <>
          <Center h={500}>
            <Loader color="blue" size={100} />
          </Center>
        </>
      ) : (
        <Paper radius="md" withBorder p="lg" color="#228BE6" shadow="xs">
          <Image src={newsId.imageUrl} className={classes.mobileImage} />
          <Image src={newsId.imageUrl} className={classes.desktopImage} />
          <Text className={classes.title}>{newsId.title}</Text>
          <Space h="xs" />
          <Text c="dimmed">
            Created at: {newsId.createdAt ? newsId.createdAt.split("T")[0] : ""}
          </Text>
          <Space h="xs" />
          <div>{parse(String(newsId.text))}</div>
          <Space h="xs" />
          <Text c="blue">
            {newsId.author}, {newsId.company}
          </Text>
          <Space h="xs" />
        </Paper>
      )}
    </Container>
  );
}
