import { Button, CheckIcon, Divider, Input, Radio, RadioGroup, TextInput } from "@mantine/core";
import React, { useState } from "react";

export default function TestQuestion({questions, setQuestions}) {

  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, question: "", answers: [] }]);
  };

  const removeQuestion = (idToRemove) => {
    setQuestions(questions.filter(question => question.id !== idToRemove));
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].value = value;
    setQuestions(updatedQuestions);
  };

  const handleRightAnswerChange = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.forEach((answer, index) => {
      if (index === answerIndex) {
        answer.isRight = true;
      } else {
        answer.isRight = false;
      }
    });
    setQuestions(updatedQuestions);
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
                required
                value={question.value}
                onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[questionIndex].value = e.target.value;
                setQuestions(updatedQuestions); }}
                />
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

// import React from 'react';
// import { Button, CheckIcon, Divider, Input, Radio, RadioGroup, TextInput } from '@mantine/core';

// export default function TestQuestion({ questions, setQuestions }) {
//   const addQuestion = () => {
//     const newId = questions.length + 1;
//     setQuestions([...questions, { id: newId, question: "", answers: [{ id: 1, value: '', isRight: false }] }]);
//   };

//   const removeQuestion = (idToRemove) => {
//     setQuestions(questions.filter(question => question.id !== idToRemove));
//   };

//   const handleQuestionChange = (questionIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].question = value;
//     setQuestions(updatedQuestions);
//   };

//   const addAnswer = (questionIndex) => {
//     const updatedQuestions = [...questions];
//     const answers = updatedQuestions[questionIndex].answers || [];
//     const newId = answers.length + 1;
//     updatedQuestions[questionIndex].answers = [...answers, { id: newId, value: '', isRight: false }];
//     setQuestions(updatedQuestions);
//   };

//   const removeAnswer = (questionIndex, answerIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.filter((answer) => answer.id !== answerIndex);
//     setQuestions(updatedQuestions);
//   };

//   const handleAnswerChange = (questionIndex, answerIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].answers[answerIndex].value = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleRightAnswerChange = (questionIndex, answerIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].answers.forEach((answer, index) => {
//       if (index === answerIndex) {
//         answer.isRight = true;
//       } else {
//         answer.isRight = false;
//       }
//     });
//     setQuestions(updatedQuestions);
//   };

//   return (
//     <div>
//       {questions.map((question, questionIndex) => (
//         <div key={question.id} className="radio-wrapper">
//           <div className="radio-wrapper">
//             <div onClick={() => removeQuestion(question.id)} style={{ color: "red", cursor: "pointer" }}>x</div>
//             <TextInput
//               placeholder={`Enter question ${questionIndex + 1}`}
//               label={`Question ${questionIndex + 1}`}
//               required
//               value={question.question}
//               onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
//             />
//           </div>
//           <Divider my="sm" />
//           <RadioGroup value={question.value} onChange={() => {}}>
//             <div className="mb20">
//               <div className="flex gap flex-cl">
//                 {question.answers.map((answer, answerIndex) => (
//                   <div key={answer.id} className="flex">
//                     <Radio
//                       value={answer.value}
//                       onChange={(value) => handleAnswerChange(questionIndex, answerIndex, value)}
//                       icon={CheckIcon}
//                       checked={answer.isRight}
//                     />
//                     <Input
//                       variant="default"
//                       placeholder="variant"
//                       className="w-full"
//                       value={answer.value}
//                       onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
//                     />
//                     <Button
//                       variant={answer.isRight ? "outline" : "light"}
//                       onClick={() => handleRightAnswerChange(questionIndex, answerIndex)}
//                     >
//                       Right
//                     </Button>
//                     <Button
//                       variant="outline"
//                       onClick={() => removeAnswer(questionIndex, answer.id)}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </RadioGroup>
//           <Button variant="outline" onClick={() => addAnswer(questionIndex)}>
//             Add Answer
//           </Button>
//         </div>
//       ))}
//       <Button variant="outline" onClick={addQuestion}>
//         Add question
//       </Button>
//     </div>
//   );
// }