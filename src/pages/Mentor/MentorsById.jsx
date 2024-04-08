import { Image, Container, Title, Text, Space, Paper } from "@mantine/core";
import classes from "../NotFound/NotFound.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMentorsById } from "../../store/slices/mentorSlice";
import {
  IconBrandTelegram,
  IconBuildingBroadcastTower,
  IconCoin,
  IconFileDescription,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";

export function MentorsById() {
  const mentor = useSelector((state) => state.mentor.mentor);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getMentorsById(id));
  }, []);
  return (
    <Container className="container p7">
      <Paper radius="md" withBorder p="lg" color="#228BE6" shadow="xs">
        <Text className={classes.title} mt={5}>
          {" "}
          {mentor.firstname} {mentor.lastname}
        </Text>
        <Text mt={5} size="lg">
          {mentor.position}, {mentor.company}
        </Text>
        <Space h="xs" />
        <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
          <IconMapPin />
          <span style={{ color: "black" }}>
            {mentor.city}, {mentor.country}{" "}
          </span>
        </Text>
        <Space h="xs" />
        <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
          <IconBrandTelegram /> Telegram:{" "}
          <span style={{ color: "black" }}>{mentor.telegramLink}</span>
        </Text>
        <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
          <IconMail /> Email:{" "}
          <span style={{ color: "black" }}>{mentor.email}</span>
        </Text>
        <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
          <IconCoin /> Cost:{" "}
          <span style={{ color: "black" }}>
            {mentor.cost} {mentor.currency}
          </span>
        </Text>
        <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
          <IconBuildingBroadcastTower /> Format:{" "}
          <span style={{ color: "black" }}>{mentor.format}</span>
        </Text>
        <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
          <IconFileDescription /> Experience:{" "}
          <span style={{ color: "black" }}> {mentor.experience}</span>
        </Text>
        <Space h="xs" />
        <Text mt={5} fw={700} size="xl">
          About me:
        </Text>
        <Text mt={5} size="lg">
          {mentor.about}
        </Text>
        <Space h="xs" />
      </Paper>
    </Container>
  );
}
