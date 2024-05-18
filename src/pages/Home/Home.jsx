import React from "react";
import {
  Container,
  Title,
  Button,
  Text,
  SimpleGrid,
  rem,
  ThemeIcon,
  Group,
  Accordion,
} from "@mantine/core";
import classes from "./Home.module.css";
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
  IconPlus,
} from "@tabler/icons-react";
import imageHero from "../../assets/images/headerPhoto.avif";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: "Mentoring",
    description:
      "Search for mentors with general information about them (name, stack, work experience). Complete the application form to become a mentor.",
  },
  {
    icon: IconUser,
    title: "Profile",
    description:
      "General information (name, skills, links). Resumes. Certificates. Certification from the platform. Possibility of posting HR vacancies.",
  },
  {
    icon: IconCookie,
    title: "CV builder",
    description:
      "Creating a resume. Possibility to download a resume in PDF format.",
  },
  {
    icon: IconLock,
    title: "Testing",
    description: "HP's ability to set a test to select candidates.",
  },
  {
    icon: IconMessage2,
    title: "News feed",
    description: "Posting news and useful tips by companies",
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

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

const Home = () => {
  const navigate = useNavigate();
  const features = MOCKDATA.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));
  return (
    <div>
      <Container size="xl">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.titleHero}>
              Start your <span className={classes.highlight}>career</span>{" "}
              <br />
              with our web service for beginners
            </Title>
            <Text c="dimmed" mt="md">
              Our web service helps aspiring professionals find work and
              provides companies with access to promising juniors. Create a
              resume, take tests and quickly find suitable vacancies.
            </Text>

            <Group mt={30}>
              <Button
                onClick={() => navigate("/search/vacancy")}
                radius="xl"
                size="md"
                className={classes.controlHero}
              >
                Get started
              </Button>
            </Group>
          </div>
          <img src={imageHero} className={classes.image} />
        </div>

        <Container className={classes.wrapper}>
          <Title className={classes.titleSecond}>
            Master the powerful tools of our platform
          </Title>

          <Container size={560} p={0}>
            <Text size="sm" className={classes.descriptionSecond}>
              Use the unique capabilities of our platform for effective job
              search, training and development of professional skills.
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

        <div className={classes.wrapperFAQ}>
          <Container size="sm">
            <Title ta="center" className={classes.titleFAQ}>
              Frequently Asked Questions
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              chevronSize={26}
              variant="separated"
              disableChevronRotation
              styles={{
                label: { color: "var(--mantine-color-black)" },
                item: { border: 0 },
              }}
              chevron={
                <ThemeIcon
                  radius="xl"
                  className={classes.gradientFAQ}
                  size={26}
                >
                  <IconPlus
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              }
            >
              <Accordion.Item className={classes.itemFAQFAQ} value="register">
                <Accordion.Control>
                  How can I register as a Mentor or HR?
                </Accordion.Control>
                <Accordion.Panel>
                  To register as a mentor or HR, go to the registration page on
                  our website and select the option "Signup Mentor" or "Signup
                  HR". Then fill out the form with the required information.
                  After checking your profile, we will contact you by email for
                  further action.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item
                className={classes.itemFAQFAQ}
                value="vacancy-apply"
              >
                <Accordion.Control>
                  How can I apply for a vacancy?
                </Accordion.Control>
                <Accordion.Panel>
                  If you do not have an account, you must first register on our
                  website. After that, log into your account. As soon as you log
                  in, all functionality intended for users will become
                  available, including the ability to apply for jobs.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.itemFAQ} value="certificate">
                <Accordion.Control>
                  How can I get a certificate from your platform?
                </Accordion.Control>
                <Accordion.Panel>
                  To receive a certificate from our platform, log into your
                  account. In the top menu, find the "Test Platform" section. By
                  going to this page, you can take the tests provided by our
                  platform and add the certificates you earn to your resume.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.itemFAQ} value="techsupport">
                <Accordion.Control>
                  How can I contact technical support in case of problems?
                </Accordion.Control>
                <Accordion.Panel>
                  If you have any problems or questions related to using the
                  platform, you can contact our technical support. To do this,
                  at the bottom of the page you will find our contacts. Feel
                  free to write to us there if you have any problems or
                  questions. We are always ready to help.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Container>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
