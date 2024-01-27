"use client";
import Header from '@/components/header'
import Link from 'next/link';
import MyVacancies from '@/components/myvacancies'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getVacancyApplies } from '@/app/store/slices/applySlice';
import Applies from '@/components/VacancyApplies'
import ProtectedRoute from '@/components/ProtectedRoute'
export default function VacancyApplies() {
    const dispatch = useDispatch();
    const [status, setStatus] = useState("NEW")

    const {id} = useParams();
    useEffect(() => {
        dispatch(getVacancyApplies(id))
    }, [])

    const applies = useSelector(state => state.apply.applies)


    const filteredApplies = applies.filter(item => item.status === status)

    return (
        <ProtectedRoute>
    <main>
        <Header />

        <div className="container">
            <div className="flex flex-ai-c flex-jc-sb ptb7">
                <h1>Отклики {applies.length}</h1>
            </div>
            <div className='flex flex-jc-sb'>
                <div className="list">
                    <div className={`list-item${status === "NEW"?" active": ""}`} onClick={()=>setStatus("NEW")}>Все неразобранные</div>
                    <div className={`list-item${status === "INVITATION"?" active": ""}`} onClick={()=>setStatus("INVITATION")}>Приглашенные</div>
                    <div className={`list-item${status === "DECLINED"?" active": ""}`}  onClick={()=>setStatus("DECLINED")}>Отказы</div>
                </div>
                <Applies applies={filteredApplies}/>
            </div>
            
        </div>
    </main>
    </ProtectedRoute>
    )
}