import Header from '../../components/header/Header'
import MyResumes from '../../components/myresumes/MyResumes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import arrow from '../../assets/images/arrow-left.png';
import { Button, Paper } from '@mantine/core';
import { IconCalendarMonth,IconBooks, IconClipboardText, IconGenderFemale, IconGenderMale, IconMail, IconMapPin, IconPhone, IconPremiumRights, IconUserCircle, IconTool, IconSettings, IconLocationSearch, IconBriefcase } from '@tabler/icons-react';
import { getVacancyById } from '../../store/slices/vacancySlice'

export default function VacancyId() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const vacancy = useSelector(state => state.vacancy.vacancy)

    useEffect(() => {
        dispatch(getVacancyById(id))
    }, [])


  return (
    <main>
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <Button variant="outline" radius='md'><Link className='link' to="/vacancies"><img className='arrow link' src={arrow} alt='arrow'/>All vacancies</Link></Button>
            
          <Link className='button button-black' to={`/vacancy/edit/${vacancy.id}`}>Редактировать</Link>
        </div> 

        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
        <div className='vacancy-container flex-cl flex mb10'>

        <div className='backgroundBlock'>
            <div>
                <h1 className='flex flex-ai-c'><IconUserCircle color='#228BE6' size={50} className='mr10'/>{vacancy.title}</h1>
            </div>
            <div className='flex mb10'><IconMapPin className='mr10'/> {vacancy.city}, {vacancy.country}</div>
            <div className='flex flex-ai-c mb10'>
                   <IconCalendarMonth className='mr10'/> Created date: {vacancy.updatedAt ? vacancy.updatedAt.split("T")[0] : ''}
            </div>
            {/* <div className='flex flex-ai-c'>
                {vacancy.gender === 'FEMALE' ? <IconGenderFemale className='mr10'/> : <IconGenderMale className='mr10'/>}
                Gender: {vacancy.gender}
            </div> */}
            <h2>Contacts</h2>
            <div className='flex flex-ai-c mb10'><IconBriefcase className='mr10'/>Company: {vacancy.company}</div>
            <div className='flex flex-ai-c mb10'><IconMail className='mr10'/>Email: {vacancy.hrEmail}</div>
            <div className='flex flex-ai-c mb10'><IconLocationSearch className='mr10'/>Address:  {vacancy.address}</div>
            {/* <div className='flex flex-ai-c'><IconPhone className='mr10'/> {vacancy.phone}</div> */}

        </div>

        <div className='divider'></div>
          <h2 className='flex flex-ai-c'><IconClipboardText color='#228BE6' size={50} className='mr10'/> Vacancy Details</h2>
          <div className='flex flex-jc-sb'>
                <h2>{vacancy.title}</h2>
                <h2 className='flex flex-ai-c'>
                   <IconPremiumRights className='mr10'/> {vacancy.salaryFrom}-{vacancy.salaryTo} {vacancy.currency}
                </h2>
            </div>
            <div className='flex flex-ai-c mb10'><IconTool className='mr10'/>Experience:  <p className='box'>{vacancy.experience}</p> </div>
            <div className='flex flex-ai-c mb10'><IconBooks className='mr10'/> <span className='mr10'>Employment Type: </span>
            {vacancy.employmentType && vacancy.employmentType.map((item, index) => (
                    <p className='box' key={index}>{item}</p>
                ))}
            </div>
            <h3>Description</h3>
            <p>{vacancy.description}</p>

        <div className='divider'></div>

        </div>
        </Paper>
      </div>
    </main>
  )
}