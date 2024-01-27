'use client';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import resume from '../../../assets/images/res-icon.png'
import date from '../../../assets/images/date.png'
import company from '../../../assets/images/company-logo.png'
// import { deleteVacancy } from '@/app/store/slices/vacancySlice';
export default function MyVacancy ({item}) {
    
    // const dispatch = useDispatch()

    // const currentUser = useSelector(state => state.auth.currentUser)
    let currentUser;

    return (<div className="card mtb4">

        <div className='flex resume-title'>
            <img className='mr4' src={company} alt='resume'/>
            <Link className="h2 link" as={`/vacancy/${item.id}`} href="/vacancy/[id]">{item.name}</Link>
        </div>

        {/* <Link className="h3 link" as={`/vacancy/${item.id}`} href="/vacancy/[id]">{item.name}</Link> */}
        <div classname='price'> 
        <p> {item.salary_from && `от ${item.salary_from}`} {item.salary_to&& `до ${item.salary_to}`} {item.salary_type} </p>
        </div>
        

        <div className="skill flex">
        {item.skills.map((skill, index) => (
          <span key={index} className="p3">
            {skill}
          </span>
        ))}
        <div className='date flex'> 
            <img  src={date} alt='date'/>
            <p>{item.createdAt}</p>
        </div>
      </div>

        {currentUser && item.userId === currentUser.id && <span className='deleteReume' onClick={() => dispatch(deleteVacancy(item.id))}>Удалить</span>}
    </div>)
}