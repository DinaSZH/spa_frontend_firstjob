import Header from '../../components/header/Header'
import MyResumes from '../../components/myresumes/MyResumes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyResumes } from '../../store/slices/resumeSlice'
import { Link } from 'react-router-dom'

export default function ResumesPage() {

  const dispacth = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes);

  useEffect(() => {
    dispacth(getMyResumes())
  }, [])

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