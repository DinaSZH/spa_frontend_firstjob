import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import KeycloakService from "../../services/KeycloakService";
import {
  Anchor,
  Button,
  Container,
  Group,
  rem,
  Loader,
  SegmentedControl,
  Table,
  Tabs,
  Text,
} from "@mantine/core";
import { Paper } from "@mantine/core";
import { getProfile } from "../../store/slices/profileSlice";
import Applies from "../../components/Applies/Applies";
import {
  declineApply,
  getVacancyApplies,
  inviteApply,
} from "../../store/slices/applySlice";
import classes from "./HrApplies.module.css";
import toast, { Toaster } from "react-hot-toast";
import { IconArticle } from "@tabler/icons-react";

export default function HrApplies() {
  const dispatch = useDispatch();
  const iconStyle = { width: rem(12), height: rem(12) };

  const { id } = useParams();
  useEffect(() => {
    dispatch(getVacancyApplies(id));
  }, []);

  const applies = useSelector((state) => state.apply.applies);
  const INVITED = applies.filter((item) => item.applyStatus === "INVITED");
  const DECLINED = applies.filter((item) => item.applyStatus === "DECLINED");
  const APPLIED = applies.filter((item) => item.applyStatus === "APPLIED");

  const rows = (applies) =>
    applies.map((row) => (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Anchor component={Link} to={`/vacancies/${row.vacancy.id}`} fz="sm">
            {row.vacancy.title}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Text fw={500}>{row.email}</Text>
        </Table.Td>
        <Table.Td>
          <Text fw={500}>
            {row.firstname} {row.lastname}
          </Text>
        </Table.Td>
        <Table.Td>
          <Anchor component={Link} to={`/resumes/${row.resumeId}`} fz="sm">
            {row.position}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Group gap={10} justify="flex-end">
            <Button
              variant="filled"
              size="xs"
              color="green"
              onClick={() => {
                dispatch(inviteApply(row.id)).then(() => {
                  toast.success("Invitation sent!");
                });
              }}
            >
              Invite
            </Button>
            <Button
              variant="filled"
              size="xs"
              color="red"
              onClick={() => {
                dispatch(declineApply(row.id)).then(() => {
                  toast.success("Decline sent!");
                });
              }}
            >
              Decline
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <main>
      <Container size="lg" py="xl" className="backgroundBlue">
        <Text size="lg" c="blue" p={20}>
          My HR Applies
        </Text>
        <Tabs defaultValue="APPLIED">
          <Tabs.List>
            <Tabs.Tab
              value="APPLIED"
              leftSection={<IconArticle style={iconStyle} />}
            >
              All applies
            </Tabs.Tab>
            <Tabs.Tab
              value="INVITED"
              leftSection={<IconArticle style={iconStyle} />}
            >
              Invited
            </Tabs.Tab>
            <Tabs.Tab
              value="DECLINED"
              leftSection={<IconArticle style={iconStyle} />}
            >
              Declined
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="APPLIED">
            <Paper shadow="md" radius="lg">
              <div className="p3">
                <div className="ml1">
                  <Table.ScrollContainer minWidth={600} className="mb20">
                    <Table verticalSpacing="xs" className="w-full">
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>
                            <Text fw={700}>Vacancy</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Email</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Username</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Resume</Text>
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows(APPLIED)}</Table.Tbody>
                    </Table>
                  </Table.ScrollContainer>
                </div>
              </div>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="INVITED">
            <Paper shadow="md" radius="lg">
              <div className="p3">
                <div className="ml1">
                  <Table.ScrollContainer minWidth={600} className="mb20">
                    <Table verticalSpacing="xs" className="w-full">
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>
                            <Text fw={700}>Vacancy</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Email</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Username</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Resume</Text>
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows(INVITED)}</Table.Tbody>
                    </Table>
                  </Table.ScrollContainer>
                </div>
              </div>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="DECLINED">
            <Paper shadow="md" radius="lg">
              <div className="p3">
                <div className="ml1">
                  <Table.ScrollContainer minWidth={600} className="mb20">
                    <Table verticalSpacing="xs" className="w-full">
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>
                            <Text fw={700}>Vacancy</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Email</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Username</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Resume</Text>
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows(DECLINED)}</Table.Tbody>
                    </Table>
                  </Table.ScrollContainer>
                </div>
              </div>
            </Paper>
          </Tabs.Panel>
        </Tabs>
        <Toaster />
      </Container>
    </main>
  );
}
