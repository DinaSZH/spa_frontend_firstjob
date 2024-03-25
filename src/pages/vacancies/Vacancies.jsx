 

import MyVacancies from '../../components/myvacancies/MyVacancies';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyVacancies } from '../../store/slices/vacancySlice';

export default function Vacancies() {
    const dispatch = useDispatch();
    const vacancies = useSelector((state) => state.vacancy.vacancies);
    useEffect(() => {
      dispatch(getMyVacancies())
    }, [])

  return (
    <main >
        <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <h1>My vacancies</h1>
          <Link className='button button-black' to="/create-vacancy">Create vacancy</Link>
        </div> 
        
        
        <MyVacancies vacancies={vacancies}/>
      </div>
    </main>
  )
}