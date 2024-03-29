import { Container, Title, Text } from "@mantine/core";
import MyResume from "./myresume/MyResume";
import classes from "./MyResumes.module.css";

export default function MyResumes({ resumes }) {
  const showResumes =
    resumes && resumes.length > 0 ? (
      resumes.map((item) => <MyResume item={item} key={item.id} />)
    ) : (
      <Container className={classes.root}>
        <Title className={classes.title}>There is no resumes.</Title>
        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
          You do not have any resumes, create a resume by clicking on the button
          "Create Resume".
        </Text>
      </Container>
    );
  return <div>{showResumes}</div>;
}
