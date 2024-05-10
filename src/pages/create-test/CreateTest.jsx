import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Group,
  NumberInput,
  Paper,
  TextInput,
  Text,
} from "@mantine/core";
import {
  Container,
  CheckIcon,
  Divider,
  Input,
  Radio,
  RadioGroup,
} from "@mantine/core";
import { useDispatch } from "react-redux";

import { IconCircleX } from "@tabler/icons-react";
import { createTest } from "../../store/slices/testSlice";
import { Toaster, toast } from "react-hot-toast";

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
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    try {
      dispatch(createTest(data));
      navigate("/tests");
    } catch {
      toast.error(
        "An error occurred while creating the test, please contact technical support!"
      );
    }
  };

  const isQuestionValid = (question) => {
    return question.answers.some((answer) => answer.isRight);
  };

  const updateFormValidity = () => {
    const isValid =
      name.trim() !== "" &&
      description.trim() !== "" &&
      thresholdScore !== "" &&
      questions.length > 0 &&
      questions.every(
        (question) =>
          question.question.trim() !== "" && isQuestionValid(question)
      );

    setIsFormValid(isValid);
  };

  useEffect(() => {
    updateFormValidity();
  }, [name, description, thresholdScore, questions]);

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
          <Text fw={400} color="red" size="md" mt="sm">
            * Fill all required fields
          </Text>
          <TextInput
            mt={10}
            label="Name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextInput
            mt={10}
            label="Description"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <NumberInput
            mt={10}
            mb={10}
            label="Threshold Score"
            placeholder="Threshold Score"
            min={1}
            value={thresholdScore}
            onChange={(value) => setThresholdScore(value)}
            required
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
                <Text fw={400} color="red" size="md" mb="sm">
                    * Be sure to choose the correct answer
                  </Text>
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

          <Toaster />

          <div>
            <Button
              className="button button-primary"
              mt={20}
              onClick={handleSave}
              disabled={!isFormValid}
            >
              Save and Publish
            </Button>
          </div>
        </Paper>
      </Container>
    </main>
  );
}
