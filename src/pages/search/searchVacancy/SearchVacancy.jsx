import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MyVacancies from "../../../components/myvacancies/MyVacancies";
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
  Menu,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  getAllAuthVacancies,
  getAllVacancies,
} from "../../../store/slices/vacancySlice";
import KeycloakService from "../../../services/KeycloakService";
import { getMyResumes } from "../../../store/slices/resumeSlice";
import { POINT_CONTENT } from "../../../config/end-point";
import classes from "./SearchVacancy.module.css";


export default function SearchVacancy() {
  const { applyStatus } = useSelector((state) => state.apply);
  const { applyStatus: testStatus } = useSelector((state) => state.test);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [cityId, setCityId] = useState(searchParams.get("cityId"));
  const [salaryFrom, setSalaryFrom] = useState(searchParams.get("salaryFrom"));
  const [salaryTo, setSalaryTo] = useState(searchParams.get("salaryTo"));
  const [currency, setCurrency] = useState(searchParams.get("currency"));
  const [experienceId, setExperienceId] = useState(
    searchParams.get("experienceId")
  );
  const [employmentTypeId, setEmploymentType] = useState(
    searchParams.get("employmentTypeId")
  );
  const [querySeacrh, setQuerySeacrh] = useState("");
  const [filteredVacancies, setFilteredVacancies] = useState([]);

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await fetch(
        `${POINT_CONTENT}/api/content/vacancies/cities`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const citiesData = await response.json();
      const transformedCities = citiesData.map((city) => ({
        value: city.id.toString(),
        label: city.name,
      }));
      return transformedCities;
    },
  });

  const { loadingVacancy } = useSelector((state) => state.vacancy);
  const vacancies = useSelector((state) => state.vacancy.allVacancies);

  useEffect(() => {
    if (KeycloakService.getUserRole()) {
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
    if (KeycloakService.isLoggedIn() && (applyStatus || testStatus)) {
      dispatch(getAllAuthVacancies());
    }
  }, [applyStatus, testStatus]);

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

  const transformExperience = (experienceId) => {
    switch (experienceId) {
      case "No experience":
        return "NO_EXPERIENCE";
      case "Less than year":
        return "LESS_THAN_YEAR";
      case "1-3 years":
        return "ONE_TO_THREE";
      case "3-6 years":
        return "THREE_TO_SIX";
      case "6+ years":
        return "MORE_THAN_SIX";
      default:
        return null;
    }
  };

  const handleSearch = () => {
    const transformedExperienceId = transformExperience(experienceId);

    const filterParams = {
      cityId,
      salaryFrom,
      salaryTo,
      currency,
      employmentType: employmentTypeId,
      experience: transformedExperienceId,
    };

    if (KeycloakService.isLoggedIn()) {
      dispatch(getAllAuthVacancies(filterParams));
    } else {
      dispatch(getAllVacancies(filterParams));
    }
  };

  const resetFilters = () => {
    setCityId(null);
    setSalaryFrom(null);
    setSalaryTo(null);
    setCurrency(null);
    setExperienceId(null);
    setEmploymentType(null);
    setQuerySeacrh("");
  };

  const handleReset = () => {
    resetFilters();
  };

  useEffect(() => {
    handleSearch();
  }, [cityId, salaryFrom, salaryTo, currency, employmentTypeId, experienceId]);

  return (
    <main>
      <Container size="xl" py="xl">
        <Search onChange={(event) => setQuerySeacrh(event.target.value)} />
      
          <Menu shadow="lg" width={200} mt={20} className={classes.filterButton}>
            <Menu.Target>
              <Button variant="outline">Open filters</Button>
            </Menu.Target>

            <Menu.Dropdown
              shadow="lg"
              ml={20}
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '10px 15px' }}
            >
              <div>
                <Select
                  label="Search city"
                  placeholder="Search city"
                  data={cities}
                  searchable
                  value={cityId}
                  onChange={setCityId}
                  nothingFoundMessage="Nothing found..."
                  mb={5}
                />
              </div>
              <div>
                <NumberInput
                  label="From salary"
                  placeholder="Input from salary"
                  min={0}
                  max={10000000000}
                  value={salaryFrom}
                  onChange={setSalaryFrom}
                  mb={5}
                />
              </div>
              <div>
                <NumberInput
                  label="To salary"
                  placeholder="Input To salary"
                  min={0}
                  max={10000000000}
                  value={salaryTo}
                  onChange={setSalaryTo}
                  mb={5}
                />
              </div>
              <div>
                <Select
                  label="Currency"
                  placeholder="Pick value"
                  data={["KZT", "USD", "RUB"]}
                  value={currency}
                  onChange={setCurrency}
                  mb={5}
                />
              </div>

              <div>
                <Select
                  label="Experience"
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
                  mb={5}
                />
              </div>
              <div>
                {" "}
                <Select
                  label="Employment Type"
                  placeholder="Pick value"
                  data={["Full time", "Remote"]}
                  value={employmentTypeId}
                  onChange={setEmploymentType}
                  mb={5}
                />
              </div>
            </Menu.Dropdown>
          </Menu>
      
        <Grid>
            <Grid.Col span={3} className={classes.filterContent}>
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
                    value={salaryFrom}
                    onChange={setSalaryFrom}
                  />
                  <NumberInput
                    label="To salary"
                    placeholder="Input To salary"
                    min={0}
                    max={10000000000}
                    value={salaryTo}
                    onChange={setSalaryTo}
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
                  value={employmentTypeId}
                  onChange={setEmploymentType}
                />
                <Group grow mt={20}>
                  <Button
                    loading={loading}
                    mt="sm"
                    variant="outline"
                    radius="xl"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                  <Button
                    color="red"
                    loading={loading}
                    mt="sm"
                    variant="outline"
                    radius="xl"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Group>
              </Paper>
            </Grid.Col>
       

          <Grid.Col span="auto">
            {loadingVacancy ? (
              <Center h={500}>
                <Loader color="blue" size={100} />
              </Center>
            ) : (
              <div>
                <MyVacancies vacancies={filteredVacancies} />
              </div>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}
