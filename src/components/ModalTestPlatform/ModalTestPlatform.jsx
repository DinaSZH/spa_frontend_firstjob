import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Divider,
  Title,
  Text,
  Container,
  Center,
  Loader,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitPlatformTest } from "../../store/slices/testSlice";

export default function ModalTestPlatform({
  opened,
  close,
  fullTestData,
  loading,
}) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [
    openedSecondModal,
    { open: openSecondModal, close: closeSecondModal },
  ] = useDisclosure(false);
  const dispatch = useDispatch();
  const handleAnswerChange = (questionId, answerId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerId });
  };

  const handleSubmit = () => {
    const allQuestionsAnswered =
      fullTestData.questions &&
      fullTestData.questions.every(
        (question) => selectedAnswers[question.id] !== undefined
      );

    if (allQuestionsAnswered) {
      const formattedAnswers = Object.entries(selectedAnswers).map(
        ([questionId, answerId]) => ({
          questionId: parseInt(questionId),
          answerId: parseInt(answerId),
        })
      );

      dispatch(
        submitPlatformTest({
          id: fullTestData.id,
          answers: formattedAnswers,
        })
      );
      close();
      closeSecondModal();
    } else {
      openSecondModal();
    }
  };

  const handleOnClose = () => {
    openSecondModal();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleOnClose}
        title="Please answer to all questions and click submit button"
        fullScreen
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        {loading ? (
          <>
            <Center h={500}>
              <Loader color="blue" size={100} />
            </Center>
          </>
        ) : (
          <Container size="lg" py="xl">
            <div>
              {fullTestData.title && (
                <div className="h2 mb20">{fullTestData.title}</div>
              )}
              {fullTestData.description && (
                <div className="h2 mb20">{fullTestData.description}</div>
              )}
              {fullTestData.thresholdScore && (
                <div className="flex mb20">
                  <span className="h3">Threshold Score: </span>
                  <span className="text">{fullTestData.thresholdScore}</span>
                </div>
              )}
              {fullTestData.totalScore && (
                <div className="flex mb20">
                  <span className="h3">Total Score: </span>
                  <span className="text"> {fullTestData.totalScore}</span>
                </div>
              )}
            </div>

            {fullTestData.questions &&
              fullTestData.questions.map((dataQuest, index) => (
                <div key={dataQuest.id} className="radio-wrapper">
                  <div className="radio-wrapper">
                    <Title order={2}>
                      {index + 1}. {dataQuest.question}
                    </Title>
                  </div>
                  <Divider my="sm" />
                  <div className="mb20">
                    {dataQuest.answers.map((answer) => (
                      <div key={answer.id} className="flex border-gray p2 mb20">
                        <input
                          type="radio"
                          id={`question_${dataQuest.id}_answer_${answer.id}`}
                          name={`question_${dataQuest.id}`}
                          value={answer.id}
                          checked={selectedAnswers[dataQuest.id] === answer.id}
                          onChange={() =>
                            handleAnswerChange(dataQuest.id, answer.id)
                          }
                          className="mr10"
                        />
                        <label
                          htmlFor={`question_${dataQuest.id}_answer_${answer.id}`}
                        >
                          <Text size="md">{answer.answer}</Text>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            <div className="flex flex-jc-end">
              <Button
                variant="filled"
                color="green"
                size="md"
                onClick={handleSubmit}
              >
                Submit test
              </Button>
            </div>
          </Container>
        )}
      </Modal>

      <Modal
        opened={openedSecondModal}
        onClose={closeSecondModal}
        centered
        title="Complete the test"
      >
        <div className="h2 flex flex-jc-c flex-ai-c link">
          Complete the test
        </div>
        <div style={{color:"red"}} className="h2 mb20 flex flex-jc-c flex-ai-c">
          You have to answer all questions before submitting.
        </div>
      </Modal>
    </>
  );
}
