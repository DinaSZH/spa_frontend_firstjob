import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { CheckIcon, Divider, Input, Radio, RadioGroup } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import TestQuestion from "../../components/testQuestion/TestQuestion";
import { IconCircleX } from "@tabler/icons-react";
import { createTest } from "../../store/slices/applySlice";

export default function CreateTest() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thresholdScore, setThresholdScore] = useState("");
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.resume);

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
  };

  useEffect(() => {
    if (success) {
      navigate("/tests");
    }
  }, [success, navigate]);

  const addQuestion = () => {
    const newId = questions.length + 1;
    const newQuestion = {
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
      <div>
        <div className="container p7">
          <div className="flex flex-jc-end">
            <Link className="button button-black " to="/tests">
              Back
            </Link>
          </div>

          <div className="border-gray p4 mt24">
            <h1>Test</h1>
            <div className="mb10 ">
              <TextInput
                label="Name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb10">
              <TextInput
                label="Description"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb20">
              <NumberInput
                label="Threshold Score"
                placeholder="Threshold Score"
                min={1}
                value={thresholdScore}
                onChange={(value) => setThresholdScore(value)}
              />
            </div>

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
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
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
                            handleAnswerChange(
                              index,
                              answerIndex,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addQuestion}>
                Add question
              </Button>
            </div>

            <Button className="button button-primary mt24" onClick={handleSave}>
              Save and Publish
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
