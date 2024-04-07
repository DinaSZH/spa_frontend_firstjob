import React from "react";

import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Group,
  Modal,
  Center,
  Input,
  Space,
  Divider,
  FileInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../NotFound/NotFound.module.css";
import { useEffect } from "react";
import { getAllNews } from "../../store/slices/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { TextEditor } from "../../components/TextEditor/TextEditor";

export function News() {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const allNews = useSelector((state) => state.news.allNews);
  useEffect(() => {
    dispatch(getAllNews());
  }, []);

  return (
    <Container className="container p7">
      <Button onClick={open} className="mb20">
        Add news
      </Button>
      <Text className={classes.title}>Новости</Text>
      {allNews &&
        allNews.map((item) => (
          <React.Fragment key={item.id}>
            <NavLink
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/news/${item.id}`}
            >
              <SimpleGrid
                spacing={{ base: 20, sm: 30 }}
                cols={{ base: 1, sm: 2 }}
              >
                <Image src={item.imageUrl} className={classes.mobileImage} />
                <Image src={item.imageUrl} className={classes.desktopImage} />
                <div>
                  <Group justify="space-between" gap="xs">
                    <Text fw={700} size="xl">
                      {item.title}
                    </Text>
                  </Group>
                  <Text size="lg">{item.text}</Text>
                  <div className="mb10"></div>
                  <Text c="dimmed">
                    Created at:{" "}
                    {item.createdAt ? item.createdAt.split("T")[0] : ""}
                  </Text>

                  <Group gap="xs">
                    <Text c="blue">Author: {item.author}</Text>
                    <Text c="blue">Company: {item.company}</Text>
                  </Group>
                </div>
              </SimpleGrid>
            </NavLink>
            <Divider my="md" />
            <Space h="xs" />
          </React.Fragment>
        ))}

      <Modal
        opened={opened}
        onClose={close}
        title="Create news"
        size="70%"
        centered
      >
        <Center>
          <Text size="xl" fw={700} c="blue">
            Upload news
          </Text>
        </Center>
        <Input.Wrapper
          size="md"
          label="Company name"
          // description="Input description"
          // error="Input error"
        >
          <Input placeholder="Enter company" />
        </Input.Wrapper>
        <Space h="md" />
        <Input.Wrapper
          size="md"
          label="Title"
          // description="Input description"
          // error="Input error"
        >
          <Input placeholder="Enter title" />
        </Input.Wrapper>

        <Space h="md" />
        <Input.Wrapper size="md" label="Text">
          <TextEditor />
        </Input.Wrapper>

        <Space h="md" />
        <FileInput
          accept="image/png,image/jpeg"
          label="Upload image"
          placeholder="Upload image"
        />
        <Space h="md" />
        <Button size="md">Upload</Button>
        <Space h="md" />
      </Modal>
    </Container>
  );
}
