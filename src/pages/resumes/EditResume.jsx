import { useEffect, useState } from "react";
import axios from "axios";
import ModalAddExp from "../../components/FillForm/ModalAddExp/ModalAddExp";
import WorkingHistory from "../../components/FillForm/WorkingHistory/WorkingHistory";
import AddEducation from "../../components/FillForm/AddEducation/AddEducation";
import { useNavigate, useParams } from "react-router-dom";
import { END_POINT } from "../../config/end-point";
import { useQuery } from "@tanstack/react-query";
import { Center, Loader, MultiSelect } from "@mantine/core";
import EducationItem from "../../components/EducationItem/EducationItem";
import { editResumeById, getResumeById } from "../../store/slices/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Group } from "@mantine/core";
import {
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
import { useDisclosure } from "@mantine/hooks";

export default function EditResume() {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEdu, { open: openEdu, close: closeEdu }] = useDisclosure(false);

  const [allSkills, setSkills] = useState([]);
  const [allEmploymentTypes, setEmploymentTypes] = useState([]);
  const [experience, setExperience] = useState([]);

  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState();
  const [currency, setCurrency] = useState("KZT");
  const [skills, setSelectedSkills] = useState([]);
  const [education, setEducation] = useState([]);

  const [employmentType, setSelectedEmpTypes] = useState([]);
  const [employmentTypes, setSelectedEmploymentTypes] = useState([]);
  const [about, setAbout] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const resume = useSelector((state) => state.resume.resume);
  const { error, loading, success } = useSelector((state) => state.resume);
  const [isFormValid, setIsFormValid] = useState(false);
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

  useEffect(() => {
    axios.get(`${END_POINT}/api/client-app/resumes/skills`).then((res) => {
      const skillsData = res.data;
      setSkills(
        skillsData.map((skill) => ({
          value: skill.id,
          label: skill.name,
        }))
      );
    });

    axios
      .get(`${END_POINT}/api/client-app/resumes/employment-types`)
      .then((res) => {
        setEmploymentTypes(res.data);
      });
  }, []);

  const addWorkingHistory = (item) => {
    setExperience([...experience, item]);
    close();
  };

  const addEducation = (item) => {
    setEducation([...education, item]);
    closeEdu();
  };

  const removeWorkingHistory = (workingHistory) => {
    let wh = [...experience];
    let index = experience.indexOf(workingHistory);
    wh.splice(index, 1);
    setExperience(wh);
  };

  const removeEducation = (education) => {
    let ed = [...education];
    let index = education.indexOf(education);
    ed.splice(index, 1);
    setEducation(ed);
  };

  const currencyMappings = {
    "₸": "KZT",
    $: "USD",
    "₽": "RUB",
  };

  const updateFormValidity = () => {
    const isValid =
      gender &&
      city &&
      position &&
      skills.length > 0 &&
      salary >= 0 &&
      currency &&
      about;

    setIsFormValid(isValid);
  };

  useEffect(() => {
    updateFormValidity();
  }, [gender, city, position, skills, salary, currency, about, employmentType]);

  useEffect(() => {
    dispatch(getResumeById(id));
  }, []);

  const mapSkillNamesToIds = (selectedSkillNames, allSkills) => {
    const selectedSkillIds = [];
    selectedSkillNames.forEach((selectedName) => {
      const matchedSkill = allSkills.find(
        (skill) => skill.label === selectedName
      );
      if (matchedSkill) {
        selectedSkillIds.push(matchedSkill.value);
      }
    });
    return selectedSkillIds;
  };

  useEffect(() => {
    if (resume.id) {
      setGender(resume.gender);
      if (cities) {
        const selectedCity = cities.find((city) => city.label === resume.city);
        if (selectedCity) {
          setCity(selectedCity.value);
        } else {
          console.error("City not found:", resume.city);
        }
      }
      setPosition(resume.position);
      const selectedSkillIds = mapSkillNamesToIds(resume.skills, allSkills);
      setSelectedSkills(selectedSkillIds);
      setSalary(resume.salary);
      setCurrency(currencyMappings[resume.currency]);
      setExperience(resume.experience);
      setAbout(resume.about);
      setEducation(resume.education);
      setSelectedEmpTypes(resume.employmentType);
    }
  }, [resume]);

  const handleSave = async () => {
    try {
      const matchingCity = cities.find((cityData) => cityData === resume.city);
      const editedResumeData = {
        gender,
        city,
        position,
        skills,
        salary,
        currency,
        experience,
        about,
        education,
        employmentType,
      };
      console.log("EDITED", editedResumeData);

      await dispatch(
        editResumeById({
          id: resume.id,
          updatedResume: editedResumeData,
        })
      );

      if (success) {
        navigate("/resumes");
      }
    } catch (error) {
      console.error("Error editing resume:", error);
    }
  };

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="flex-end">
          <Button
            onClick={() => navigate("/resumes")}
            variant="filled"
            color="rgba(61, 61, 61, 1)"
            mb={10}
          >
            Go to resumes
          </Button>
        </Group>
        <Text size="xl" fw={700} mb="lg">
          Edit resume
        </Text>

        {loading ? (
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
              <Select
                mt="sm"
                label="Gender"
                placeholder={gender}
                data={["Male", "Female"]}
                value={gender}
                onChange={setGender}
                required
              />
              <Select
                mt="sm"
                label="City"
                placeholder={city}
                data={cities}
                searchable
                value={city}
                onChange={setCity}
                nothingFoundMessage="Nothing found..."
                required
              />
              <Text fw={700} size="xl" mt="sm">
                Speciality
              </Text>

              <TextInput
                mt="sm"
                label="Desired job position"
                placeholder="Input position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
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
                  label="Salary"
                  placeholder="Input salary"
                  min={0}
                  max={10000000000}
                  value={salary}
                  onChange={setSalary}
                  required
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
                label="Skills"
                placeholder="Pick value"
                data={allSkills}
                hidePickedOptions
                value={skills}
                onChange={setSelectedSkills}
                required
              />

              <Text fw={700} size="xl" mt="sm">
                Job experience
              </Text>

              <Flex
                mt="sm"
                mih={50}
                gap={100}
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Text fw={500} size="md">
                  Place of work
                </Text>
                <Button variant="outline" onClick={open}>
                  Add place of work
                </Button>
                <ModalAddExp
                  close={close}
                  opened={opened}
                  addWorkingHistory={addWorkingHistory}
                />
              </Flex>
              {experience.map((item) => (
                <WorkingHistory
                  key={item.id}
                  workingHistory={item}
                  remove={removeWorkingHistory}
                />
              ))}

              {/* <MultiSelect
                mt="sm"
                label="Employment Types"
                placeholder="Pick value"
                data={allEmploymentTypes}
                hidePickedOptions
                value={employmentTypes}
                onChange={setSelectedEmploymentTypes}
                //{...form.getInputProps("employmentTypes")}
              /> */}

              <Text fw={700} size="xl" mt="sm">
                Education
              </Text>

              <Flex
                mt="sm"
                mih={50}
                gap={100}
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Text fw={500} size="md">
                  Education
                </Text>
                <Button variant="outline" onClick={openEdu}>
                  Add education
                </Button>
                <AddEducation
                  closeEdu={closeEdu}
                  openedEdu={openedEdu}
                  addEducation={addEducation}
                />
              </Flex>
              {education.map((item) => (
                <EducationItem
                  key={item.id}
                  education={item}
                  remove={removeEducation}
                />
              ))}

              <Text fw={700} size="xl" mt="sm">
                Description
              </Text>
              <Textarea
                mt="sm"
                label="About me"
                placeholder="Input description"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <Button
                onClick={handleSave}
                //disabled={!isFormValid}
                type="submit"
                mt="lg"
              >
                Edit resume
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
      <Space h="lg" />
    </main>
  );
}
