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
import { getUserApplies } from "../../store/slices/applySlice";
import classes from "./UserApplies.module.css";
import { getMyResumes } from "../../store/slices/resumeSlice";

const data = [
  {
    title: "Foundation",
    author: "Isaac Asimov",
    reviews: { positive: 2223, negative: 259 },
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    reviews: { positive: 5677, negative: 1265 },
  },
  {
    title: "Solaris",
    author: "Stanislaw Lem",
    year: 1961,
    reviews: { positive: 3487, negative: 1845 },
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    reviews: { positive: 8576, negative: 663 },
  },
  {
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    year: 1969,
    reviews: { positive: 6631, negative: 993 },
  },
  {
    title: "A Scanner Darkly",
    author: "Philip K Dick",
    year: 1977,
    reviews: { positive: 8124, negative: 1847 },
  },
];

export default function UserApplies() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getUserApplies(status));
    dispatch(getMyResumes());
  }, [dispatch, status]);

  const userApplies = useSelector((state) => state.apply.userApplies);
  const resumes = useSelector((state) => state.resume.resumes);

  const filteredApplies = userApplies.filter((item) => item.status === status);
  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const rows = userApplies.map((row) => {
    const resume = resumes.find((item) => item.id === row.resumeId);
    const resumePosition = resume ? resume.position : "Unknown";
    return (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Text fw={500}>{row.status}</Text>
        </Table.Td>
        <Table.Td>
          <Anchor component={Link} to={`/vacancies/${row.vacancy.id}`} fz="sm">
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
      <div className="container p7 backgroundBlue mt7">
        <Text size="lg" c="blue" className="mb20">
          <p>My Applies</p>
        </Text>

        <Paper shadow="md" radius="lg">
          <div className={classes.wrapper}>
            <div className={classes.contacts}>
              <Text fz="lg" fw={700} className={classes.title} c="#fff">
                Contact information
              </Text>

              <SegmentedControl
                orientation="vertical"
                fullWidth
                size="md"
                radius="md"
                data={[
                  "All applies",
                  "APPLIED",
                  "TEST FAILED",
                  "INVITED",
                  "DECLINED",
                ]}
                value={status}
                onChange={handleStatusChange}
              />
            </div>

            <div className="ml1">
              <Text fz="lg" fw={700} className={classes.title}>
                Users apply
              </Text>
              <Table.ScrollContainer minWidth={600} className="mb20">
                <Table verticalSpacing="xs">
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
