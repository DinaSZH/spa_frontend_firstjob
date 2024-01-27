
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import {getResumeById} from '@/app/store/slices/resumeSlice'
import {getAgeFromBirthday, monthsInRussian, monthsInRussian2} from '../../../utils/format'
import { Link } from 'react-router-dom';
import user from '../../../assets/images/user-icon.webp';
import KeycloakService from '../../../services/KeycloakService';
import { Loader, em } from '@mantine/core';
import Input from '../../../components/FillForm/input/input';
import SelectDate from '../../../components/FillForm/SelectDate/SelectDate';

export default function EditProfile() {

    // const dispatch = useDispatch();
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
    const [birthdate, setBirthdate] = useState();
    const [resume, setResume] = useState("");
    const [loader, setLoader] = useState(true);

    
  const age = getAgeFromBirthday(resume.birthday)
  const birthday = new Date(resume.birthday)

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

    const getProfileInfo = async () => {
        try{
              setName(await(KeycloakService.getGiven_name()));
              setSurname(await(KeycloakService.getFamily_name()));
              setEmail(await(KeycloakService.getUsername()));
              setPhone(await(KeycloakService.getPhone()));
              setBirthdate(await(KeycloakService.getBirthdate()));
        } catch{
          console.log("Error with fetching the data")
        } finally{
          setLoader(false);
        }
      }


    useEffect(() => {
      getProfileInfo()
    }, []);


  return (
    <main>
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-end ptb7'>
          <Link className='button button-black' to={`/profile/:username`}>Back</Link>
        </div> 

        <div className='vacancy-container flex mb10'>

          <div className='vacancy-container-right'> 
              <div className='vacancy-sidebar'>
                  <img className='usernameImage' src={user} alt='logo'/>
              </div>
          </div>

            <div className='vacancy-container-left'>
                    {loader ? <Loader color="blue" /> : <div>
                        <h2 className='no-mr'>Profile Details</h2>

                        <Input placeholder="" type="text" label="Name" size="fieldset-md" onChange={(e) => setName(e.target.value)} value={name}/>
                        <Input placeholder="" type="text" label="Surname" size="fieldset-md" onChange={(e) => setSurname(e.target.value)} value={surname}/>
                        <div className='divider'></div>

                        <div className='backgroundBlock'>
                          <div className='flex resume-title'> 
                          {/* <img className='logo' src={iconUser} alt='logo'/> */}
                          <h1 className='no-mr'>Personal Information</h1></div>
                          <Input placeholder="" type="email" label="email" size="fieldset-md" onChange={(e) => setEmail(e.target.value)} value={email}/>
                          <Input placeholder="" type="text" label="phone" size="fieldset-md" onChange={(e) => setPhone(e.target.value)} value={phone}/>
                          {/* <SelectDate size="fieldset-sm" label="Дата рождения" onChange={(date) => setBirthdate(date)} value={birthdate}/> */}
                        
                        </div>
                      </div>}

                      <button className='button button-black' >Edit</button>

                    <div className='divider'></div>

            </div>
      </div>
      </div>
    </main>
  )
}