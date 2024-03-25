import { Button, CheckIcon, Divider, Input, Radio, RadioGroup, TextInput } from "@mantine/core";
import React, { useState } from "react";

export default function TestQuestion({ title, question }) {
  const [questions, setQuestions] = useState([{ id: 1, value: "" }]);

  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, value: "" }]);
  };

  const removeQuestion = (idToRemove) => {
    setQuestions(questions.filter(question => question.id !== idToRemove));
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={question.id} className="radio-wrapper">
            <div className="radio-wrapper">
                <div onClick={() => removeQuestion(question.id)} color="red" className="remove-button">
                    x
                </div> 
                <TextInput
                placeholder={`Enter question ${index + 1}`}
                label={`Question ${index + 1}`}
                required/>
            </div>
          <Divider my="sm" />
          <RadioGroup value={question.value} onChange={(value) => {
            const updatedQuestions = [...questions];
            updatedQuestions[index].value = value;
            setQuestions(updatedQuestions);
          }}>
            <div className="mb20">
              <div className="flex gap flex-cl">
                <div className="flex">
                  <Radio value="q1" icon={CheckIcon} className="radio-wrapper" />
                  <Input variant="default" placeholder="variant" className="w-full" />
                </div>
                <div className="flex">
                  <Radio value="q2" icon={CheckIcon} className="radio-wrapper" />
                  <Input variant="default" placeholder="variant" className="w-full" />
                </div>
                <div className="flex">
                  <Radio value="q3" icon={CheckIcon} className="radio-wrapper" />
                  <Input variant="default" placeholder="variant" className="w-full" />
                </div>
                <div className="flex">
                  <Radio value="q4" icon={CheckIcon} className="radio-wrapper" />
                  <Input variant="default" placeholder="variant" className="w-full" />
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      ))}
      <Button variant="outline" onClick={addQuestion}>
        Add question
      </Button>
    </div>
  );
}