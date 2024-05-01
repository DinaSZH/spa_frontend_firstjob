import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import KeycloakService from "../../services/KeycloakService";
import {
  Anchor,
  Button,
  Group,
  Loader,
  SegmentedControl,
  Table,
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

export default function HrApplies() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("NEW");
  const [inviteStatus, setInviteStatus] = useState(false);
  const [declineStatus, setDeclineStatus] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getVacancyApplies(id));
  }, []);

  const applies = useSelector((state) => state.apply.applies);

  const filteredApplies = applies.filter((item) => item.status === status);

  const rows = applies.map((row) => {
    return (
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
                setInviting(true);
                dispatch(inviteApply(row.id)).then(() => {
                  setInviting(false);
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
                setInviting(true);
                dispatch(declineApply(row.id)).then(() => {
                  setDeclineStatus(false);
                  toast.success("Invitation sent!");
                });
              }}
            >
              Decline
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <main>
      <div className="container p7 backgroundBlue mt7">
        <Text size="lg" c="blue" className="mb20">
          <p>My HR Applies</p>
        </Text>

        <Paper shadow="md" radius="lg">
          <div className="p3">
            <div className="ml1">
              <Text fz="lg" fw={700} className={classes.title}>
                Users apply
              </Text>
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
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </div>
          </div>
        </Paper>
      </div>
    </main>
  );
}
