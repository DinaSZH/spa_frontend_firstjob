
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import TestQuestion from '../../components/testQuestion/TestQuestion';

export default function CreateTest() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [thresholdScore, setThresholdScore] = useState();
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading, success } = useSelector(
      (state) => state.resume
    )


    const handleSave = ()=> {
      const data = {
        name,
        description,
        thresholdScore,
        questions,
      }

      console.log("Data: ", data);
    //   dispatch(createTest({
    //   }))  
    }

    useEffect(() => {
      if(success){
        navigate('/resumes')
      }
    }, [success])

  return (
    <main>
      <div className='container-background'>
      <div className="container p7">
        <div className='flex flex-jc-end'>
          <Link className='button button-black ' to="/resumes">Back</Link>
        </div>
        <h1>Test</h1>

        <div className='mb10'>
          <TextInput
            label="Name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            //error="both below the input"
            inputWrapperOrder={['label', 'input', 'description', 'error']}/>
        </div>

        <div className='mb10'>
            <TextInput
              label="Description"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              //error="both below the input"
              inputWrapperOrder={['label', 'input', 'description', 'error']}/>
          </div>

        <div className='mb20'>
            <NumberInput
                label="Threshold Score"
                placeholder="Threshold Score"
                min={1}
                value={thresholdScore}
              onChange={setThresholdScore}
              />
        </div>


        <TestQuestion questions={questions} setQuestions={setQuestions} />


        <button className='button button-primary mt24' onClick={handleSave}>Сохранить и опубликовать</button>
      </div>
      </div>
     
      
    </main>
  )
}