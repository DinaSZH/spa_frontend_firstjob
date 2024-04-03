import Input from "../../components/FillForm/input/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MultiSelect, Paper, Select } from "@mantine/core";
import { POINT_CONTENT } from "../../config/end-point";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Group } from "@mantine/core";
import {
  editVacancyById,
  getVacancyById,
} from "../../store/slices/vacancySlice";
import AutoCompleteSelect from "../../components/FillForm/AutoCompleteSelect/AutoCompleteSelect";
import { getMyTests } from "../../store/slices/applySlice";

export default function EditVacancy() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAdress] = useState("");
  const [cityId, setCityId] = useState();
  const [cities, setCities] = useState([]);
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
  const { error, loading, success } = useSelector((state) => state.vacancy);
  const tests = useSelector((state) => state.apply.tests);

  useEffect(() => {
    axios.get(`${POINT_CONTENT}/api/content/vacancies/cities`).then((res) => {
      setCities(res.data);
    });
  }, []);

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
      // console.log("TEST ID VAVAVAV", tests[vacancy.testId].name);
    }
  }, [tests]);

  useEffect(() => {
    if (vacancy.id) {
      setTitle(vacancy.title);
      setCompany(vacancy.company);
      setAdress(vacancy.address);
      setCityId(vacancy.city);
      setFromSalary(vacancy.salaryFrom);
      setToSalary(vacancy.salaryTo);
      setCurrency(vacancy.currency);
      setSelectedEmpTypes(vacancy.employmentType);
      setExperience(vacancy.experience);
      setDescription(vacancy.description);
      setTestId(tests[vacancy.testId]);
    }
    console.log(vacancy);
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

  const formatCurrency = (currency) => {
    switch (currency) {
      case "$":
        return "USD";
      case "₸":
        return "KZT";
      default:
        return "";
    }
  };

  const handleSave = async () => {
    try {
      const selectedCity = cities.find((c) => c.id === cityId);
      const editedVacancyData = {
        title,
        company,
        address,
        cityId: selectedCity.id ? selectedCity.id : cityId,
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
      console.log("cityId", vacancy.city);

      // await dispatch(
      //   editVacancyById({
      //     id: vacancy.id,
      //     updatedVacancy: editedVacancyData,
      //   })
      // );

      navigate("/vacancies");
    } catch (error) {
      console.error("Error editing vacancy:", error);
    }
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
          <h1>Edit vacancy</h1>

          <h3>Основная информация</h3>
          <Input
            placeholder=""
            type="text"
            label="Job title"
            size="fieldset-lg"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Input
            placeholder=""
            type="text"
            label="Company name"
            size="fieldset-lg"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          />
          <Input
            placeholder=""
            type="text"
            label="Address"
            size="fieldset-lg"
            onChange={(e) => setAdress(e.target.value)}
            value={address}
          />

          <AutoCompleteSelect
            placeholder=""
            type="text"
            label="Город проживания"
            size="fieldset-md"
            items={cities}
            onSelect={(data) => setCityId(data.id)}
            selected={vacancy.city}
          />

          <fieldset className={"fieldset fieldset-lg"}>
            <span className="mr8">Salary</span>

            <div className="salary">
              <input
                placeholder="from"
                className="input"
                type="number"
                size="input"
                value={salaryFrom}
                onChange={(e) => setFromSalary(e.target.value * 1)}
              />
              <input
                placeholder="to"
                className="input"
                type="number"
                size="input"
                value={salaryTo}
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
              value={employmentType}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>

          {tests && (
            <fieldset className={"fieldset fieldset-sm"}>
              <label className="h1">Choose test</label>
              <Select
                placeholder="Pick value"
                data={allTests}
                value={testId}
                onChange={setTestId}
              />
            </fieldset>
          )}

          <button className="button button-primary mt24" onClick={handleSave}>
            Edit resume
          </button>
        </Paper>
      </div>
    </main>
  );
}
