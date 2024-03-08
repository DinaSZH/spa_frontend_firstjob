
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import {getResumeById} from '@/app/store/slices/resumeSlice'
import {getAgeFromBirthday, monthsInRussian, monthsInRussian2} from '../../utils/format'
import { Link, useNavigate } from 'react-router-dom';
import user from '../../assets/images/user-icon.webp';
import iconUser from '../../assets/images/iconUser.png';
import KeycloakService from '../../services/KeycloakService';
import { Loader } from '@mantine/core';
import { getProfile } from '../../store/slices/profileSlice';
import RenderOnAuthenticated from '../../helpers/RenderOnAuthenticated';
import { DatePickerInput } from '@mantine/dates';

export default function Profile() {

    const dispatch = useDispatch();
    const { profile, error, loading } = useSelector(
      (state) => state.profile
    )
    // const {id} = useParams();
    // const resume = useSelector(state => state.resume.resume)

    // const didMount = () => {
    //     dispatch(getResumeById(id))
    // }
    // useEffect(didMount, [])

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    const getProfileInfo = async () => {
      try {
        if (KeycloakService.isLoggedIn()) {
          setName(KeycloakService.getGiven_name());
          setSurname(KeycloakService.getFamily_name());
          setEmail(KeycloakService.getUsername());
          setPhone(KeycloakService.getPhone());
          setBirthdate(KeycloakService.getBirthdate());
          console.log("User authenticated");
        
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Error initializing Keycloak:", error);
      }
    };
    
    useEffect(() => {
      dispatch(getProfile())
      console.log(KeycloakService.getToken())
    }, []);

    useEffect(() => {
      if(profile){
        setLoader(false);
      }
    }, [profile]);

    

  

  return (
    <RenderOnAuthenticated>
    <main>
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-end ptb7'>
         {profile && <button className='button button-black' onClick={() => navigate(`/profile/edit`)}>Редактировать</button>}
        </div> 

        <div className='vacancy-container flex mb10'>

          <div className='vacancy-container-right'> 
              <div className='vacancy-sidebar'>
                  <img className='usernameImage' src={user} alt='logo'/>
              </div>
          </div>

            <div className='vacancy-container-left'>
                    {loader ? <Loader color="blue" /> : <div>
                        <h2 className='no-mr'>Profile Information</h2>
                        <h3 className='text'>{`${profile?.firstname} ${profile?.lastname}`}</h3>

                        <div className='divider'></div>

                        <div className='backgroundBlock'>
                          <div className='flex resume-title'> 
                          {/* <img className='logo' src={iconUser} alt='logo'/> */}
                          <h1 className='no-mr'>Personal Details</h1></div>
                          <p>{profile?.email}</p>
                          <p>{profile?.phone}</p>
                          <p>{profile?.birthdate} </p>
                        
                        </div>
                      </div>}

                    <div className='divider'></div>

            </div>
      </div>
      </div>
    </main>
    </RenderOnAuthenticated>
  )
}