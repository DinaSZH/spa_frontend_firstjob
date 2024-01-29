
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import {getResumeById} from '@/app/store/slices/resumeSlice'
import {getAgeFromBirthday, monthsInRussian, monthsInRussian2} from '../../../utils/format'
import { Link, useNavigate } from 'react-router-dom';
import user from '../../../assets/images/user-icon.webp';
import KeycloakService from '../../../services/KeycloakService';
import { Loader, em } from '@mantine/core';
import Input from '../../../components/FillForm/input/input';
import SelectDate from '../../../components/FillForm/SelectDate/SelectDate';
import { editProfile, getProfile, setError } from '../../../store/slices/profileSlice';
import { DatePickerInput } from '@mantine/dates';

export default function EditProfile() {

    // const dispatch = useDispatch();
    // const {id} = useParams();
    // const resume = useSelector(state => state.resume.resume)

    // const didMount = () => {
    //     dispatch(getResumeById(id))
    // }
    // useEffect(didMount, [])
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthdate, setBirthdate] = useState(null);
    const [loader, setLoader] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile, error, loading, success } = useSelector(
      (state) => state.profile
    )

    const getProfileInfo =  () => {
        try{
              setFirstname(profile.firstname);
              setLastname(profile.lastname);
              setEmail(profile.email);
              setPhone(profile.phone);
              setBirthdate(profile.birthdate ? new Date(profile.birthdate) : null);
        } catch{
          console.log("Error with fetching the data")
        } 
      }

    useEffect(() => {
      getProfileInfo()
    }, [profile])


    useEffect(() => {
      dispatch(getProfile());
      if(profile){
        setLoader(false)
      }
    }, [dispatch, profile]);

    useEffect(() => {
      if(success){
        navigate('/profile');
      }
    }, [success])

    const handleEditProfile = async () => {
      try {
        const formattedBirthdate = new Date(birthdate).toISOString().split('T')[0];

        await dispatch(editProfile({
          firstname,
          lastname,
          phone,
          birthdate:formattedBirthdate,
        }));
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };


  return (
    <main> 
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-end ptb7'>
          <Link className='button button-black' to={`/profile`}>Back</Link>
        </div> 

        <div className='vacancy-container flex mb10'>

          <div className='vacancy-container-right'> 
              <div className='vacancy-sidebar'>
                  <img className='usernameImage' src={user} alt='logo'/>
              </div>
          </div>

            <div className='vacancy-container-left '>
                    {loader ? <Loader color="blue" /> : <div>
                        <h2 className='no-mr'>Profile Details</h2>

                        <Input placeholder="" type="text" label="Name" size="fieldset-md" onChange={(e) => setFirstname(e.target.value)} value={firstname}/>
                        <Input placeholder="" type="text" label="Surname" size="fieldset-md" onChange={(e) => setLastname(e.target.value)} value={lastname}/>
                        <div className='divider'></div>

                        <div className='backgroundBlock mb20'>
                          <div className='flex resume-title'> 
                          <h1 className='no-mr'>Personal Information</h1></div>
                          <Input placeholder="" type="text" label="phone" size="fieldset-md" onChange={(e) => setPhone(e.target.value)} value={phone}/>
                          <DatePickerInput
                              label="Pick date"
                              placeholder="Pick date"
                              value={birthdate}
                              onChange={(date) => setBirthdate(date)}
                              className='mb10'
                            />
                        </div>

                        {error && (<>{Array.isArray(error) ? (error.map((errorItem, index) => (
                                    <ErrorMessage key={index} title={errorItem.field} text={errorItem.description} />))
                                ) : (<p>{`${error.field}: ${error.description}`}</p> )}</>  )}
                      <div className='divider'></div>
                       <button className='button button-black' onClick={handleEditProfile}>Edit</button>
                      </div>}
            </div>
      </div>
      </div>
    </main>
  )
}