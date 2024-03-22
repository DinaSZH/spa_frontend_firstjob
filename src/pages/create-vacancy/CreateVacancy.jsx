import Input from '../../components/FillForm/input/input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalAddExp from '../../components/FillForm/ModalAddExp/ModalAddExp';
import WorkingHistory from '../../components/FillForm/WorkingHistory/WorkingHistory';
import AddEducation from '../../components/FillForm/AddEducation/AddEducation';
import SelectEmploymentTypes from '../../components/FillForm/SelectEmploymentTypes/SelectEmploymentTypes';
import { Link, useNavigate } from 'react-router-dom';
import { Paper, Select } from '@mantine/core';
import { END_POINT } from '../../config/end-point';
import {
  useQuery, useQueryClient,
} from '@tanstack/react-query'
import { MultiSelect } from '@mantine/core';
import EducationItem from '../../components/EducationItem/EducationItem';
import { createResume } from '../../store/slices/resumeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Group } from '@mantine/core';

export default function CreateVacancy() {

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAdress] = useState("");
    const [cityId, setCityId] = useState("");
    const [fromSalary, setFromSalary] = useState(0);
    const [toSalary, setToSalary] = useState(0);
    const [currency, setCurrency] = useState("KZT");
    const [employmentTypes, setSelectedEmpTypes] = useState([]);
    const [experience, setExperience] = useState("");
    const [description, setDescription] = useState("");
    const [allEmploymentTypes, setEmploymentTypes] = useState(['Full time', 'Remote']);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading, success } = useSelector(
      (state) => state.resume
    )

    const { isPending, isError, data: cities } = useQuery({
      queryKey: ['cities'],
      queryFn: async () => {
        const response = await fetch(`${END_POINT}/api/client-app/resumes/cities`);
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        const citiesData = await response.json();
        // Преобразование данных городов в формат, ожидаемый компонентом Select
        const transformedCities = citiesData.map(city => ({
          value: city.id,
          label: city.name
        }));
        return transformedCities;
      },
    });

  //   useEffect(() => {
  //     axios.get(`${END_POINT}/api/client-app/resumes/skills`).then(res => {
  //       const skillsData = res.data;
  //       setSkills(skillsData.map(skill => ({
  //         value: skill.id,
  //         label: skill.name
  //       })));
  //      })

  //     axios.get(`${END_POINT}/api/client-app/resumes/employment-types`).then(res => {
  //       setEmploymentTypes(res.data)
  //     })
  // }, [])


    const handleSave = ()=> {
      dispatch(createResume({
        title,
        company,
        address,
        cityId,
        fromSalary,
        toSalary,
        currency,
        employmentTypes,
        experience,
        description,
      }))  
    }

    useEffect(() => {
      if(success){
        navigate('/vacancies')
      }
    }, [success])

  return (
    <main>
      <div className="container p7">
        <div className='flex flex-jc-end mb10'>
          <Link className='button button-black ' to="/vacancies">Back</Link>
        </div>
        <Paper radius="md" withBorder p="lg" color='#228BE6' shadow="xs">
        <h1>Add new vacancy</h1>

        <h3>Основная информация</h3>
    
        <Input placeholder="" type="text" label="Job title" size="fieldset-lg" onChange={(e) => setTitle(e.target.value)}/> 
        <Input placeholder="" type="text" label="Company name" size="fieldset-lg" onChange={(e) => setCompany(e.target.value)}/> 
        <Input placeholder="" type="text" label="Address" size="fieldset-lg" onChange={(e) => setAdress(e.target.value)}/> 
    
       <fieldset className={"fieldset fieldset-sm"} >
            <label className='h1'>City of residence</label>
            <Select
            placeholder="Search city"
            data={cities}
            searchable
            value={cityId} 
            onChange={setCityId} 
            nothingFoundMessage="Nothing found..."
            className={"fieldset fieldset-sm h3" } 
          />
        </fieldset>

        <fieldset className={"fieldset fieldset-lg" } >
            <span className='mr8'>Salary</span>

            <div className='salary'>
                <input placeholder="from" className='input' type="number" size="input" value={fromSalary} onChange={e => setFromSalary(e.target.value*1)}/>
                <input placeholder="to" className='input' type="number" size="input" value={toSalary} onChange={e => setToSalary(e.target.value*1)}/>
                <Select
                className='w-full'
                placeholder="currency"
                data={['KZT', 'USD', 'RUB']}
                value={currency} 
                onChange={setCurrency} 
                />
            </div>           
        </fieldset>

        <fieldset className={"fieldset fieldset-sm"} >
            <label className='h1'>Employment type</label>
            <Select
              placeholder="Pick value"
              data={['Full time', 'Remote']}
              value={currency} 
              onChange={setCurrency} 
            />
        </fieldset>

        <h3>Choose employment type</h3>
        <fieldset className={"fieldset fieldset-sm"}>
            <label className='h1'>Employment type</label>
            <div className='h1'>
                <Checkbox.Group>
                    {allEmploymentTypes.map((type) =>
                        <Group mt="xs" key={type.id}>
                            <Checkbox value={type.id} label={type.name} className='h1'
                            checked={employmentTypes.includes(type.id)}
                            onChange={(e) => {
                                const checked = e.currentTarget.checked;
                                setSelectedEmpTypes(prevState => {
                                    if (checked) {
                                        return [...prevState, type.id];
                                    } else {
                                        return prevState.filter(item => item !== type.id);
                                    }
                                });
                            }} />
                        </Group>
                    )}
                </Checkbox.Group>
            </div>
        </fieldset>


        <fieldset className={"fieldset fieldset-sm"} >
            <label className='h1'>Experience</label>
            <Select
              placeholder="Pick value"
              data={['No experience', 'Less than year', '1-3 years', '3-6 years', '6+ years']}
              value={experience} 
              onChange={setExperience} 
            />
        </fieldset>

        <fieldset className={"fieldset fieldset-lg"} >
            <label>Description</label>
            <textarea className="textarea" placeholder="Vacancy description" onChange={(e) => setDescription(e.target.value)} />
        </fieldset>


        <button className='button button-primary' onClick={handleSave}>Save and upload</button>
        </Paper>
      </div>
     
      
    </main>
  )
}