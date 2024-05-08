import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { POINT_CONTENT } from "../../config/end-point";
import { useDispatch, useSelector } from "react-redux";
import { Center, Group, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  editVacancyById,
  getVacancyById,
} from "../../store/slices/vacancySlice";
import { getMyTests } from "../../store/slices/testSlice";
import {
  MultiSelect,
  Box,
  Button,
  Container,
  Flex,
  NumberInput,
  Paper,
  Select,
  Text,
  Space,
  TextInput,
  Textarea,
} from "@mantine/core";

export default function EditVacancy() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAdress] = useState("");
  const [cityId, setCityId] = useState();
  const [salaryFrom, setFromSalary] = useState();
  const [salaryTo, setToSalary] = useState();
  const [currency, setCurrency] = useState("KZT");
  const [employmentType, setSelectedEmpTypes] = useState([]);
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [allTests, setAllTests] = useState([]);
  const [testId, setTestId] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const vacancy = useSelector((state) => state.vacancy.vacancy);
  const { error, loadingVacancy, success } = useSelector((state) => state.vacancy);
  const tests = useSelector((state) => state.test.tests);
  const [isFormValid, setIsFormValid] = useState(false);

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

  useEffect(() => {
    dispatch(getVacancyById(id));
    dispatch(getMyTests());
  }, []);

  useEffect(() => {
    if (tests) {
      console.log("Tests:", tests);
      setAllTests(
        tests.map((test) => ({
          value: test.id.toString(),
          label: test.name,
        }))
      );
    }
  }, [tests]);

  useEffect(() => {
    if (vacancy.id) {
      setTitle(vacancy.title);
      setCompany(vacancy.company);
      setAdress(vacancy.address);
     if (vacancy.id && cities) {
      const selectedCity = cities.find((city) => city.label === vacancy.city);
      if (selectedCity) {
        setCityId(selectedCity.value); 
      } else {
        console.error("City not found:", vacancy.city);
      }
    }

      setFromSalary(vacancy.salaryFrom);
      setToSalary(vacancy.salaryTo);
      setCurrency(vacancy.currency);
      setSelectedEmpTypes(vacancy.employmentType);
      setExperience(vacancy.experience);
      setDescription(vacancy.description);
      setTestId(tests[vacancy.testId]);
    }
   
  }, [vacancy]);

  const formatExperience = (experience) => {
    switch (experience) {
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
        return "";
    }
  };

  const formatCurrency = (currency) => {
    switch (currency) {
      case "$":
        return "USD";
      case "₸":
        return "KZT";
      case "₽":
        return "RUB";
      case "USD":
        return "USD";
      case "KZT":
        return "KZT";
      case "RUB":
        return "RUB";
      default:
        return "";
    }
  };

  const formatEmploymentTypes = (selectedTypes) => {
    const formattedTypes = selectedTypes.map((type) => {
      switch (type) {
        case "Full time":
          return "FULL_TIME";
        case "Remote":
          return "REMOTE";
        default:
          return "";
      }
    });
    return formattedTypes;
  };

  const updateFormValidity = () => {
    const isValid =
      title &&
      company &&
      address &&
      cityId &&
      salaryFrom &&
      salaryTo &&
      currency &&
      employmentType &&
      experience &&
      description;

    setIsFormValid(isValid);
  };

  useEffect(() => {
    updateFormValidity();
  }, [
    title,
    company,
    address,
    cityId,
    salaryFrom,
    salaryTo,
    currency,
    employmentType,
    experience,
    description,
  ]);

  const handleSave = async () => {
    try {
      const selectedCity = cities.find((c) => c.name === cityId);
      const editedVacancyData = {
        title,
        company,
        address,
        cityId: Number(cityId),
        fromSalary: salaryFrom,
        toSalary: salaryTo,
        currency: formatCurrency(currency),
        employmentTypes: formatEmploymentTypes(employmentType),
        experience: formatExperience(experience),
        description,
        testId,
      };
      console.log("EDITED VACANCY", editedVacancyData);
      console.log("selectedCity ", selectedCity);
      console.log("cityIdL Value ", cityId);
      console.log("cityId", vacancy.city);

      await dispatch(
        editVacancyById({
          id: vacancy.id,
          updatedVacancy: editedVacancyData,
        })
      );

      if (success) {
        navigate("/vacancies");
      }
    } catch (error) {
      console.error("Error editing vacancy:", error);
    }
  };

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="flex-end">
          <Button
            onClick={() => navigate("/vacancies")}
            variant="filled"
            color="rgba(61, 61, 61, 1)"
            mb={10}
          >
            Go to vacancies
          </Button>
        </Group>
        <Text size="xl" fw={700} mb="lg">
          Edit vacancy
        </Text>
        {loadingVacancy ? (
          <>
            <Center h={500}>
              <Loader color="blue" size={100} />
            </Center>
          </>
        ) : (
          <Paper radius="md" withBorder p="lg" color="#228BE6" shadow="xs">
            <Box mx="auto">
              <Text fw={700} size="xl" mt="sm">
                Basic information
              </Text>
              <TextInput
                mt="sm"
                label="Job title"
                placeholder="Input title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <TextInput
                mt="sm"
                label="Company name"
                placeholder="Input company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />

              <TextInput
                mt="sm"
                label="Address"
                placeholder="Input address"
                value={address}
                onChange={(e) => setAdress(e.target.value)}
                required
              />

              <Select
                mt="sm"
                label="City"
                placeholder={cityId}
                data={cities}
                searchable
                value={cityId}
                onChange={setCityId}
                nothingFoundMessage="Nothing found..."
                required
              />

              <Flex
                mih={50}
                gap="sm"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                <NumberInput
                  mt="sm"
                  label="From salary"
                  placeholder="Input from salary"
                  min={0}
                  max={10000000000}
                  value={salaryFrom}
                  onChange={setFromSalary}
                />

                <NumberInput
                  mt="sm"
                  label="To salary"
                  placeholder="Input to salary"
                  min={0}
                  max={10000000000}
                  value={salaryTo}
                  onChange={setToSalary}
                />
                <Select
                  mt="sm"
                  label="Currency"
                  placeholder="Pick value"
                  data={["KZT", "USD", "RUB"]}
                  value={currency}
                  onChange={setCurrency}
                  required
                />
              </Flex>

              <MultiSelect
                mt="sm"
                label="Employment Type"
                placeholder="Pick value"
                data={["Full time", "Remote"]}
                hidePickedOptions
                value={employmentType}
                onChange={setSelectedEmpTypes}
                required
              />

              <Select
                mt="sm"
                label="Experience"
                placeholder="Pick value"
                data={[
                  "No experience",
                  "Less than year",
                  "1-3 years",
                  "3-6 years",
                  "6+ years",
                ]}
                value={experience}
                onChange={setExperience}
                required
              />

              <Textarea
                mt="sm"
                label="Description"
                placeholder="Input description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              {tests ? (
                <Select
                  mt="sm"
                  label="Choose test"
                  placeholder={tests[vacancy.testId]}
                  data={allTests}
                  value={testId}
                  onChange={setTestId}
                />
              ) : (
                <Link to="/create-test">Add test</Link>
              )}
              <Button
                onClick={handleSave}
                disabled={!isFormValid}
                type="submit"
                loading={loading}
                mt="lg"
              >
                Edit vacancy
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
      <Space h="lg" />
    </main>
  );
}
