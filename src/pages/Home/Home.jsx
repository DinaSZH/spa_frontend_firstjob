import React from "react";
import Header from "../../components/header/Header";
import homeLogo from "../../assets/images/homePhoto.png";
import KeycloakService from "../../services/KeycloakService";
import {
  Overlay,
  Container,
  Title,
  Button,
  Text,
  SimpleGrid,
  rem,
  ThemeIcon,
} from "@mantine/core";
import classes from "./Home.module.css";
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
} from "@tabler/icons-react";
// import { Footer } from "../../components/footer/Footer";

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: "Extreme performance",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
  },
  {
    icon: IconUser,
    title: "Privacy focused",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
  },
  {
    icon: IconCookie,
    title: "No third parties",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
  },
  {
    icon: IconLock,
    title: "Secure by default",
    description:
      "Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right",
  },
  {
    icon: IconMessage2,
    title: "24/7 Support",
    description:
      "Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail",
  },
];

export function Feature({ icon: Icon, title, description }) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

const Home = () => {
  const features = MOCKDATA.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));
  return (
    <div>
      <Container size="xl">
        <div className={classes.hero}>
          <Overlay
            gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
            opacity={1}
            zIndex={0}
          />
          <Container className={classes.container} size="md">
            <Title className={classes.title}>
              A fully featured First Job project
            </Title>
            <Text className={classes.description} size="xl" mt="xl">
              Build fully functional accessible web applications faster than
              ever – Mantine includes more than 120 customizable components and
              hooks to cover you in any situation
            </Text>

            <Button
              variant="gradient"
              size="xl"
              radius="xl"
              className={classes.control}
            >
              Get started
            </Button>
          </Container>
        </div>

        <Container className={classes.wrapper}>
          <Title className={classes.titleSecond}>
            Integrate effortlessly with any technology stack
          </Title>

          <Container size={560} p={0}>
            <Text size="sm" className={classes.descriptionSecond}>
              Every once in a while, you’ll see a Golbat that’s missing some
              fangs. This happens when hunger drives it to try biting a
              Steel-type Pokémon.
            </Text>
          </Container>

          <SimpleGrid
            mt={60}
            cols={{ base: 1, sm: 2, md: 3 }}
            spacing={{ base: "xl", md: 50 }}
            verticalSpacing={{ base: "xl", md: 50 }}
          >
            {features}
          </SimpleGrid>
        </Container>
        {/* <Footer /> */}
      </Container>
      <div className="container">
        <div className="home-block">
          <div>
            <h1>First Job</h1>
            <p>Job for everyone</p>
            <div>
              <button className="button">Search</button>
            </div>
          </div>

          <div>
            <img className="homePhoto" src={homeLogo} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
