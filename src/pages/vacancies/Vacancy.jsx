 
'use client'
import Header from '@/components/header';
import MyVacancies from '@/components/myvacancies';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { getMyVacancies } from '@/app/store/slices/vacancySlice';
import { useEffect } from 'react';

export default function Vacancy() {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(getMyVacancies())
    // }, [])

  return (
    <main >
        <Header />
        <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <h1>Мои вакансии</h1>
          <Link className='button-primary' href="/create-vacancy">Create vacancy</Link>
        </div> 
        <MyVacancies/>
      </div>
    </main>
  )
}