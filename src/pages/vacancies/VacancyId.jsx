import Header from "../../components/header/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import arrow from "../../assets/images/arrow-left.png";
import {
  IconCalendarMonth,
  IconBooks,
  IconClipboardText,
  IconGenderFemale,
  IconGenderMale,
  IconMail,
  IconMapPin,
  IconPhone,
  IconPremiumRights,
  IconUserCircle,
  IconTool,
  IconSettings,
  IconLocationSearch,
  IconBriefcase,
} from "@tabler/icons-react";
import {
  Button,
  Chip,
  Container,
  Divider,
  Flex,
  Group,
  Paper,
  Space,
  Text,
} from "@mantine/core";
import { getVacancyById } from "../../store/slices/vacancySlice";

export default function VacancyId() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const vacancy = useSelector((state) => state.vacancy.vacancy);

  useEffect(() => {
    dispatch(getVacancyById(id));
  }, []);

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="space-between">
          <Button
            onClick={() => navigate(`/search/vacancy`)}
            variant="light"
            mb={10}
          >
            <img className="arrow link" src={arrow} alt="arrow" />
            All vacancies
          </Button>
        </Group>
        <Paper radius="md" withBorder p="lg" py="xl" px="xl" mt={20}>
          <div className="backgroundBlock">
            <Flex
              gap="md"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
              mb={10}
            >
              <IconUserCircle color="#228BE6" size={50} className="mr10" />
              <Text size="xl" fw={800}>
                {vacancy.title}
              </Text>
            </Flex>
          </div>

          <div className="backgroundBlock">
            <Flex
              gap="sm"
              justify="flex-start"
              align="flex-start"
              direction="column"
              wrap="wrap"
              mb={10}
            >
              <div className="flex ">
                <IconMapPin className="mr10" /> {vacancy.city},{" "}
                {vacancy.country}
              </div>
              <div className="flex flex-ai-c ">
                <IconCalendarMonth className="mr10" /> Created date:{" "}
                {vacancy.updatedAt ? vacancy.updatedAt.split("T")[0] : ""}
              </div>
              <Text size="xl" fw={700} mt={20} mb={15}>
                Contacts
              </Text>
              <div className="flex flex-ai-c ">
                <IconBriefcase className="mr10" />
                Company: {vacancy.company}
              </div>
              <div className="flex flex-ai-c ">
                <IconMail className="mr10" />
                Email: {vacancy.hrEmail}
              </div>
              <div className="flex flex-ai-c ">
                <IconLocationSearch className="mr10" />
                Address: {vacancy.address}
              </div>
            </Flex>
          </div>

          <Divider my="md" />

          <div className="backgroundBlock">
            <Flex
              gap="sm"
              justify="flex-start"
              align="flex-start"
              direction="column"
              wrap="wrap"
              mb={10}
            >
              <div className="flex flex-ai-c">
                <IconClipboardText color="#228BE6" size={50} className="mr10" />{" "}
                <Text size="xl" fw={800}>
                  Vacancy Details
                </Text>
              </div>
            </Flex>
            <Group justify="space-between">
              <h2>{vacancy.title}</h2>
              <h2 className="flex flex-ai-c">
                <IconPremiumRights className="mr10" /> {vacancy.salaryFrom}-
                {vacancy.salaryTo} {vacancy.currency}
              </h2>
            </Group>
            <Flex
              gap="sm"
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
              mb={10}
            >
              <IconTool className="mr10" />
              Experience: <p className="box">{vacancy.experience}</p>{" "}
            </Flex>
            <Flex
              gap="sm"
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
              mb={10}
            >
              <IconBooks className="mr10" />{" "}
              <span className="mr10">Employment Type: </span>
              {vacancy.employmentType &&
                vacancy.employmentType.map((item, index) => (
                  <p className="box" key={index}>
                    {item}
                  </p>
                ))}
            </Flex>
            <h3>Description</h3>
            <p>{vacancy.description}</p>
          </div>
          <Divider my="md" />
        </Paper>
      </Container>
    </main>
  );
}
