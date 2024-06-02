import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Menu,
  Chip,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconClipboardText,
  IconAward,
  IconDatabaseSearch,
  IconBriefcase,
} from "@tabler/icons-react";
import classes from "./Header.module.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeycloakService from "../../services/KeycloakService";
import { IconSettings, IconTrash } from "@tabler/icons-react";
import RenderOnAuthenticated from "../../helpers/RenderOnAuthenticated";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "../../store/slices/profileSlice";

const linksHR = [
  {
    icon: IconClipboardText,
    title: "My Vacancies",
    link: "/vacancies",
  },
  {
    icon: IconCode,
    title: "Create vacancy",
    link: "/create-vacancy",
  },
  {
    icon: IconNotification,
    title: "HR applies",
    link: "/applies/hr",
  },
  {
    icon: IconDatabaseSearch,
    title: "Resume Database",
    link: "/allResumes",
  },
  {
    icon: IconAward,
    title: "My Tests",
    link: "/tests",
  },
  {
    icon: IconAward,
    title: "Create Test",
    link: "/create-test",
  },
];

const linksUser = [
  {
    icon: IconCode,
    title: "My Resumes",
    link: "/resumes",
  },
  {
    icon: IconBook,
    title: "Create resume",
    link: "/create-resume",
  },
  {
    icon: IconChartPie3,
    title: "Applies",
    link: "/applies",
  },
  {
    icon: IconAward,
    title: "My Certifications",
    link: "/user/certifications",
  },
];

const linksMentor = [
  {
    icon: IconCode,
    title: "Mentor profile",
    link: "/profile/mentor",
  },
];

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(KeycloakService.isLoggedIn());
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    const updateAuthenticationStatus = () => {
      setIsLoggedIn(KeycloakService.isLoggedIn());
    };

    KeycloakService.getKeycloak().onAuthSuccess = updateAuthenticationStatus;

    return () => {
      KeycloakService.getKeycloak().onAuthSuccess = null;
    };
  }, [isLoggedIn]);

  const createUserProfile = () => {
    dispatch(createProfile());
    navigate("/profile");
  };
  const isHR = KeycloakService.getHRRole();
  const isMentor = KeycloakService.getMentorRole();
  let linksSelected;

  if (isHR) {
    linksSelected = linksHR;
  } else if (isMentor) {
    linksSelected = linksMentor;
  } else {
    linksSelected = linksUser;
  }

  const links = linksSelected.map((item) => (
    <div
      onClick={() => {
        closeDrawer();
        navigate(`${item.link}`);
      }}
      className={classes.link}
    >
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon
              style={{ width: rem(22), height: rem(22) }}
              color={theme.colors.blue[6]}
            />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </div>
  ));

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to="/" className="flex flex-ai-c flex-jc-c">
            <Badge color="blue" size="lg">
              <span className="flex flex-ai-c flex-jc-c gap10">
                <p>FirstJob</p> <IconBriefcase size="20px" />
              </span>
            </Badge>
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/search/vacancy" className={classes.link}>
              Vacancies
            </Link>
            <RenderOnAuthenticated>
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Features
                      </Box>
                      <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.blue[6]}
                      />
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                  <Group justify="space-between" px="md">
                    <Text fw={500}>Features</Text>
                  </Group>

                  <Divider my="sm" />

                  <SimpleGrid cols={2} spacing={0}>
                    {links.map((link, index) => (
                      <div key={index}>{link}</div>
                    ))}
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
            </RenderOnAuthenticated>
            <Link to="/news" className={classes.link}>
              News
            </Link>
            <Link to="/mentors" className={classes.link}>
              Mentorship
            </Link>
            {isLoggedIn && (
              <Link to="/platform/tests" className={classes.link}>
                Test Platform
              </Link>
            )}
          </Group>

          <Group visibleFrom="sm">
            {!isLoggedIn && (
              <div className="flex gap">
                <Button
                  variant="default"
                  onClick={() => KeycloakService.doLogin()}
                  className="button no-mr"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="button no-mr"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {isLoggedIn && (
              <>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button>{KeycloakService.getUsername()}</Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Menu</Menu.Label>
                    {profile && (
                      <Menu.Item
                        onClick={() => navigate("/profile")}
                        leftSection={
                          <IconSettings
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Profile
                      </Menu.Item>
                    )}
                    {!profile && (
                      <Menu.Item
                        onClick={createUserProfile}
                        leftSection={
                          <IconSettings
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        Create profile
                      </Menu.Item>
                    )}

                    <Menu.Divider />
                    <Menu.Item
                      onClick={() =>
                        KeycloakService.doLogout({
                          redirectUri: "https://firstjob.space",
                        })
                      }
                      color="red"
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Logout account
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <div
            onClick={() => {
              closeDrawer();
              navigate("/");
            }}
            className={classes.link}
          >
            Home
          </div>
          <div
            onClick={() => {
              closeDrawer();
              navigate("/search/vacancy");
            }}
            className={classes.link}
          >
            Vacancies
          </div>
          <RenderOnAuthenticated>
            <UnstyledButton
              className={classes.link}
              onClick={toggleLinks}
              ml={20}
            >
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
          </RenderOnAuthenticated>
          <div
            onClick={() => {
              navigate("/news");
              closeDrawer();
            }}
            className={classes.link}
          >
            News
          </div>
          <div
            onClick={() => {
              closeDrawer();
              navigate("/mentors");
            }}
            className={classes.link}
          >
            Mentorship
          </div>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {!isLoggedIn && (
              <div className="flex gap">
                <Button
                  variant="default"
                  onClick={() => KeycloakService.doLogin()}
                  className="button no-mr"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="button no-mr"
                >
                  Sign Up
                </Button>
              </div>
            )}
            {isLoggedIn && (
              <>
                {profile && (
                  <Button
                    onClick={() => {
                      closeDrawer();
                      navigate("/profile");
                    }}
                    className="button no-mr"
                  >
                    Profile
                  </Button>
                )}

                {!profile && (
                  <Button onClick={createUserProfile} className="button no-mr">
                    Create profile
                  </Button>
                )}
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
