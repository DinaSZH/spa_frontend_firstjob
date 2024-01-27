import Header from '../../components/header/Header'
import MyResumes from '../../components/myresumes/MyResumes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getMyResumes } from '@/app/store/slices/resumeSlice';
import { Link } from 'react-router-dom'

export default function ResumesPage() {

//   const dispacth = useDispatch();
//   const resumes = useSelector((state) => state.resume.resumes)
//   const didMount = () => {
//     dispacth(getMyResumes())
//   }

//   useEffect(didMount, [])

const resumes = [{
    position: 'Software engineer',
    createdAt:  '23.01.2023',
    skills: ['Node.JS', "SQL", "Vue", 'Javascript']
  },
  {
    position: 'React engineer',
    createdAt:  '23.01.2023',
    skills: ['React', "Redux", "Vue", 'Javascript']
  },
  {
    position: 'Backend engineer',
    createdAt:  '23.01.2023',
    skills: ['Java', "Spring", "MySQL", 'GIT']
  }]
  

  return (
    <main>
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <h1>Мои Резюме</h1>
          <Link className='button button-black' to="/create-resume">Создать резюме</Link>
        </div> 
        <MyResumes resumes={resumes}/>
      </div>
      
    </main>
  )
}