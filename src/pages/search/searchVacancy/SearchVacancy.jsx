import Header from "../../../components/header/Header";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
//import { useSearchParams } from 'next/navigation'
import MyVacancies from "../../../components/myvacancies/MyVacancies";
//import { useRouter } from "next/navigation"
import img1 from "../../../assets/images/img1.png";
import Sort from "../../../components/Sort/Sort";
import iconExp from "../../../assets/images/iconExp.png";
import { Search } from "../../../components/Search/Search";
import {
  Container,
  Grid,
  Loader,
  Select,
  Text,
  Paper,
  Flex,
  NumberInput,
  Button,
  Center,
  Group,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  getAllAuthVacancies,
  getAllVacancies,
} from "../../../store/slices/vacancySlice";
import KeycloakService from "../../../services/KeycloakService";
import { getMyResumes } from "../../../store/slices/resumeSlice";

export default function SearchVacancy() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [isSpecModalOpen, setSpecModalOpen] = useState(false);
  const [cityId, setCityId] = useState(searchParams.get("cityId"));
  const [fromSalary, setFromSalary] = useState(searchParams.get("fromSalary"));
  const [toSalary, setToSalary] = useState(searchParams.get("toSalary"));
  const [currency, setCurrency] = useState(searchParams.get("currency"));
  const [experienceId, setExperienceId] = useState(
    searchParams.get("experienceId")
  );
  const [employmentTypeId, setEmploymentType] = useState(
    searchParams.get("employmentTypeId")
  );
  const closeSepcModal = () => {
    setSpecModalOpen(false);
  };
  const [querySeacrh, setQuerySeacrh] = useState("");
  const [filteredVacancies, setFilteredVacancies] = useState([]);

  const {
    isPending,
    isError,
    data: cities,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await fetch(
        `${END_POINT}/api/client-app/resumes/cities`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const citiesData = await response.json();
      const transformedCities = citiesData.map((city) => ({
        value: city.id,
        label: city.name,
      }));
      return transformedCities;
    },
  });

  const { loadingVacancy } = useSelector((state) => state.vacancy);
  const vacancies = useSelector((state) => state.vacancy.allVacancies);

  useEffect(() => {
    if (KeycloakService.getUserRole) {
      dispatch(getMyResumes());
    }
    if (KeycloakService.isLoggedIn()) {
      dispatch(getAllAuthVacancies());
    } else {
      dispatch(getAllVacancies());
    }
  }, []);

  useEffect(() => {
    if (vacancies) {
      setLoading(false);
    }
  }, [vacancies]);

  useEffect(() => {
    if (querySeacrh.trim() === "") {
      // If search query is empty, show all vacancies
      setFilteredVacancies(vacancies);
    } else {
      // Otherwise, filter vacancies based on search query
      const filtered = vacancies.filter((vacancy) =>
        vacancy.title.toLowerCase().includes(querySeacrh.toLowerCase())
      );
      setFilteredVacancies(filtered);
    }
  }, [querySeacrh, vacancies]);

  return (
    <main>
      <Container size="xl" mt={40}>
        <Search onChange={(event) => setQuerySeacrh(event.target.value)} />
        <Grid mt={40}>
          <Grid.Col span="auto">
            <Paper mt={20} shadow="xs" withBorder p="md">
              <Text size="lg" fw={700} mb={20}>
                Filters
              </Text>
              <Text size="md" fw={600}>
                City:
              </Text>
              <Select
                placeholder="Search city"
                data={cities}
                searchable
                value={cityId}
                onChange={setCityId}
                nothingFoundMessage="Nothing found..."
              />

              <Flex
                mih={50}
                gap="sm"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
                mt="sm"
              >
                <NumberInput
                  label="From salary"
                  placeholder="Input from salary"
                  min={0}
                  max={10000000000}
                  value={fromSalary}
                  onChange={setFromSalary}
                />
                <Select
                  label="Currency"
                  placeholder="Pick value"
                  data={["KZT", "USD", "RUB"]}
                  value={currency}
                  onChange={setCurrency}
                />
              </Flex>
              <Text size="md" mt={20} fw={600}>
                Experience:
              </Text>
              <Select
                placeholder="Pick value"
                data={[
                  "No experience",
                  "Less than year",
                  "1-3 years",
                  "3-6 years",
                  "6+ years",
                ]}
                value={experienceId}
                onChange={setExperienceId}
              />
              <Text size="md" mt={20} fw={600}>
                Employment type:
              </Text>
              <Select
                placeholder="Pick value"
                data={["Full time", "Remote"]}
                value={currency}
                onChange={setCurrency}
              />
              <Group grow mt={20}>
                <Button loading={loading} mt="sm" variant="outline" radius="xl">
                  Search
                </Button>
                <Button
                  color="red"
                  loading={loading}
                  mt="sm"
                  variant="outline"
                  radius="xl"
                >
                  Reset
                </Button>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={9}>
            {loadingVacancy ? (
              <Center h={500}>
                <Loader color="blue" size={100} />
              </Center>
            ) : (
              <div style={{ paddingLeft: `40px` }}>
                <MyVacancies vacancies={filteredVacancies} />
              </div>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}
