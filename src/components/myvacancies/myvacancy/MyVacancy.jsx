import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import { Link } from "react-router-dom";
import KeycloakService from "../../../services/KeycloakService";
import { Button, Modal, Radio, Text } from "@mantine/core";
import ModalTest from "../../ModalTest/ModalTest";
import { POINT_CONTENT } from "../../../config/end-point";
import { deleteVacancyById } from "../../../store/slices/newsSlice";
import { getTestPreview } from "../../../store/slices/testSlice";

export default function MyVacancy({ item }) {
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes);

  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedTest, { open: openTest, close: closeTest }] =
    useDisclosure(false);
  const [openedApply, { open: openApply, close: closeApply }] =
    useDisclosure(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const testPreviewData = useSelector((state) => state.test.test);
  const fullTestData = useSelector((state) => state.test.fullTest);
  const [isUserVacancy, setIsUserVacancy] = useState(false);
  const [selectedResume, setSelectedResume] = useState();

  useEffect(() => {
    if (openedTest) {
      close();
    }
  }, [openedTest]);

  useEffect(() => {
    const userId = KeycloakService.getEmail();
    setIsUserVacancy(item.hrEmail === userId);
  }, [item, item.applicationStatus]);

  useEffect(() => {
    renderApplicationStatus();
  }, [item.applicationStatus]);

  const handleApply = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleGoTest = async () => {
    setLoading(true);
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
    if (item.applicationStatus === null) {
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
    } else {
      return null;
    }
  };

  // const renderActions = () => {
  //   if (KeycloakService.getHRRole() && isUserVacancy) {
  //     return (
  //       <div className="flex">
  //         <Link to={`/vacancy/edit/${item.id}`}>
  //           <span className="button-edit">Edit</span>
  //         </Link>
  //         <span
  //           className="button-delete"
  //           onClick={() => dispatch(deleteVacancyById(item.id))}
  //         >
  //           Delete
  //         </span>
  //       </div>
  //     );
  //   } else if (KeycloakService.getUserRole()) {
  //     return renderApplicationStatus();
  //   } else {
  //     return <div className="flex"></div>;
  //   }
  // };

  return (
    <div className="card mtb4">
      <div className="flex flex-ai-c resume-title flex-jc-sb">
        <div className="flex">
          <IconLicense className="mr10" size={50} />
          <Link className="h2 link" to={`/vacancies/${item.id}`}>
            {item.title}
          </Link>
        </div>
        {KeycloakService.getUserRole() && renderApplicationStatus()}
        {KeycloakService.getHRRole() && isUserVacancy && (
          <div className="flex">
            <Link to={`/vacancy/edit/${item.id}`}>
              <span className="button-edit">Edit</span>
            </Link>
            <span
              className="button-delete"
              onClick={() => dispatch(deleteVacancyById(item.id))}
            >
              Delete
            </span>
          </div>
        )}
      </div>
      <h2 className="flex flex-ai-c">
        <IconPremiumRights className="mr10" /> {item.salaryFrom}-{" "}
        {item.salaryTo} {item.currency}
      </h2>
      <div className="flex mb10">
        <IconMapPin className="mr10" /> {item.city}, {item.country}
      </div>
      <div className="skill flex flex-ai-c ">
        <div className="flex">
          <IconTool className="mr10" />
          {item.experience}
        </div>
        <div className="date flex">
          <IconCalendarMonth />
          <p>{item.createdAt ? item.createdAt.split("T")[0] : ""}</p>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Test preview" centered>
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
            //loading={loading}
          >
            Go to test
          </Button>
        </div>
      </Modal>
      <ModalTest
        opened={openedTest}
        close={closeTest}
        fullTestData={fullTestData}
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
    </div>
  );
}
