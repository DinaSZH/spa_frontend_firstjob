
import Header from '../../../components/header/Header'
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getSearchedVacancies, getSpecializations, getCities, getExperiences, getSkills, getEmpType } from '@/app/store/slices/vacancySlice';
import { useEffect, useState } from 'react';
//import { useSearchParams } from 'next/navigation'
import ModalSelectSpec from '../../../components/FiilFormVacancy/ModalSelectSpec/ModalSelectSpec'
import AutoCompleteSelect from '../../../components/FillForm/AutoCompleteSelect/AutoCompleteSelect'
import MyVacancies from '../../../components/myvacancies/MyVacancies';
//import { useRouter } from "next/navigation"
import img1 from '../../../assets/images/img1.png';
import Sort from '../../../components/Sort/Sort';
import iconExp from '../../../assets/images/iconExp.png';
import { Search } from '../../../components/Search/Search';
import { Loader, Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getAllVacancies } from '../../../store/slices/vacancySlice';


export default function SearchVacancy() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    // const router = useRouter()
    // const [q, setQ] = useState(searchParams.get("q"))
    // const [specializationId, setSpecialization] = useState(searchParams.get("specializationId"))
    // const [specializationName, setSpecializationName] = useState()
    const [isSpecModalOpen, setSpecModalOpen] = useState(false)
    const [cityId, setCityId] = useState(searchParams.get("cityId"))
    const [fromSalary, setFromSalary] = useState(searchParams.get("fromSalary"));
    const [toSalary, setToSalary] = useState(searchParams.get("toSalary"));
    const [currency, setCurrency] = useState(searchParams.get("currency"));
    const [experienceId, setExperienceId] = useState(searchParams.get("experienceId"))
    const [employmentTypeId, setEmploymentType] = useState(searchParams.get("employmentTypeId"))
    // const [salary, setSalary] = useState(searchParams.get("salary"))
    // const [salary_type, setSalaryType] = useState(searchParams.get("salary_type"))
    const closeSepcModal = () => {
        setSpecModalOpen(false)
    }

    const { isPending, isError, data: cities } = useQuery({
        queryKey: ['cities'],
        queryFn: async () => {
          const response = await fetch(`${END_POINT}/api/client-app/resumes/cities`);
          if (!response.ok) {
            throw new Error('Failed to fetch cities');
          }
          const citiesData = await response.json();
          const transformedCities = citiesData.map(city => ({
            value: city.id,
            label: city.name
          }));
          return transformedCities;
        },
      });
    
    const vacancies = useSelector((state) => state.vacancy.allVacancies)

    useEffect(() => {
        dispatch(getAllVacancies())
      }, [])

      useEffect(() => {
        if(vacancies){
         setLoading(false);
        }
      }, [vacancies]);

    let experiences = ['Нет опыта', 'От 1 до 3 лет', 'От 3 до 6 лет', 'Более 6 лет'];
    let empTypes = ['Полная занятость', 'Частичная занятость', 'Проектная работа', 'Волонетрство', 'Стажировка'];
    return (
    <main>
        <div className="container mt7">
            <Search />
                <div className='flex '>

                    <div className='search-left flex flex-cl' style={{width: `25%`}}>

                        <div className='search-component vacancy-container-right mtb4'>                             
        
                        <fieldset className={"fieldset-vertical fieldset-md"} >
                            <label>City</label>
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

                        <fieldset className="fieldset-vertical fieldset-md">
                            <label>Предполагаемый уровень дохода в месяц</label>
                            <div className="input-group">
                                <input className="input-default" placeholder="От" type="number" onChange={e => setFromSalary(e.target.value*1)}/>
                            
                                <Select
                                className='w-full h-full'
                                placeholder="currency"
                                data={['KZT', 'USD', 'RUB']}
                                value={currency} 
                                onChange={setCurrency} 
                                />
                                    </div>
                            
                        </fieldset>



                        <fieldset className={"fieldset-vertical fieldset-sm"} >
                            <label className='h1'>Experience</label>
                            <Select
                            placeholder="Pick value"
                            data={['No experience', 'Less than year', '1-3 years', '3-6 years', '6+ years']}
                            value={experienceId} 
                            onChange={setExperienceId} 
                            />
                        </fieldset>


                        <fieldset className={"fieldset-vertical fieldset-sm"} >
                            <label className='h1'>Employment type</label>
                            <Select
                            placeholder="Pick value"
                            data={['Full time', 'Remote']}
                            value={currency} 
                            onChange={setCurrency} 
                            />
                        </fieldset>

                        </div>

                        
                        </div>
                    

                    {loading ? <div style={{width: `80%`, paddingLeft: `40px`}} className='flex flex-jc-c mt7'><Loader color="blue" /></div> 
                    : 
                    <div style={{width: `80%`, paddingLeft: `40px`}}>
                        <MyVacancies vacancies={vacancies}/>
                    </div>}
                </div>
        </div>
    </main>
    )
}