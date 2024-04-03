import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import KeycloakService from "../../services/KeycloakService";
import { Anchor, Loader, Table, Text } from "@mantine/core";
import { getProfile } from "../../store/slices/profileSlice";

const data = [
  {
    title: "Foundation",
    author: "Isaac Asimov",
    year: 1951,
    reviews: { positive: 2223, negative: 259 },
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
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

  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.title}>
        <Table.Td>
          <Text fw={500}>{row.title}</Text>
        </Table.Td>
        <Table.Td fz="sm">{row.year}</Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {row.author}
          </Anchor>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <main>
      <div className="container p7">
        <Text size="lg" c="blue">
          My Applies
        </Text>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text fw={700}>Position</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={700}></Text>
                  Date
                </Table.Th>
                <Table.Th>
                  <Text fw={700}>Status</Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </main>
  );
}
