import Header from "../../components/header/Header";
import MyResumes from "../../components/myresumes/MyResumes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyResumes, getResumeById } from "../../store/slices/resumeSlice";
import { Link, useParams } from "react-router-dom";
import arrow from "../../assets/images/arrow-left.png";
import { Button, Flex, Group, Paper, Text } from "@mantine/core";
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
  const { id } = useParams();
  const resume = useSelector((state) => state.resume.resume);
  const certifications = useSelector((state) => state.test.certifications);
  useEffect(() => {
    dispatch(getResumeById(id));
    dispatch(getMyCertifications(resume.email));
  }, []);

  let skills = ["React", "Javascript", "Node.JS"];
  // let skills = []
  // if(resume.skills) skills = resume.skills.split(",")

  return (
    <main>
      <div className="container">
        <div className="flex flex-ai-c flex-jc-sb ptb7">
          <Button variant="outline" radius="md">
            <Link className="link" to="/resumes">
              <img className="arrow link" src={arrow} alt="arrow" />
              All resumes
            </Link>
          </Button>

          <Link
            className="button button-black"
            href={`/edit-resume/${resume.id}`}
          >
            Редактировать
          </Link>
        </div>

        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
          <div className="vacancy-container flex-cl flex mb10">
            <div className="backgroundBlock">
              <div>
                <h1 className="flex flex-ai-c">
                  <IconUserCircle color="#228BE6" size={50} className="mr10" />
                  {resume.firstname} {resume.lastname}
                </h1>
              </div>
              <div className="flex mb10">
                <IconMapPin className="mr10" /> {resume.city}, {resume.country}
              </div>
              <div className="flex flex-ai-c mb10">
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
              <div className="flex flex-ai-c mb10">
                <IconMail className="mr10" /> {resume.email}
              </div>
              <div className="flex flex-ai-c">
                <IconPhone className="mr10" /> {resume.phone}
              </div>
            </div>

            <div className="divider"></div>
            <h2 className="flex flex-ai-c">
              <IconClipboardText color="#228BE6" size={50} className="mr10" />{" "}
              Resume Details
            </h2>
            <div className="flex flex-jc-sb">
              <h2>{resume.position}</h2>
              <h2 className="flex flex-ai-c">
                <IconPremiumRights className="mr10" /> {resume.salary}
                {resume.currency}
              </h2>
            </div>
            <p>{resume.about}</p>

            <div className="divider"></div>

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
            <div className="divider"></div>

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

            <div className="divider"></div>

            {resume && resume.skills && (
              <div className="backgroundBlock">
                <h2 className="flex flex-ai-c">
                  <IconSettings color="#228BE6" size={50} className="mr10" />
                  Skills
                </h2>

                <div className="skill flex ">
                  {resume.skills.map((skill, index) => (
                    <span key={index} className="p3">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="divider"></div>
            {certifications &&
              certifications.map((item, index) => (
                <div className="backgroundBlock">
                  <h2 className="flex flex-ai-c">
                    <IconCertificate
                      color="#228BE6"
                      size={50}
                      className="mr10"
                    />
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
          </div>
        </Paper>
      </div>
    </main>
  );
}
