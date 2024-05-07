import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import KeycloakService from "../../services/KeycloakService";
import {
  Anchor,
  Container,
  SegmentedControl,
  Table,
  Text,
  Tabs,
  rem,
} from "@mantine/core";
import { Paper } from "@mantine/core";
import { getUserApplies } from "../../store/slices/applySlice";
import { getMyResumes } from "../../store/slices/resumeSlice";
import { IconArticle } from "@tabler/icons-react";

export default function UserApplies() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const iconStyle = { width: rem(12), height: rem(12) };

  useEffect(() => {
    dispatch(getUserApplies(status));
    dispatch(getMyResumes());
  }, [dispatch, status]);

  const userApplies = useSelector((state) => state.apply.userApplies);
  const resumes = useSelector((state) => state.resume.resumes);

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const INVITED = userApplies.filter((item) => item.status === "INVITED");
  const DECLINED = userApplies.filter((item) => item.status === "DECLINED");
  const APPLIED = userApplies.filter((item) => item.status === "APPLIED");
  const TEST_FAILED = userApplies.filter(
    (item) => item.status === "TEST_FAILED"
  );

  const rows = (applies) =>
    applies.map((row) => {
      const resume = resumes.find((item) => item.id === row.resumeId);
      const resumePosition = resume ? resume.position : "Unknown";
      return (
        <Table.Tr key={row.id}>
          <Table.Td>
            <Text fw={500}>{row.status}</Text>
          </Table.Td>
          <Table.Td>
            <Anchor
              component={Link}
              to={`/vacancies/${row.vacancy.id}`}
              fz="sm"
            >
              {row.vacancy.title}, {row.vacancy.company}
            </Anchor>
          </Table.Td>
          <Table.Td>
            <Anchor component={Link} to={`/resumes/${row.resumeId}`} fz="sm">
              {resumePosition}
            </Anchor>
          </Table.Td>
          <Table.Td>
            <Text fw={500}>{row.appliedAt.split("T")[0]}</Text>
          </Table.Td>
        </Table.Tr>
      );
    });

  return (
    <main>
      <Container size="lg" py="xl" className="backgroundBlue">
        <Text size="lg" c="blue" p={20}>
          My Applies
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
            <Tabs.Tab
              value="TEST_FAILED"
              leftSection={<IconArticle style={iconStyle} />}
            >
              Test failed
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
                            <Text fw={700}>Status</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Vacancy</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Resume</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Date</Text>
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
                            <Text fw={700}>Status</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Vacancy</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Resume</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Date</Text>
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
                            <Text fw={700}>Status</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Vacancy</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Resume</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Date</Text>
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

          <Tabs.Panel value="TEST_FAILED">
            <Paper shadow="md" radius="lg">
              <div className="p3">
                <div className="ml1">
                  <Table.ScrollContainer minWidth={600} className="mb20">
                    <Table verticalSpacing="xs" className="w-full">
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>
                            <Text fw={700}>Status</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Vacancy</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Resume</Text>
                          </Table.Th>
                          <Table.Th>
                            <Text fw={700}>Date</Text>
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows(TEST_FAILED)}</Table.Tbody>
                    </Table>
                  </Table.ScrollContainer>
                </div>
              </div>
            </Paper>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </main>
  );
}
