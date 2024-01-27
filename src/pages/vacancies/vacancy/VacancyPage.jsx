"use client";
import Header from '@/components/header'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {getVacancyById} from '@/app/store/slices/vacancySlice'
import { useParams } from 'next/navigation';
// import { getMyResumes } from '@/app/store/slices/resumeSlice';
// import { createApply, getEmployeeApplies, getVacancyApplies } from '@/app/store/slices/applySlice';
import Vacancy from '../page';
import img1 from '../../images/img1.png';
import arrow from '../../images/arrow-left.png';

export default function VacancyPage() {

  // const dispatch = useDispatch();
  // const {id} = useParams();
  // const vacancy = useSelector(state => state.vacancy.vacancy)
  // const currentUser = useSelector(state => state.auth.currentUser)
  // const resumes = useSelector(state => state.resume.resumes)
  // const applies = useSelector(state => state.apply.applies)

  // let vacancy, currentUser, resumes, applies;
  // const [resumeId, setResume] = useState()
  // console.log(resumes)
  // useEffect(() => {
  //   if(resumes[0]) {
  //     setResume(resumes[0].id)
  //   }
  // }, [resumes])


  // const didMount = () => {
  //   dispatch(getVacancyById(id))
  // }

  // useEffect(() => {
  //   if(currentUser && currentUser.role.name === "employee") {
  //     dispatch(getMyResumes())
  //   dispatch(getEmployeeApplies())
  //   } else if(currentUser){
  //    dispatch(getVacancyApplies(id))
  //   }
  // }, [currentUser])



  // console.log("in page", vacancy)

  // useEffect(didMount, [])

  // const handleApply = () => {
  //   dispatch(createApply({
  //     resumeId,
  //     vacancyId: id
  //   }))
  // }

//  let isApplied = applies.some(item => item.vacancyId === id * 1);

 // console.log(isApplied, applies)
    // let skills = []
    // if(vacancy.skills) skills = vacancy.skills.split(",");

    let skills = ['React', 'Javascript', 'Node.JS'];

  return (
    <main>
      <Header />
      <div className="container">

      <div className='mt7'><Link href="/vacancy" className='button-secondary'><Image className='arrow' src={arrow} alt='arrow'/> All jobs</Link></div>

      <div className='vacancy-container flex mb10'>
          <div className='vacancy-container-left'>

          <h3 className='text'>Job Details</h3>
          <h1>Frontend Developer</h1>

          <h2>500000 - 700000 KZT</h2>
          

              <div className="skill flex ">

                {skills.map((skill, index) => (
                  <span key={index} className="p3">
                    {skill}
                  </span>
                ))}
                {/* <div className='date flex'> 
                    <Image  src={date} alt='date'/>
                    <p>{item.createdAt}</p>
                </div> */}
              </div>
          
          <div className='text'>
            <p>Are you a highly skilled and creative individual looking to take your expertise to exciting new heights?

            If so, we invite you to join our team as a Frontend Specialist/Creative Developer. In this role, you’ll have the opportunity to bring your passion for front-end development to life, developing visually captivating and stunningly beautiful websites that seamlessly marry top-of-the-line design with exceptional user experience and accessibility.

            While this is not a UI Designer position, you will be working closely with our design team and have the chance to embrace the latest methods and trends in the industry, pushing boundaries and expanding your skillset in equal measure. Your expertise will be absolutely critical to our team’s success, and we couldn’t be more excited to welcome you aboard.</p>
            
            <h2>Responsibilities</h2>
            <ul>
              <li className='mb10'>Develop visually appealing websites by combining innovative design concepts with modern, front-end development techniques.</li>
              <li className='mb10'>Collaborate with designers, the Creative Director, Technical Director and other stakeholders to transform Figma designs into functional, elegant, and immersive interactive experiences.</li>
              <li className='mb10'>Utilize your expertise in modern CSS to ensure high-fidelity implementation of designs across various browsers, platforms, and devices.</li>
              <li className='mb10'>Stay up to date with the latest advancements in fluid layouts, clamped typography and demonstrate a desire to continuously learn and improve your skills in developing beautiful experiences.</li>
              <li>Navigate and resolve compatibility issues that may arise across different browsers, platforms, or devices.</li>
            </ul>
          </div>

          <button className='button-black mt24 mb10'>Apply for this position</button>
          </div>
          

          <div className='vacancy-container-right'> 
              <div className='vacancy-sidebar'>
                  <img className='companyLogo' src={img1} alt='logo'/>
                  <h1>Company name</h1>
                  <button className='button-black'>Apply for this position</button>
              </div>

              <div className='divider'></div>
            

            <p>Job Type</p>
            <h3>Full-time</h3>

            <p>Location</p>
            <h3>Almaty</h3>

            <p>Date posted</p>
            <h3>23.01.2023</h3>
          </div>
      </div>
      </div>
    </main>
  )
}