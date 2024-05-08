import { createApplyVacancy } from "../../../store/slices/applySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendarMonth,
  IconDiscountCheck,
  IconLicense,
  IconMapPin,
  IconPremiumRights,
  IconTool,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import KeycloakService from "../../../services/KeycloakService";
import { Button, Center, Loader, Modal, Radio } from "@mantine/core";
import ModalTest from "../../ModalTest/ModalTest";
import { getTestPreview } from "../../../store/slices/testSlice";
import { deleteVacancyById, getAllAuthVacancies } from "../../../store/slices/vacancySlice";
import { Chip, Flex, Group, Paper } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Toaster, toast } from "react-hot-toast";

export default function MyVacancy({ item }) {
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes);
  const { loading } = useSelector((state) => state.apply);
  const { loadingTest } = useSelector((state) => state.test);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedTest, { open: openTest, close: closeTest }] =
    useDisclosure(false);
  const [openedApply, { open: openApply, close: closeApply }] =
    useDisclosure(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const testPreviewData = useSelector((state) => state.test.test);
  const fullTestData = useSelector((state) => state.test.fullTest);
  const fullTestMain = useSelector((state) => state.apply.testMain);
  const [isUserVacancy, setIsUserVacancy] = useState(false);
  const [selectedResume, setSelectedResume] = useState();

  useEffect(() => {
    if (openedTest) {
      close();
    }
  }, [openedTest]);

  useEffect(() => {
    dispatch(getAllAuthVacancies())
    const userId = KeycloakService.getEmail();
    setIsUserVacancy(item.hrEmail === userId);
  }, [item, item.applicationStatus]);

  useEffect(() => {
    renderApplicationStatus();
  }, [item.applicationStatus]);

  const handleApply = async () => {
    try {
      if (item.testId) {
        dispatch(getTestPreview(item.testId));
        open();
        closeApply();
      } else {
        dispatch(createApplyVacancy({ id: item.id, resumeId: selectedResume }))
          .then(() => setApplicationStatus("APPLIED"))
          .catch((error) => console.error("Error applying to vacancy:", error));
        closeApply();
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };

  const handleGoTest = async () => {
    try {
      if (item.testId) {
        dispatch(createApplyVacancy({ id: item.id, resumeId: selectedResume }));
        openTest();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderApplicationStatus = () => {
    if (item.applicationStatus === null && KeycloakService.getUserRole()) {
      return (
        <Button
          variant="filled"
          color="green"
          size="sm"
          radius="xl"
          onClick={openApply}
        >
          Apply <IconDiscountCheck className="ml1" />
        </Button>
      );
    } else if (item.applicationStatus === "APPLIED") {
      return (
        <span style={{ color: "green" }}>You have successfully applied!</span>
      );
    } else if (item.applicationStatus === "TEST_FAILED") {
      return <span style={{ color: "gray" }}>You failed the test!</span>;
    } else if (item.applicationStatus === "INVITED") {
      return (
        <span style={{ color: "#5FA6FA" }}>You invited to a vacancy!</span>
      );
    } else if (item.applicationStatus === "DECLINED") {
      return (
        <span style={{ color: "red" }}>
          Unfortunately you received a decline!
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Paper withBorder shadow="xl" p="xl" my={20}>
        <Group justify="space-between">
          <Flex mih={50} gap="md" justify="center" direction="row" wrap="wrap">
            <IconLicense className="mr10" size={50} />
            <Link className="h2 link" to={`/vacancies/${item.id}`}>
              {item.title}
            </Link>
          </Flex>
          <Flex mih={50} gap="sm" align="center" direction="row" wrap="wrap">
            {KeycloakService.getUserRole() && renderApplicationStatus()}
            {KeycloakService.getHRRole() && isUserVacancy && (
              <div className="flex gap10">
                <Chip
                  color="gray"
                  variant="light"
                  size="md"
                  defaultChecked
                  icon={<IconEdit style={{ width: 16, height: 16 }} />}
                  onClick={() => navigate(`/vacancy/edit/${item.id}`)}
                >
                  Edit
                </Chip>
                <Chip
                  icon={<IconTrash style={{ width: 16, height: 16 }} />}
                  color="red"
                  variant="light"
                  size="md"
                  onClick={async () => {
                    try {
                      await dispatch(deleteVacancyById(item.id));
                      toast.success("Vacancy deleted successfully!");
                    } catch (error) {
                      toast.error("Error deleting vacancy!");
                    }
                  }}
                  defaultChecked
                >
                  Delete
                </Chip>
              </div>
            )}
          </Flex>
        </Group>
        <Flex mt={10} gap="sm" direction="column" wrap="wrap">
          <div className="flex flex-ai-c">
            <IconPremiumRights className="mr10" /> {item.salaryFrom}-{" "}
            {item.salaryTo} {item.currency}
          </div>
          <div className="flex">
            <IconMapPin className="mr10" /> {item.city}, {item.country}
          </div>
        </Flex>
        <Group justify="space-between">
          <div className="flex">
            <IconTool className="mr10" />
            {item.experience}
          </div>
          <div className="flex flex-ai-c">
            <IconCalendarMonth className="mr10" />
            <p>{item.createdAt ? item.createdAt.split("T")[0] : ""}</p>
          </div>
        </Group>
      </Paper>
      <Modal opened={opened} onClose={close} title="Test preview" centered>
        {loadingTest ? (
          <Center mih={200}>
            <Loader color="blue" size={50} />
          </Center>
        ) : (
          <>
            <div className="h2 link">
              You need to pass a test in order to apply for a vacancy
            </div>
            {testPreviewData.title && (
              <div className="flex">
                <h3 className="mr10">Title: </h3>
                <p>{testPreviewData?.title}</p>
              </div>
            )}
            {testPreviewData.description && (
              <div className="flex">
                <h3 className="mr10">Description: </h3>
                <p> {testPreviewData?.description}</p>
              </div>
            )}
            {testPreviewData.thresholdScore && (
              <div className="flex">
                <h3 className="mr10">Threshold Score: </h3>
                <p> {testPreviewData?.thresholdScore}</p>
              </div>
            )}
            {testPreviewData.totalScore && (
              <div className="flex">
                <h3 className="mr10">Total Score: </h3>
                <p> {testPreviewData?.totalScore}</p>
              </div>
            )}
            <div className="flex gap flex-end flex-jc-end">
              <Button
                onClick={handleGoTest}
              >
                Go to test
              </Button>
            </div>
          </>
        )}
      </Modal>
      <ModalTest
        opened={openedTest}
        close={closeTest}
        fullTestData={fullTestMain}
        item={item}
        resumeId={selectedResume}
      />
      <Modal
        opened={openedApply}
        onClose={closeApply}
        centered
        title="Apply for vacancy"
      >
        <div className="h2 flex link mb20">Resumes for apply</div>
        {resumes.length > 0 ? (
          <Radio.Group
            value={selectedResume}
            onChange={setSelectedResume}
            name="select resume"
            withAsterisk
            className="mb10 h4"
          >
            {resumes.map((resume) => (
              <Radio
                key={resume.id}
                value={resume.id}
                label={resume.position}
                className="mb10"
              />
            ))}
          </Radio.Group>
        ) : (
          <p>There are no resumes available. Create a Resume to Apply.</p>
        )}

        {resumes.length > 0 && (
          <div className="flex flex-jc-end flex-ai-c mb20">
            <Button
              variant="outlined"
              color="green"
              size="md"
              onClick={handleApply}
              disabled={!selectedResume}
            >
              Apply
            </Button>
          </div>
        )}
      </Modal>
      <Toaster />
    </>
  );
}
