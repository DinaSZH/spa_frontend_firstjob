import Input from '../../components/FillForm/input/input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalAddExp from '../../components/FillForm/ModalAddExp/ModalAddExp';
import WorkingHistory from '../../components/FillForm/WorkingHistory/WorkingHistory';
import AddEducation from '../../components/FillForm/AddEducation/AddEducation';
import SelectEmploymentTypes from '../../components/FillForm/SelectEmploymentTypes/SelectEmploymentTypes';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Select } from '@mantine/core';
import { END_POINT } from '../../config/end-point';
import {
  useQuery, useQueryClient,
} from '@tanstack/react-query'
import { MultiSelect } from '@mantine/core';
import EducationItem from '../../components/EducationItem/EducationItem';
import { createResume } from '../../store/slices/resumeSlice';
import { useDispatch, useSelector } from 'react-redux';
import TestQuestion from '../../components/testQuestion/TestQuestion';

export default function CreateTest() {

    const [question, setQuestion] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading, success } = useSelector(
      (state) => state.resume
    )


    const handleSave = ()=> {
    //   dispatch(createResume({
    //     gender,
    //     city,
    //     position,
    //     skills: skills.map(skill => skill.value),
    //     salary,
    //     currency,
    //     experience,
    //     about,
    //     education,
    //     employmentType: employmentType.map(type => type.value),
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

        <TestQuestion />


        <button className='button button-primary mt24' onClick={handleSave}>Сохранить и опубликовать</button>
      </div>
      </div>
     
      
    </main>
  )
}