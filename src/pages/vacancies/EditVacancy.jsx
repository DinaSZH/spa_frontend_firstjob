import Input from '../../components/FillForm/input/input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalAddExp from '../../components/FillForm/ModalAddExp/ModalAddExp';
import WorkingHistory from '../../components/FillForm/WorkingHistory/WorkingHistory';
import AddEducation from '../../components/FillForm/AddEducation/AddEducation';
import SelectEmploymentTypes from '../../components/FillForm/SelectEmploymentTypes/SelectEmploymentTypes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Paper, Select } from '@mantine/core';
import { END_POINT } from '../../config/end-point';
import {
  useQuery, useQueryClient,
} from '@tanstack/react-query'
import { MultiSelect } from '@mantine/core';
import EducationItem from '../../components/EducationItem/EducationItem';
import { createResume, editResumeById, getResumeById } from '../../store/slices/resumeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Group } from '@mantine/core';
import { editVacancyById } from '../../store/slices/vacancySlice';

export default function EditVacancy() {
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
    const dispatch  = useDispatch()
    const {id} = useParams();
    const resume = useSelector(state => state.resume.resume)
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

    useEffect(() => {
      axios.get(`${END_POINT}/api/client-app/resumes/skills`).then(res => {
        const skillsData = res.data;
        setSkills(skillsData.map(skill => ({
          value: skill.id,
          label: skill.name
        })));
       })

      axios.get(`${END_POINT}/api/client-app/resumes/employment-types`).then(res => {
        setEmploymentTypes(res.data)
      })
  }, [])

    
    const closeModalExp = () => {
      setModalExpIsOpen(false)
   }

   const closeModalEdu = () => {
    setModalEduIsOpen(false)
 }

   const addWorkingHistory = (item) => {
    setExperience([...experience, item])
      closeModalExp()
   }

   const addEducation = (item) => {
    setEducation([...education, item])
      closeModalEdu()
   }

   const removeWorkingHistory = (workingHistory) => {
      let wh= [...experience]
      let index = experience.indexOf(workingHistory)
      wh.splice(index,1);
      setExperience(wh)
   }

   const removeEducation = (education) => {
    let ed= [...education]
    let index = education.indexOf(education)
    ed.splice(index,1);
    setEducation(ed)
 }

    const handleGenderChange = (e) => {
      setGender(e.target.value)
     }
     
     const onSkillsChange = (data) => {
      setSelectedSkills(data.map(skill => skill.label)); // Store only the label (name) of selected skills
    }

    useEffect(() => {
      dispatch(getResumeById(id))
  }, [])

    useEffect(() => {
      if(resume.id){
        setTitle(resume.gender)
        setCityId(resume.cityId)
        setPosition(resume.position)
        setSelectedSkills(resume.skills)
        setSalary(resume.salary)
        setCurrency(resume.currency)
        setExperience(resume.experience)
        setAbout(resume.about)
        setEducation(resume.education)
        setSelectedEmpTypes(resume.employmentType.map(et=> et.id))
        }
        console.log("CITYY", resume.city)
  }, [resume])


  const handleSave = () => {
    dispatch(editVacancyById({
      id: resume.id,
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
        <h1>Edit vacancy</h1>

        <h3>Основная информация</h3>
        <Input placeholder="" type="text" label="Job title" size="fieldset-lg" onChange={(e) => setTitle(e.target.value)} value={title}/> 
        <Input placeholder="" type="text" label="Company name" size="fieldset-lg" onChange={(e) => setCompany(e.target.value)} value={company}/> 
        <Input placeholder="" type="text" label="Address" size="fieldset-lg" onChange={(e) => setAdress(e.target.value)} value={address}/> 

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
            <textarea className="textarea" placeholder="Vacancy description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </fieldset>

        <button className='button button-primary' onClick={handleSave}>Edit resume</button>
      </Paper>
      </div>
     
      
    </main>
  )
}