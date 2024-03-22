'use client';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { IconCalendarMonth, IconDiscountCheck, IconLicense, IconMapPin, IconPremiumRights, IconTool } from '@tabler/icons-react';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import KeycloakService from '../../../services/KeycloakService';
// import { deleteVacancy } from '@/app/store/slices/vacancySlice';
export default function MyVacancy ({item}) {
    
    // const dispatch = useDispatch()

    // const currentUser = useSelector(state => state.auth.currentUser)
    const [opened, { open, close }] = useDisclosure(false);
    const [applicationStatus, setApplicationStatus] = useState(null);

    const userIsHR = KeycloakService.hasFirstJobHRRole();
    const userIsUser = KeycloakService.hasFirstJobUserRole();

    const renderApplicationStatus = () => {
        if (applicationStatus === null) {
          return (
            <Button variant="filled" color="green" size="sm" radius="xl" onClick={open}>
              Apply <IconDiscountCheck className='ml1'/>
            </Button>
          );
        } else if (applicationStatus === "APPLIED") {
          return (
            <span style={{ color: "green" }}>You have successfully applied!</span>
          );
        } else if (applicationStatus === "TEST_FAILED") {
          return (
            <span style={{ color: "gray" }}>You failed the test!</span>
          );
        } else {
          return null; 
        }
      };

      const renderActions = () => {
        if (userIsHR) {
            // Render edit and delete buttons
            return (
                <div className='flex'>
                    <Link to={`/vacancy/edit/${item.id}`}><span className='button-edit'>Edit</span></Link>
                    <span className='button-delete' onClick={() => dispatch(deleteResumeById(item.id))}>Delete</span>
                </div>
            );
        } else if (userIsUser){
            return renderApplicationStatus();
        }
    };

    return (<div className="card mtb4">

        <div className='flex flex-ai-c resume-title flex-jc-sb'>
            <div className='flex'>
            <IconLicense className='mr10' size={50} />
            <Link className="h2 link" to={`/vacancies/${item.id}`} >{item.title}</Link>
            </div>
            {renderActions()} 
            <div className='flex'>
            <Link to={`/vacancy/edit/${item.id}`}><span className='button-edit'>Edit</span></Link>
            <span className='button-delete' onClick={() => dispatch(deleteResumeById(item.id))}>Delete</span>
            </div>
        </div>

        <h2 className='flex flex-ai-c'>
                   <IconPremiumRights className='mr10'/> {item.salaryFrom}- {item.salaryTo} {item.сurrency}
        </h2>
        <div className='flex mb10'><IconMapPin className='mr10' /> City, Country</div>
        <div className="skill flex flex-ai-c ">
        <div className='flex'><IconTool className='mr10'/>Experience</div>
        <div className='date flex'> 
            <IconCalendarMonth />
            <p>{item.createdAt}</p>
        </div>
      </div>
     
        <Modal opened={opened} onClose={close} title="Test preview" centered>
            <div className='h2 link'>You need to pass a test in order to apply for a vacancy</div>
            <div className='flex'>
                <h3>Description: </h3>
                <p> description text</p>
            </div>
            <div className='flex'>
                <h3>Threshold Score: </h3>
                <p> threshold score</p>
            </div>
            <div className='flex'>
                <h3>Total Score: </h3>
                <p> totalScore</p>
            </div>
            <div className='flex gap flex-end flex-jc-end'>
                <Button 
                //loading={loading}
                >Go to test</Button>
            </div>
        </Modal>
    </div>)
}