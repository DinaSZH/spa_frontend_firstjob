
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import resume from '../../../assets/images/res-icon.png'
import date from '../../../assets/images/date.png'
import { deleteResumeById, downloadResumeById } from '../../../store/slices/resumeSlice';
export default function MyResume ({item}) {
    const dispatch = useDispatch()

    
    return(<div className="card mtb4">
        <div className='flex flex-jc-sb resume-title'>
            <div className='flex'> 
                <img className='mr4' src={resume} alt='resume'/>
                <Link className="h2 link" to={`/resumes/${item.id}`}>{item.position}</Link>
            </div>
            <div className='flex'>
            <span className='button-edit link' onClick={() => dispatch(downloadResumeById(item.id))}>Download</span>
            <Link to={`resumes/edit/${item.id}`}><span className='button-edit'>Edit</span></Link>
            <span className='button-delete' onClick={() => dispatch(deleteResumeById(item.id))}>Delete</span>
            </div>
        </div>

        <div className="skill flex mt7 ">
                {item.skills && item.skills.map((skill, index) => (
                    <span key={index} className="p3">
                        {skill}
                    </span>
                ))}
      </div>
    
    </div>)
}