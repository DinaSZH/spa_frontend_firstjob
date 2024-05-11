import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "../../assets/images/user-icon.webp";
import KeycloakService from "../../services/KeycloakService";
import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  Loader,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { getProfile } from "../../store/slices/profileSlice";
import RenderOnAuthenticated from "../../helpers/RenderOnAuthenticated";
import {
  IconCalendar,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, loading} = useSelector((state) => state.profile);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  

  return (
    <RenderOnAuthenticated>
      <main>
        <Container size="lg" py="xl">
          <Group justify="flex-end">
            <Button
              onClick={() => navigate("/profile/edit")}
              variant="filled"
              color="rgba(51, 44, 44, 1)"
              mb={10}
            >
              Edit profile
            </Button>
          </Group>
          <Paper
            mih={500}
            mt={20}
            radius="md"
            withBorder
            p="lg"
            color="#228BE6"
            shadow="xs"
          >
            {loading ? (
              <Center h={500}>
                <Loader color="blue" size={100} />
              </Center>
            ) : (
              <Flex
                gap="lg"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                <div>
                  <img className="usernameImage" src={user} alt="logo" />
                </div>

                <div>
                  <Title order={2}>Profile Information</Title>
                  <h3 className="text">{`${profile?.firstname} ${profile?.lastname}`}</h3>

                  <Divider my="md" />

                  <div className="backgroundBlock">
                    <div className="flex resume-title">
                      <Title order={2}>Personal Details</Title>
                    </div>
                    <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
                      <IconMail /> {profile?.email}
                    </Text>
                    <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
                      <IconPhone /> {profile?.phone}
                    </Text>
                    <Text c="dimmed" className="flex flex-ai-c gap10" mt={10}>
                      <IconCalendar /> {profile?.birthdate}
                    </Text>
                  </div>
                </div>
              </Flex>
            )}
          </Paper>
        </Container>
      </main>
    </RenderOnAuthenticated>
  );
}
