import Input from '../../components/FillForm/input/input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalAddExp from '../../components/FillForm/ModalAddExp/ModalAddExp';
import WorkingHistory from '../../components/FillForm/WorkingHistory/WorkingHistory';
import AddEducation from '../../components/FillForm/AddEducation/AddEducation';
import SelectEmploymentTypes from '../../components/FillForm/SelectEmploymentTypes/SelectEmploymentTypes';
import { Link, useNavigate } from 'react-router-dom';
import { Select } from '@mantine/core';
import { END_POINT } from '../../config/end-point';
import {
  useQuery, useQueryClient,
} from '@tanstack/react-query'
import { MultiSelect } from '@mantine/core';
import EducationItem from '../../components/EducationItem/EducationItem';
import { createResume } from '../../store/slices/resumeSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateResume() {
    const [allSkills, setSkills] = useState([]);
    const [allEmploymentTypes, setEmploymentTypes] = useState([]);
    const [experience, setExperience] = useState([]);
    const [modalExpIsOpen, setModalExpIsOpen] = useState(false);
    const [modalEduIsOpen, setModalEduIsOpen] = useState(false);

    const [city, setCity] = useState();
    const [gender, setGender] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState();
    const [currency, setCurrency] = useState("KZT");
    const [skills, setSelectedSkills] = useState([]);
    const [education, setEducation] = useState([]);
   
    const [employmentType, setSelectedEmpTypes] = useState([]);
    const [about, setAbout] = useState("");

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


    const handleSave = ()=> {
      dispatch(createResume({
        gender,
        city,
        position,
        skills: skills.map(skill => skill.value),
        salary,
        currency,
        experience,
        about,
        education,
        employmentType: employmentType.map(type => type.value),
      }))  
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
        <h1>Your resume</h1>

        <h3>Основная информация</h3>
        {/* <Input placeholder="" type="text" label="Имя" size="fieldset-md" onChange={(e) => setName(e.target.value)}/>
        <Input placeholder="" type="text" label="Фамилия" size="fieldset-md" onChange={(e) => setLastName(e.target.value)}/>
        <Input placeholder="" type="text" label="Мобильный телефон" size="fieldset-md" onChange={(e) => setPhone(e.target.value)}/> */}

        <fieldset className={"fieldset fieldset-sm" } >
            <label>Gender</label>
            <div className='radio-group'>
                <div className='radio'>
                  <input className='radio' type='radio' name='gender' id='g1' onChange={handleGenderChange} value={"Male"}/>
                  <label htmlFor="g1">Male</label>
                </div>
                <div className='radio'>
                  <input className='radio' type='radio' name='gender' id='g2' onChange={handleGenderChange} value={"Female"}/>
                  <label htmlFor="g2">Female</label>
                </div>  
            </div>           
        </fieldset> 

    
       <fieldset className={"fieldset fieldset-sm"} >
            <label className='h1'>City of residence</label>
            <Select
          placeholder="Search city"
          data={cities}
          searchable
          onSelect={(data) => setCity(data.id)}
          nothingFoundMessage="Nothing found..."
          className={"fieldset fieldset-sm h3" } 
        />
        </fieldset>

        <h3>Специальность</h3>

        <Input placeholder="" type="text" label="Желаемая должность" size="fieldset-lg" onChange={(e) => setPosition(e.target.value)}/> 

        <fieldset className={"fieldset fieldset-sm"} >
            <label className='h1'>Skills</label>
        </fieldset>
        <MultiSelect
          placeholder="Pick value"
          data={allSkills}
          hidePickedOptions
          onSelect={onSkillsChange}
          selected={skills.map(skill => ({ label: skill }))}
        />

        <fieldset className={"fieldset fieldset-lg" } >
            <label>Зарплата</label>

            <div className='salary'>
                <input placeholder="" className='input' type="number" size="input" value={salary} onChange={e => setSalary(e.target.value*1)}/>
                <select className='input' value={currency} onChange={e => setCurrency(e.target.value)}>
                  <option value={"KZT"}>KZT</option>
                  <option value={"USD"}>USD</option>
                  <option value={"RUB"}>RUB</option>
                </select>
                на руки
            </div>           
        </fieldset>

        <h3>Опыт работы</h3>

        {modalExpIsOpen && <ModalAddExp close={closeModalExp} addWorkingHistory={addWorkingHistory}/>}
        <fieldset className={"fieldset fieldset-lg" } >
            <label>Места работы</label>

            <div className='exp'>
                {experience.map(item => (<WorkingHistory key={item.id}  workingHistory={item} remove={removeWorkingHistory}/>))}
                <button className='button button-primary-bordered' onClick={() => setModalExpIsOpen(true)}>Добавить место работы</button>
            </div>           
        </fieldset>

        <fieldset className={"fieldset fieldset-lg"} >
            <label>О себе</label>
            <textarea className="textarea" placeholder="Расскажите о себе" onChange={(e) => setAbout(e.target.value)}  value={about}/>
        </fieldset>

        {/* <AutoCompleteTags placeholder="" type="text" label="Ключевые навыки" size="fieldset-md" items={allSkills} onSelect={onSkillsChange} selected={skills.length > 0 ? skills.split(",").map(item=> ({name: item})) : []}/> */}

        <h3>Образование</h3>

        {modalEduIsOpen && <AddEducation close={closeModalEdu} addEducation={addEducation}/>}
        <fieldset className={"fieldset fieldset-lg" } >
            <label>Образование</label>

            <div className='exp'>
                {education.map(item => (<EducationItem key={item.id}  education={item} remove={removeEducation}/>))}
                <button className='button button-primary-bordered' onClick={() => setModalEduIsOpen(true)}>Добавить место учебы</button>
            </div>           
        </fieldset>

        <h3>Choose employment type</h3>
        <SelectEmploymentTypes label="Занятость" size="fieldset-md" allEmploymentTypes={allEmploymentTypes} onChange={(tps) => setSelectedEmpTypes(tps)} employmentType={[]}/>

        <button className='button button-primary' onClick={handleSave}>Сохранить и опубликовать</button>
      </div>
      </div>
     
      
    </main>
  )
}