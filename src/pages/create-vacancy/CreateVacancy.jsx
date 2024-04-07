import Input from "../../components/FillForm/input/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Group, Paper, Select } from "@mantine/core";
import { POINT_CONTENT } from "../../config/end-point";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MultiSelect } from "@mantine/core";
import { createResume } from "../../store/slices/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import { createVacancy } from "../../store/slices/vacancySlice";
import AutoCompleteSelect from "../../components/FillForm/AutoCompleteSelect/AutoCompleteSelect";
import { getMyTests } from "../../store/slices/testSlice";

export default function CreateVacancy() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAdress] = useState("");
  const [cityId, setCityId] = useState();
  const [cities, setCities] = useState([]);
  const [fromSalary, setFromSalary] = useState(0);
  const [toSalary, setToSalary] = useState(0);
  const [currency, setCurrency] = useState("KZT");
  const [employmentTypes, setSelectedEmpTypes] = useState([]);
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [allTests, setAllTests] = useState([]);
  const [testId, setTestId] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.vacancy);
  const tests = useSelector((state) => state.test.tests);

  useEffect(() => {
    axios.get(`${POINT_CONTENT}/api/content/vacancies/cities`).then((res) => {
      setCities(res.data);
      dispatch(getMyTests());
    });
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

  const handleSave = () => {
    const data = {
      title,
      company,
      address,
      cityId,
      fromSalary,
      toSalary,
      currency,
      employmentTypes: formatEmploymentTypes(employmentTypes),
      experience: formatExperience(experience),
      description,
      testId: parseInt(testId),
    };
    console.log("DAATA VACANCY:", data);
    dispatch(createVacancy(data));
    navigate("/vacancies");
  };

  useEffect(() => {
    if (success) {
      navigate("/vacancies");
    }
  }, [success]);

  return (
    <main>
      <div className="container p7">
        <div className="flex flex-jc-end mb10">
          <Link className="button button-black " to="/vacancies">
            Back
          </Link>
        </div>
        <Paper radius="md" withBorder p="lg" color="#228BE6" shadow="xs">
          <h1>Add new vacancy</h1>

          <h3>Основная информация</h3>

          <Input
            placeholder=""
            type="text"
            label="Job title"
            size="fieldset-lg"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder=""
            type="text"
            label="Company name"
            size="fieldset-lg"
            onChange={(e) => setCompany(e.target.value)}
          />
          <Input
            placeholder=""
            type="text"
            label="Address"
            size="fieldset-lg"
            onChange={(e) => setAdress(e.target.value)}
          />

          <AutoCompleteSelect
            placeholder=""
            type="text"
            label="Город проживания"
            size="fieldset-md"
            items={cities}
            onSelect={(data) => setCityId(data.id)}
          />

          <fieldset className={"fieldset fieldset-lg"}>
            <span className="mr8">Salary</span>

            <div className="salary">
              <input
                placeholder="from"
                className="input"
                type="number"
                size="input"
                value={fromSalary}
                onChange={(e) => setFromSalary(e.target.value * 1)}
              />
              <input
                placeholder="to"
                className="input"
                type="number"
                size="input"
                value={toSalary}
                onChange={(e) => setToSalary(e.target.value * 1)}
              />
              <Select
                className="w-full"
                placeholder="currency"
                data={["KZT", "USD", "RUB"]}
                value={currency}
                onChange={setCurrency}
              />
            </div>
          </fieldset>

          <fieldset className={"fieldset fieldset-sm"}>
            <label className="h1">Employment type</label>
            <MultiSelect
              placeholder="Pick value"
              data={["Full time", "Remote"]}
              hidePickedOptions
              value={employmentTypes}
              onChange={setSelectedEmpTypes}
            />
          </fieldset>

          <fieldset className={"fieldset fieldset-sm"}>
            <label className="h1">Experience</label>
            <Select
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
            />
          </fieldset>

          <fieldset className={"fieldset fieldset-lg"}>
            <label>Description</label>
            <textarea
              className="textarea"
              placeholder="Vacancy description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>

          {tests ? (
            <fieldset className={"fieldset fieldset-sm"}>
              <label className="h1">Choose test</label>
              <Select
                placeholder="Pick value"
                data={allTests}
                value={testId}
                onChange={setTestId}
              />
            </fieldset>
          ) : (
            <Link to="/create-test">Добавить тест</Link>
          )}

          <button className="button button-primary mt24" onClick={handleSave}>
            Save and upload
          </button>
        </Paper>
      </div>
    </main>
  );
}
