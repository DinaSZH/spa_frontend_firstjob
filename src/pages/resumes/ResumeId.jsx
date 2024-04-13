import Header from "../../components/header/Header";
import MyResumes from "../../components/myresumes/MyResumes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyResumes, getResumeById } from "../../store/slices/resumeSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import arrow from "../../assets/images/arrow-left.png";
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
  IconCertificate,
} from "@tabler/icons-react";
import {
  downloadCertificationById,
  getMyCertifications,
} from "../../store/slices/testSlice";

export default function ResumeId() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const resume = useSelector((state) => state.resume.resume);
  const certifications = useSelector((state) => state.test.certifications);
  useEffect(() => {
    dispatch(getResumeById(id));
    dispatch(getMyCertifications(resume.email));
  }, []);

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="space-between">
          <Button onClick={() => navigate(`/resumes`)} variant="light" mb={10}>
            <img className="arrow link" src={arrow} alt="arrow" />
            My resumes
          </Button>
          {/* <Button
            onClick={() => navigate(`/edit-resume/${resume.id}`)}
            variant="filled"
            color="rgba(61, 61, 61, 1)"
            mb={10}
          >
            Edit resume
          </Button> */}
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
                {resume.firstname} {resume.lastname}
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
              <h2>Bio</h2>
              <div className="flex ">
                <IconMapPin className="mr10" /> {resume.city}, {resume.country}
              </div>
              <div className="flex flex-ai-c ">
                <IconCalendarMonth className="mr10" /> Birthday:{" "}
                {resume.birthdate}
              </div>
              <div className="flex flex-ai-c">
                {resume.gender === "FEMALE" ? (
                  <IconGenderFemale className="mr10" />
                ) : (
                  <IconGenderMale className="mr10" />
                )}
                Gender: {resume.gender}
              </div>
              <h2>Contacts</h2>
              <div className="flex flex-ai-c ">
                <IconMail className="mr10" /> {resume.email}
              </div>
              <div className="flex flex-ai-c">
                <IconPhone className="mr10" /> {resume.phone}
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
                <IconUserCircle color="#228BE6" size={50} className="mr10" />
                <Text size="xl" fw={800}>
                  Resume Details
                </Text>
              </div>
              <Group justify="space-between">
                <Text size="xl" fw={500}>
                  {resume.position}
                </Text>
                <h2 className="flex flex-ai-c">
                  <IconPremiumRights className="mr10" /> {resume.salary}
                  {resume.currency}
                </h2>
              </Group>
              <p>{resume.about}</p>
            </Flex>
          </div>
          <Divider my="md" />
          <div className="backgroundBlock">
            <h2 className="flex flex-ai-c">
              <IconBooks color="#228BE6" size={50} className="mr10" />
              Education
            </h2>

            {resume.education &&
              resume.education.map((item, index) => (
                <div className="flex working-history " key={index}>
                  <div className="working-history-date mr4">
                    {item.startYear} - {item.endYear}
                  </div>

                  <div className="flex flex-cl">
                    <h3 className="text">{item.instanceName}</h3>
                    <p>{item.specialization}</p>
                  </div>
                </div>
              ))}
          </div>
          <Divider my="md" />
          <div className="backgroundBlock">
            <h2 className="flex flex-ai-c">
              <IconTool color="#228BE6" size={50} className="mr10" />
              Experience
            </h2>

            {resume.experience &&
              resume.experience.map((item, index) => (
                <div className="flex working-history " key={index}>
                  <div className="working-history-date mr4">
                    {item.startDate} - {item.endDate}
                  </div>

                  <div className="flex flex-cl">
                    <h3 className="text">{item.position}</h3>
                    <h4>{item.company}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
          </div>
          <Divider my="md" />

          {resume && resume.skills && (
            <div className="backgroundBlock">
              <h2 className="flex flex-ai-c">
                <IconSettings color="#228BE6" size={50} className="mr10" />
                Skills
              </h2>

              <Flex mih={50} mt={40} gap="sm" direction="row" wrap="wrap">
                {resume.skills &&
                  resume.skills.map((skill, index) => (
                    <Chip size="md" key={index}>
                      {skill}
                    </Chip>
                  ))}
              </Flex>
            </div>
          )}

          <Divider my="md" />
          {certifications &&
            certifications.map((item, index) => (
              <div className="backgroundBlock">
                <h2 className="flex flex-ai-c">
                  <IconCertificate color="#228BE6" size={50} className="mr10" />
                  Certifications
                </h2>
                <Paper
                  radius="md"
                  withBorder
                  p="lg"
                  color="#228BE6"
                  shadow="xs"
                >
                  <Flex
                    mih={50}
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                    wrap="wrap"
                  >
                    <Text size="xl" fw={600}>
                      {item.testName}
                    </Text>
                    <Text size="md">
                      Score: {item.userScore} out of {item.totalScore}
                    </Text>

                    <Button
                      variant="light"
                      onClick={() =>
                        dispatch(downloadCertificationById(item.id))
                      }
                    >
                      Download
                    </Button>
                  </Flex>
                </Paper>
              </div>
            ))}
        </Paper>
      </Container>
    </main>
  );
}
