import Input from "../../components/FillForm/input/input";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalAddExp from "../../components/FillForm/ModalAddExp/ModalAddExp";
import WorkingHistory from "../../components/FillForm/WorkingHistory/WorkingHistory";
import AddEducation from "../../components/FillForm/AddEducation/AddEducation";
import SelectEmploymentTypes from "../../components/FillForm/SelectEmploymentTypes/SelectEmploymentTypes";
import { Link, useNavigate, useParams } from "react-router-dom";
import { END_POINT } from "../../config/end-point";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MultiSelect } from "@mantine/core";
import EducationItem from "../../components/EducationItem/EducationItem";
import {
  createResume,
  editResumeById,
  getResumeById,
} from "../../store/slices/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Group } from "@mantine/core";
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
  const [modalExpIsOpen, setModalExpIsOpen] = useState(false);
  const [modalEduIsOpen, setModalEduIsOpen] = useState(false);

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
      // Преобразование данных городов в формат, ожидаемый компонентом Select
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

  const closeModalExp = () => {
    setModalExpIsOpen(false);
  };

  const closeModalEdu = () => {
    setModalEduIsOpen(false);
  };

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

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const onSkillsChange = (data) => {
    setSelectedSkills(data.map((skill) => skill.label)); // Store only the label (name) of selected skills
  };

  const updateFormValidity = () => {
    const isValid =
      gender &&
      city &&
      position &&
      skills.length > 0 &&
      experience.length > 0 &&
      education.length > 0 &&
      salary >= 0 &&
      currency &&
      about;

    setIsFormValid(isValid);
  };

  useEffect(() => {
    updateFormValidity();
    console.log("isFormValid:", isFormValid);
  }, [gender, city, position, skills, salary, currency, about, employmentType]);

  useEffect(() => {
    dispatch(getResumeById(id));
  }, []);

  useEffect(() => {
    if (resume.id) {
      setGender(resume.gender);
      setCity(resume.city);
      setPosition(resume.position);
      setSelectedSkills(resume.skills);
      setSalary(resume.salary);
      setCurrency(resume.currency);
      setExperience(resume.experience);
      setAbout(resume.about);
      setEducation(resume.education);
      setSelectedEmpTypes(resume.employmentType);
    }
    console.log("CITYY", resume.city);
  }, [resume]);

  const handleSave = async () => {
    try {
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
      console.log(editedResumeData);

      await dispatch(
        editResumeById({
          id: resume.id,
          updatedResume: editedResumeData,
        })
      );

      navigate("/resumes");
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
              // {...form.getInputProps("city")}
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
              //{...form.getInputProps("position")}
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
                //  {...form.getInputProps("salary")}
              />
              <Select
                mt="sm"
                label="Currency"
                placeholder="Pick value"
                data={["KZT", "USD", "RUB"]}
                value={currency}
                onChange={setCurrency}
                // {...form.getInputProps("currency")}
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
              // {...form.getInputProps("skills")}
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
                // close={closeModalExp}
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
              disabled={!isFormValid}
              type="submit"
              mt="lg"
            >
              Edit resume
            </Button>
            {/* </form> */}
          </Box>
        </Paper>
      </Container>
      <Space h="lg" />
      {/* <div className="container p7">
        <div className="flex flex-jc-end mb10">
          <Link className="button button-black " to="/resumes">
            Back
          </Link>
        </div>
        <Paper radius="md" withBorder p="lg" color="#228BE6" shadow="xs">
          <h1>Edit resume</h1>

          <h3>Основная информация</h3>
          <fieldset className={"fieldset fieldset-sm"}>
            <label>Gender</label>
            <div className="radio-group">
              <div className="radio">
                {resume.gender && resume.gender === "MALE" && (
                  <input
                    className="radio"
                    type="radio"
                    name="gender"
                    id="g1"
                    onChange={handleGenderChange}
                    value={"MALE"}
                    checked
                  />
                )}
                {!resume.gender ||
                  (resume.gender !== "MALE" && (
                    <input
                      className="radio"
                      type="radio"
                      name="gender"
                      id="g1"
                      onChange={handleGenderChange}
                      value={"MALE"}
                    />
                  ))}
                <label htmlFor="g1">Male</label>
              </div>
              <div className="radio">
                {resume.gender && resume.gender === "FEMALE" && (
                  <input
                    className="radio"
                    type="radio"
                    name="gender"
                    id="g2"
                    onChange={handleGenderChange}
                    value={"FEMALE"}
                    checked
                  />
                )}
                {!resume.gender ||
                  (resume.gender !== "FEMALE" && (
                    <input
                      className="radio"
                      type="radio"
                      name="gender"
                      id="g2"
                      onChange={handleGenderChange}
                      value={"FEMALE"}
                    />
                  ))}
                <label htmlFor="g2">Female</label>
              </div>
            </div>
          </fieldset>

          <fieldset className={"fieldset fieldset-sm"}>
            <label className="h1">City of residence</label>
            <Select
              placeholder="Search city"
              data={cities}
              searchable
              value={city}
              onChange={setCity}
              nothingFoundMessage="Nothing found..."
              className={"fieldset fieldset-sm h3"}
            />
          </fieldset>

          <h3>Специальность</h3>

          <Input
            placeholder=""
            type="text"
            label="Желаемая должность"
            size="fieldset-lg"
            onChange={(e) => setPosition(e.target.value)}
            value={position}
          />

          <fieldset className={"fieldset fieldset-sm"}>
            <label className="h1">Skills</label>
          </fieldset>
          <MultiSelect
            placeholder="Pick value"
            data={allSkills}
            hidePickedOptions
            value={skills}
            onChange={setSelectedSkills}
          />

          <fieldset className={"fieldset fieldset-lg"}>
            <label>Зарплата</label>

            <div className="salary">
              <input
                placeholder=""
                className="input"
                type="number"
                size="input"
                value={salary}
                onChange={(e) => setSalary(e.target.value * 1)}
              />
              <select
                className="input"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value={"KZT"}>KZT</option>
                <option value={"USD"}>USD</option>
                <option value={"RUB"}>RUB</option>
              </select>
              на руки
            </div>
          </fieldset>

          <h3>Опыт работы</h3>

          {modalExpIsOpen && (
            <ModalAddExp
              close={closeModalExp}
              addWorkingHistory={addWorkingHistory}
            />
          )}
          <fieldset className={"fieldset fieldset-lg"}>
            <label>Места работы</label>

            <div className="exp">
              {experience.map((item) => (
                <WorkingHistory
                  key={item.id}
                  workingHistory={item}
                  remove={removeWorkingHistory}
                />
              ))}
              <button
                className="button button-primary-bordered"
                onClick={() => setModalExpIsOpen(true)}
              >
                Добавить место работы
              </button>
            </div>
          </fieldset>

          <fieldset className={"fieldset fieldset-lg"}>
            <label>О себе</label>
            <textarea
              className="textarea"
              placeholder="Расскажите о себе"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            />
          </fieldset>

          <h3>Образование</h3>

          {modalEduIsOpen && (
            <AddEducation close={closeModalEdu} addEducation={addEducation} />
          )}
          <fieldset className={"fieldset fieldset-lg"}>
            <label>Образование</label>

            <div className="exp">
              {education.map((item) => (
                <EducationItem
                  key={item.id}
                  education={item}
                  remove={removeEducation}
                />
              ))}
              <button
                className="button button-primary-bordered"
                onClick={() => setModalEduIsOpen(true)}
              >
                Добавить место учебы
              </button>
            </div>
          </fieldset>

          <h3>Choose employment type</h3>
          <fieldset className={"fieldset fieldset-sm"}>
            <label className="h1">Employment type</label>
            <div className="h1">
              <Checkbox.Group>
                {allEmploymentTypes.map((type) => (
                  <Group mt="xs" key={type.id}>
                    <Checkbox
                      value={type.id}
                      label={type.name}
                      className="h1"
                      checked={employmentType.includes(type.id)}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        setSelectedEmpTypes((prevState) => {
                          if (checked) {
                            return [...prevState, type.id];
                          } else {
                            return prevState.filter((item) => item !== type.id);
                          }
                        });
                      }}
                    />
                  </Group>
                ))}
              </Checkbox.Group>
            </div>
          </fieldset>

          <button className="button button-primary" onClick={handleSave}>
            Edit resume
          </button>
        </Paper>
      </div> */}
    </main>
  );
}
