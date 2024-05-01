import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Group,
  NumberInput,
  Paper,
  Select,
  TextInput,
} from "@mantine/core";
import {
  Container,
  CheckIcon,
  Divider,
  Input,
  Radio,
  RadioGroup,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import TestQuestion from "../../components/testQuestion/TestQuestion";
import { IconCircleX } from "@tabler/icons-react";
import { createTest } from "../../store/slices/testSlice";
import ErrorMessage from "../../components/Error/ErrorMessage";

export default function CreateTest() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thresholdScore, setThresholdScore] = useState("");
  const [questions, setQuestions] = useState([]);
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    description: "",
    thresholdScore: "",
    questions: [],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.test);

  // const validateForm = () => {
  //   const errors = {};
  //   const questionErrors = [];
  //   let isValid = true;

  //   if (!name) {
  //     errors.name = "Name is required";
  //     isValid = false;
  //   }

  //   if (!description) {
  //     errors.description = "Description is required";
  //     isValid = false;
  //   }

  //   if (!thresholdScore) {
  //     errors.thresholdScore = "Threshold Score is required";
  //     isValid = false;
  //   } else if (thresholdScore < 1) {
  //     errors.thresholdScore = "Threshold Score must be at least 1";
  //     isValid = false;
  //   }

  //   questions.forEach((question, index) => {
  //     if (!question.question) {
  //       questionErrors[index] = "Question is required";
  //       isValid = false;
  //     }
  //     question.answers.forEach((answer, answerIndex) => {
  //       if (!answer.answer) {
  //         if (!questionErrors[index]) {
  //           questionErrors[index] = [];
  //         }
  //         questionErrors[index][answerIndex] = "Answer is required";
  //         isValid = false;
  //       }
  //     });
  //   });

  //   setErrorMessages({
  //     ...errors,
  //     questions: questionErrors,
  //   });

  //   console.log(errorMessages);
  //   return isValid;
  // };

  const handleSave = () => {
    const data = {
      name,
      description,
      thresholdScore,
      questions: questions.map((question) => ({
        question: question.question,
        answers: question.answers.map((answer) => ({
          answer: answer.answer,
          isRight: answer.isRight,
        })),
      })),
    };

    console.log("Data: ", data);
    dispatch(createTest(data));
    navigate("/tests");
  };

  useEffect(() => {
    if (success) {
      navigate("/tests");
    }
  }, [success, navigate]);

  const addQuestion = () => {
    const newId = questions.length + 1;
    const newQuestion = {
      id: newId,
      question: "",
      answers: Array.from({ length: 4 }, () => ({
        answer: "",
        isRight: false,
      })),
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (idToRemove) => {
    setQuestions(questions.filter((question) => question.id !== idToRemove));
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].answer = value;
    setQuestions(updatedQuestions);
  };

  const handleRightAnswerChange = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.forEach((answer, index) => {
      answer.isRight = index === answerIndex;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="flex-end">
          <Button
            onClick={() => navigate("/tests")}
            variant="filled"
            color="rgba(51, 44, 44, 1)"
            mb={10}
          >
            Go to My tests
          </Button>
        </Group>

        <Paper
          mt={20}
          radius="md"
          withBorder
          p="lg"
          color="#228BE6"
          shadow="xs"
        >
          <h1>Test</h1>
          <TextInput
            mt={10}
            label="Name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextInput
            mt={10}
            label="Description"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <NumberInput
            mt={10}
            mb={10}
            label="Threshold Score"
            placeholder="Threshold Score"
            min={1}
            value={thresholdScore}
            onChange={(value) => setThresholdScore(value)}
          />

          <div>
            {questions.map((question, index) => (
              <div key={question.id}>
                <div
                  onClick={() => removeQuestion(question.id)}
                  className="cursor error flex flex-jc-end"
                >
                  <IconCircleX />
                </div>
                <TextInput
                  placeholder={`Enter question ${index + 1}`}
                  label={`Question ${index + 1}`}
                  required
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                <Divider my="sm" />
                <div className="mb20">
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex gap mb20">
                      <Radio
                        value={`q${answerIndex + 1}`}
                        icon={CheckIcon}
                        checked={answer.isRight}
                        onChange={() =>
                          handleRightAnswerChange(index, answerIndex)
                        }
                      />
                      <Input
                        variant="default"
                        placeholder={`Variant ${answerIndex + 1}`}
                        className="w-full"
                        value={answer.answer}
                        onChange={(e) =>
                          handleAnswerChange(index, answerIndex, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={addQuestion}>
            Add question
          </Button>

          {/* {Object.keys(errorMessages).map((key) => (
            <ErrorMessage title={errorMessages[key]} />
          ))} */}

          {/* {formSubmitted &&
            Object.entries(errorMessages).map(([fieldName, errorMessage]) => {
              if (Array.isArray(errorMessage)) {
                return errorMessage.map((questionError, index) => (
                  <ErrorMessage
                    key={`${fieldName}_${index}`}
                    title="Error"
                    text={`${questionError}: ${fieldName}`}
                    className="mt2 mb10"
                  />
                ));
              } else {
                return (
                  <ErrorMessage
                    key={fieldName}
                    title="Error"
                    text={`${errorMessage}: ${fieldName}`}
                    className="mt2 mb10"
                  />
                );
              }
            })} */}

          <div>
            <Button
              className="button button-primary"
              mt={20}
              onClick={handleSave}
            >
              Save and Publish
            </Button>
          </div>
        </Paper>
      </Container>
    </main>
  );
}
