
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import resume from '../../../assets/images/res-icon.png'
import date from '../../../assets/images/date.png'
//import { deleteResume } from '@/app/store/slices/resumeSlice'
export default function MyResume ({item}) {
    return(<div className="card mtb4">
        <div className='flex resume-title'>
            <img className='mr4' src={resume} alt='resume'/>
            <Link className="h2 link" href={`/resumes/${item.id}`}>{item.position}</Link>
        </div>

        <div className="skill flex mt7 ">
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
        <span className='button-edit'>Edit</span>
        <span className='button-delete'>Delete</span>
    </div>)
}