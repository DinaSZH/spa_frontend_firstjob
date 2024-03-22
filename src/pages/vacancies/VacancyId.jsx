import Header from '../../components/header/Header'
import MyResumes from '../../components/myresumes/MyResumes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyResumes, getResumeById } from '../../store/slices/resumeSlice'
import { Link, useParams } from 'react-router-dom'
import arrow from '../../assets/images/arrow-left.png';
import { Button, Paper } from '@mantine/core';
import { IconCalendarMonth,IconBooks, IconClipboardText, IconGenderFemale, IconGenderMale, IconMail, IconMapPin, IconPhone, IconPremiumRights, IconUserCircle, IconTool, IconSettings } from '@tabler/icons-react';

export default function VacancyId() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const vacancy = useSelector(state => state.resume.resume)

    useEffect(() => {
        dispatch(getResumeById(id))
    }, [])

    let skills = ['React', 'Javascript', 'Node.JS'];
    // let skills = []
    // if(resume.skills) skills = resume.skills.split(",")

  return (
    <main>
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <Button variant="outline" radius='md'><Link className='link' to="/vacancies"><img className='arrow link' src={arrow} alt='arrow'/>All vacancies</Link></Button>
            
          <Link className='button button-black' href={`/edit-vacancy/${vacancy.id}`}>Редактировать</Link>
        </div> 

        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
        <div className='vacancy-container flex-cl flex mb10'>

        <div className='backgroundBlock'>
            <div>
                <h1 className='flex flex-ai-c'><IconUserCircle color='#228BE6' size={50} className='mr10'/>{vacancy.title}</h1>
            </div>
            <div className='flex mb10'><IconMapPin className='mr10'/> {vacancy.city}, {vacancy.country}</div>
            <div className='flex flex-ai-c mb10'>
                   <IconCalendarMonth className='mr10'/> Birthday: {vacancy.birthdate}
            </div>
            <div className='flex flex-ai-c'>
                {vacancy.gender === 'FEMALE' ? <IconGenderFemale className='mr10'/> : <IconGenderMale className='mr10'/>}
                Gender: {vacancy.gender}
            </div>
            <h2>Contacts</h2>
            <div className='flex flex-ai-c mb10'><IconMail className='mr10'/> {vacancy.email}</div>
            <div className='flex flex-ai-c'><IconPhone className='mr10'/> {vacancy.phone}</div>

        </div>

        <div className='divider'></div>
          <h2 className='flex flex-ai-c'><IconClipboardText color='#228BE6' size={50} className='mr10'/> vacancy Details</h2>
          <div className='flex flex-jc-sb'>
                <h2>{vacancy.position}</h2>
                <h2 className='flex flex-ai-c'>
                   <IconPremiumRights className='mr10'/> {vacancy.salary}{vacancy.currency}
                </h2>
            </div>
            <p>{vacancy.about}</p>

        <div className='divider'></div>

        <div className='backgroundBlock'>
            <h2 className='flex flex-ai-c'><IconBooks color='#228BE6' size={50} className='mr10'/>Education</h2>
            
            {vacancy.education && vacancy.education.map((item, index) => (
                <div className='flex working-history ' key={index}>
                    <div className='working-history-date mr4'>
                        {item.startYear} - {item.endYear}
                    </div>

                    <div className='flex flex-cl'>
                        <h3 className='text'>{item.instanceName}</h3>
                        <p>{item.specialization}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className='divider'></div>

        <div className='backgroundBlock'>
            <h2 className='flex flex-ai-c'><IconTool color='#228BE6' size={50} className='mr10'/>Experience</h2>
            
            {vacancy.experience && vacancy.experience.map((item, index) => (
                <div className='flex working-history ' key={index}>
                    <div className='working-history-date mr4'>
                        {item.startDate} - {item.endDate}
                    </div>

                    <div className='flex flex-cl'>
                        <h3 className='text'>{item.position}</h3>
                        <h4>{item.company}</h4>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
           
        </div>

        <div className='divider'></div>

        {vacancy && vacancy.skills && (<div className='backgroundBlock'>
            <h2 className='flex flex-ai-c'><IconSettings color='#228BE6' size={50} className='mr10'/>Skills</h2>
            
            <div className="skill flex ">

                {vacancy.skills.map((skill, index) => (
                  <span key={index} className="p3">
                    {skill}
                  </span>
                ))}
              </div>
        </div>)}

        <div className='divider'></div>
        </div>
        </Paper>
      </div>
    </main>
  )
}