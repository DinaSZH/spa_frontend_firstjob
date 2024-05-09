import React, { useRef, useState } from "react";
import parse from "html-react-parser";
import {
  Image,
  Container,
  Text,
  Button,
  SimpleGrid,
  Group,
  Modal,
  Center,
  Input,
  Space,
  Divider,
  FileButton,
  Skeleton,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../NotFound/NotFound.module.css";
import { useEffect } from "react";
import {
  createNews,
  deleteNewsById,
  getAllNews,
} from "../../store/slices/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextEditor } from "../../components/TextEditor/TextEditor";
import KeycloakService from "../../services/KeycloakService";
import { Toaster, toast } from "react-hot-toast";

export function News() {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const allNews = useSelector((state) => state.news.allNews);
  const { error, loading, success } = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(getAllNews());
  }, []);

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const resetRef = useRef(null);

  const updateFormValidity = () => {
    const isValid = company && title && text && image;

    setIsFormValid(isValid);
  };

  useEffect(() => {
    updateFormValidity();
  }, [company, title, text, image]);

  const clearFile = () => {
    setImage(null);
    resetRef.current?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("company", company);

    try {
      try {
        await dispatch(createNews(formData));
        toast.success("News created successfully!");
        dispatch(getAllNews());
        close();
      } catch (error) {
        toast.error(
          "Error when creating news, please contact technical support!"
        );
      }
    } catch (error) {
      setError("Error creating news, try again");
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      await dispatch(deleteNewsById(id));
      toast.success("News deleted successfully!");
      dispatch(getAllNews());
    } catch (error) {
      toast.error(
        "Error when deleting news, please contact technical support!"
      );
    }
  };

  const handleImageChange = (file) => {
    setImage("image", file);
    setImage(file);
  };

  return (
    <Container size="lg" py="xl">
      {KeycloakService.getHRRole() && (
        <Button onClick={open} className="mb20">
          Add news
        </Button>
      )}

      <Text className={classes.title}>News</Text>
      {loading ? (
        <>
          <Skeleton height={340} mb="xl" />
          <Skeleton height={340} mb="xl" />
          <Skeleton height={340} mb="xl" />
        </>
      ) : (
        allNews &&
        allNews.map((item) => (
          <React.Fragment key={item.id}>
            {KeycloakService.getEmail() === item.author && (
              <Flex
                mih={50}
                justify="flex-end"
                align="center"
                direction="row"
                wrap="wrap"
                gap="md"
              >
                <Text c="dimmed">You created this news</Text>
                <Button
                  color="red"
                  variant="outline"
                  onClick={() => handleDeleteNews(item.id)}
                >
                  Delete
                </Button>
              </Flex>
            )}
            <SimpleGrid
              onClick={() => navigate(`/news/${item.id}`)}
              spacing={{ base: 20, sm: 30 }}
              cols={{ base: 1, sm: 2 }}
              className={classes.card}
            >
              <Image src={item.imageUrl} className={classes.mobileImage} />
              <Image
                style={{ height: "300px", objectFit: "contain" }}
                src={item.imageUrl}
                className={classes.desktopImage}
              />
              <div>
                <Group justify="space-between" gap="xs">
                  <Text fw={700} size="xl">
                    {item.title}
                  </Text>
                </Group>
                <div  style={{ maxWidth: "529px", maxHeight: "200px", overflow: "hidden",  textOverflow: "ellipsis" }}>{parse(item.text)}</div>
                <Text c="blue" fs="italic">...open to read full article</Text>
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
            <Divider my="md" />
            <Space h="xs" />
          </React.Fragment>
        ))
      )}

      <Toaster />

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

        <Text fw={400} color="red" size="md" mt="sm">
          * Fill all required fields
        </Text>
        <Input.Wrapper size="md" label="Company name" required>
          <Input
            placeholder="Enter company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </Input.Wrapper>
        <Space h="md" />
        <Input.Wrapper size="md" label="Title" required>
          <Input
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Input.Wrapper>

        <Space h="md" />
        <Input.Wrapper size="md" label="Text" required>
          <TextEditor value={text} setValue={setText} />
        </Input.Wrapper>

        <Space h="md" />

        <Text fw={600} size="md" mb="sm" required>
          Upload news image
        </Text>
        <Group>
          <FileButton
            resetRef={resetRef}
            onChange={handleImageChange}
            accept="image/png,image/jpeg,image/jpg"
            required
          >
            {(props) => (
              <Button variant="outline" {...props}>
                Upload image
              </Button>
            )}
          </FileButton>
          <Button disabled={!image} color="red" onClick={clearFile}>
            Reset
          </Button>
        </Group>

        {image && (
          <Text size="sm" mt="sm">
            Picked image: {image.name}
          </Text>
        )}
        <Space h="lg" />

        {error > 0 && (
          <>
            <Text size="md" fw={700} c="red">
              {error}
            </Text>
            <Space h="lg" />
          </>
        )}

        <Button onClick={handleSubmit} size="md" disabled={!isFormValid}>
          Upload
        </Button>
        <Space h="md" />
      </Modal>
    </Container>
  );
}
