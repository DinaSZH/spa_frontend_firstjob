import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import company from '../../assets/images/company-bg.jpeg'
import user from '../../assets/images/user-bg.png'
import mentor from '../../assets/images/mentor-bg.png'
import KeycloakService from '../../services/KeycloakService'

export default function Register() {
    return(
        <main>
            <section className='login-page signup-page'>
                <div className='signup-item'>
                 {/* <img className='signup-image' src={company} alt='company'/> */}
                 <Link to="/register/hr" className='button-primary'>For HR</Link>
                </div>

                <div className='signup-item'>
                 {/* <img className='signup-image' src={user} alt='user'/> */}
                 <button onClick={() => KeycloakService.doRegister()} className='button-primary'>For employees</button>
                </div>

                <div className='signup-item'>
                 {/* <img className='signup-image' src={mentor} alt='mentor'/> */}
                 <Link to="/register/mentor" className='button-primary'>For mentors</Link>
                </div>
            </section>
        </main>
    )
}