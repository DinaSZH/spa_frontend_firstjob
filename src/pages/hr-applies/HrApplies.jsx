import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Anchor,
  Button,
  Container,
  Group,
  rem,
  Table,
  Tabs,
  Text,
} from "@mantine/core";
import { Paper } from "@mantine/core";
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

  const { applies, success } = useSelector((state) => state.apply);
  const INVITED = applies.filter((item) => item.applyStatus === "INVITED");
  const DECLINED = applies.filter((item) => item.applyStatus === "DECLINED");
  const APPLIED = applies.filter((item) => item.applyStatus === "APPLIED");

  useEffect(() => {
    dispatch(getVacancyApplies(id));
  }, []);

  useEffect(() => {
    dispatch(getVacancyApplies(id));
  }, [applies.applyStatus]);

  const handleInviteApply = async (applyId) => {
    try {
      await dispatch(inviteApply(applyId));
      toast.success("Invitation sent!");
      dispatch(getVacancyApplies(id));
    } catch (error) {
      toast.error("Error inviting apply!");
    }
  };

  const handleDeclineApply = async (applyId) => {
    try {
      await dispatch(declineApply(applyId));
      toast.success("Decline sent successfully!");
      dispatch(getVacancyApplies(id));
    } catch (error) {
      toast.error("Error declining apply!");
    }
  };

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
            {row.applyStatus !== "INVITED" && (
              <Button
                variant="filled"
                size="xs"
                color="green"
                onClick={() => handleInviteApply(row.id)}
              >
                Invite
              </Button>
            )}
            { row.applyStatus !== "DECLINED" && (
              <Button
                variant="filled"
                size="xs"
                color="red"
                onClick={() => handleDeclineApply(row.id)}
              >
                Decline
              </Button>
            )}
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
