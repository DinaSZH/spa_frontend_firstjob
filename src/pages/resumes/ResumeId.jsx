import Header from '../../components/header/Header'
import MyResumes from '../../components/myresumes/MyResumes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyResumes, getResumeById } from '../../store/slices/resumeSlice'
import { Link, useParams } from 'react-router-dom'
import arrow from '../../assets/images/arrow-left.png';
import user from '../../assets/images/post1.jpeg';
import iconUser from '../../assets/images/iconUser.png';
import iconEdu from '../../assets/images/iconEdu.png';
import iconExp from '../../assets/images/iconExp.png';
import iconSettings from '../../assets/images/iconSettings.png';
import iconLang from '../../assets/images/iconLang.png';

export default function ResumeId() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const resume = useSelector(state => state.resume.resume)

    useEffect(() => {
        dispatch(getResumeById(id))
    }, [])

//   const age = getAgeFromBirthday(resume.birthday)
//   const birthday = new Date(resume.birthday)

    const showPhone = phone => {
        let res="";
        
        if(phone[0] == "8" ){
            phone = '+7' + phone.slice(1, phone.length);
        }

        res = `${phone.slice(0, 2)} (${phone.slice(2, 5)}) ${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10, 12)}`
        return res;
    }

    let skills = ['React', 'Javascript', 'Node.JS'];
    // let skills = []
    // if(resume.skills) skills = resume.skills.split(",")

  return (
    <main>
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <div className='mt7'><Link to="/resumes" className='button-secondary'><img className='arrow' src={arrow} alt='arrow'/>All resumes</Link></div>

          <Link className='button button-black' href={`/edit-resume/${resume.id}`}>Редактировать</Link>
        </div> 

        <div className='vacancy-container flex mb10'>
          <div className='vacancy-container-left'>

          <h3 className='text'>Resume Details</h3>
          <h2>{resume.position}</h2>

        <div className='divider'></div>

        <div className='backgroundBlock'>
            <div className='flex resume-title'> 
            <img className='logo' src={iconUser} alt='logo'/>
            <h1>Personal Information</h1></div>
            
            <p>{resume.about}</p>
            
        </div>

        <div className='divider'></div>

        <div className='backgroundBlock'>
            <div className='flex resume-title mb20'> 
            <img className='logo' src={iconEdu} alt='edu'/>
            <h1>Education</h1></div>
            
            {resume.education && resume.education.map((item, index) => (
                <div className='flex working-history ' key={index}>
                    <div className='working-history-date mr4'>
                        {item.startYear} - {item.endYear}
                    </div>

                    <div className='flex flex-cl'>
                        <h3 className='text'>{item.instanceName}</h3>
                        <p>{item.specialization}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className='divider'></div>

        <div classname='backgroundBlock'>
            <div className='flex resume-title mb20'> 
            <img className='logo' src={iconExp} alt='edu'/>
            <h1>Experience</h1></div>
            
            {resume.experience && resume.experience.map((item, index) => (
                <div className='flex working-history ' key={index}>
                    <div className='working-history-date mr4'>
                        {item.startDate} - {item.endDate}
                    </div>

                    <div className='flex flex-cl'>
                        <h3 className='text'>{item.position}</h3>
                        <h4>{item.company}</h4>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
           
        </div>
        <div className='divider'></div>

        <div className='backgroundBlock'>
            <div className='flex resume-title mb20'> 
            <img className='logo' src={iconLang} alt='edu'/>
            <h1>Languages</h1></div>
            
            <div  className='flex working-history '>
                    <div className='working-history-date mr4'>
                        <h3 className='text'> Level: B2</h3>
                    </div>

                    <div className='flex flex-cl'>
                        <h3 className='text'>English language</h3>
                    </div>
            </div>

            <div  className='flex working-history '>
                    <div className='working-history-date mr4'>
                        <h3 className='text'> Level: B2</h3>
                    </div>

                    <div className='flex flex-cl'>
                        <h3 className='text'>Kazakh language</h3>
                    </div>
            </div>

            <div  className='flex working-history '>
                    <div className='working-history-date mr4'>
                        <h3 className='text'> Level: B2</h3>
                    </div>

                    <div className='flex flex-cl'>
                        <h3 className='text'>Russian language</h3>
                    </div>
            </div>
        </div>

        <div className='divider'></div>
        <div className='backgroundBlock'>
            <div className='flex resume-title mb20'> 
            <img className='logo' src={iconSettings} alt='logo'/>
            <h1>Skills</h1>
            </div>
            
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
            </div>

        <div className='divider'></div>
        </div>
          

          <div className='vacancy-container-right'> 
              <div className='vacancy-sidebar'>
                  <img className='usernameImage' src={user} alt='logo'/>
                  <h1>Username</h1>
              </div>

              <div className='divider'></div>
            

            <p>Gender</p>
            <h3>{resume.gender}</h3>

            <p>Location</p>
            <h3>Almaty</h3>

            <p>Contacts</p>
            <h3>email@gmail.com</h3>

            <p>Experience</p>
            <h3>3 years of experience</h3>
          </div>
      </div>
      </div>
    </main>
  )
}