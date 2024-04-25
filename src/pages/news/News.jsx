import React, { useRef, useState } from "react";

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
  FileButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../NotFound/NotFound.module.css";
import { useEffect } from "react";
import { createNews, getAllNews } from "../../store/slices/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { TextEditor } from "../../components/TextEditor/TextEditor";
import { useForm } from "@mantine/form";
import KeycloakService from "../../services/KeycloakService";

export function News() {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const allNews = useSelector((state) => state.news.allNews);
  useEffect(() => {
    dispatch(getAllNews());
  }, []);

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const resetRef = useRef(null);

  // const { form, values, errors, setFieldValue } = useForm({
  //   initialValues: {
  //     company: "",
  //     title: "",
  //     text: "",
  //     image: null,
  //   },
  //   validation: {
  //     company: (value) =>
  //       value.length < 2 ? "Company must have at least 2 letters" : null,
  //     title: (value) =>
  //       value.length < 2 ? "Title must have at least 2 letters" : null,
  //     text: (value) =>
  //       value.length < 2 ? "Text must have at least 2 letters" : null,
  //     image: (value) => (!value ? "Image is required" : null),
  //   },
  // });

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
      dispatch(createNews(formData));
      close();
    } catch (error) {
      setError("Error creating news, try again");
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
        {/* <form onSubmit={handleSubmit}> */}
        <Input.Wrapper
          size="md"
          label="Company name"
          required
          // error={errors.company}
        >
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
        <Group>
          <FileButton
            resetRef={resetRef}
            onChange={handleImageChange} // Pass handleImageChange directly
            accept="image/png,image/jpeg,image/jpg"
            required
            // error={errors.image}
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

        {error.length > 0 && (
          <>
            <Text size="md" fw={700} c="red">
              {error}
            </Text>
            <Space h="lg" />
          </>
        )}
        <Button onClick={handleSubmit} size="md">
          Upload
        </Button>
        {/* </form> */}

        <Space h="md" />
      </Modal>
    </Container>
  );
}

// export function News() {
//   const [opened, { open, close }] = useDisclosure(false);
//   const dispatch = useDispatch();
//   const allNews = useSelector((state) => state.news.allNews);
//   useEffect(() => {
//     dispatch(getAllNews());
//   }, []);
//   const [file, setFile] = useState(null);

//   const resetRef = useRef(null);

//   const clearFile = () => {
//     setFile(null);
//     resetRef.current?.();
//   };

//   const form = useForm({
//     mode: "uncontrolled",
//     initialValues: { comany: "", title: "", text: "", image: "" },

//     // functions will be used to validate values at corresponding key
//     validate: {
//       comany: (value) =>
//         value.length < 2 ? "Comany must have at least 2 letters" : null,
//       title: (value) =>
//         value.length < 2 ? "Title must have at least 2 letters" : null,
//       text: (value) =>
//         value.length < 2 ? "Text must have at least 2 letters" : null,
//       image: (value) =>
//         value.length < 2 ? "Image must have at least 2 letters" : null,
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", form.values.image);
//     formData.append("title", form.values.title);
//     formData.append("text", form.values.text);
//     formData.append("company", form.values.company);

//     dispatch(createNews(formData));
//   };

//   return (
//     <Container size="lg" py="xl">
//       <Button onClick={open} className="mb20">
//         Add news
//       </Button>
//       <Text className={classes.title}>News</Text>
//       {allNews &&
//         allNews.map((item) => (
//           <React.Fragment key={item.id}>
//             <NavLink
//               style={{ textDecoration: "none", color: "inherit" }}
//               to={`/news/${item.id}`}
//             >
//               <SimpleGrid
//                 spacing={{ base: 20, sm: 30 }}
//                 cols={{ base: 1, sm: 2 }}
//                 className={classes.card}
//               >
//                 <Image src={item.imageUrl} className={classes.mobileImage} />
//                 <Image src={item.imageUrl} className={classes.desktopImage} />
//                 <div>
//                   <Group justify="space-between" gap="xs">
//                     <Text fw={700} size="xl">
//                       {item.title}
//                     </Text>
//                   </Group>
//                   <Text size="lg">{item.text}</Text>
//                   <div className="mb10"></div>
//                   <Text c="dimmed">
//                     Created at:{" "}
//                     {item.createdAt ? item.createdAt.split("T")[0] : ""}
//                   </Text>

//                   <Group gap="xs">
//                     <Text c="blue">Author: {item.author}</Text>
//                     <Text c="blue">Company: {item.company}</Text>
//                   </Group>
//                 </div>
//               </SimpleGrid>
//             </NavLink>
//             <Divider my="md" />
//             <Space h="xs" />
//           </React.Fragment>
//         ))}

//       <Modal
//         opened={opened}
//         onClose={close}
//         title="Create news"
//         size="70%"
//         centered
//       >
//         <Center>
//           <Text size="xl" fw={700} c="blue">
//             Upload news
//           </Text>
//         </Center>
//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <Input.Wrapper
//             size="md"
//             label="Company name"
//             required
//             // description="Input description"
//             // error="Input error"
//           >
//             <Input placeholder="Enter company" />
//           </Input.Wrapper>
//           <Space h="md" />
//           <Input.Wrapper
//             size="md"
//             label="Title"
//             required
//             // description="Input description"
//             // error="Input error"
//           >
//             <Input placeholder="Enter title" />
//           </Input.Wrapper>

//           <Space h="md" />
//           <Input.Wrapper size="md" label="Text" required>
//             <TextEditor required />
//           </Input.Wrapper>

//           <Space h="md" />
//           <Group>
//             <FileButton
//               resetRef={resetRef}
//               onChange={setFile}
//               accept="image/png,image/jpeg"
//               required
//             >
//               {(props) => (
//                 <Button variant="outline" {...props}>
//                   Upload image
//                 </Button>
//               )}
//             </FileButton>
//             <Button disabled={!file} color="red" onClick={clearFile}>
//               Reset
//             </Button>
//           </Group>

//           {file && (
//             <Text size="sm" mt="sm">
//               Picked file: {file.name}
//             </Text>
//           )}
//           <Space h="lg" />
//           <Button type="submit" size="md">
//             Upload
//           </Button>
//         </form>

//         <Space h="md" />
//       </Modal>
//     </Container>
//   );
// }
