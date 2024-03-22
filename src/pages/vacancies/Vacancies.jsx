 

import MyVacancies from '../../components/myvacancies/MyVacancies';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { getMyVacancies } from '@/app/store/slices/vacancySlice';
import { useEffect } from 'react';

export default function Vacancies() {
    const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(getMyVacancies())
    // }, [])

  return (
    <main >
        <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <h1>My vacancies</h1>
          <Link className='button button-black' to="/create-vacancy">Create vacancy</Link>
        </div> 
        <MyVacancies/>
      </div>
    </main>
  )
}