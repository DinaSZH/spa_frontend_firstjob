import React from 'react'
import { Notification, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  return (
    <div>
        <Notification withCloseButton={false}  icon={checkIcon} style={{width: '520px', height: '150px', border: '1px solid rgb(211 207 207)'}} color="teal" title="Your data has been sent successfully!" >
            Please check your email! <br></br>
            The answer will come to you by email
        </Notification>
        <div className='login-footer'>
            <button onClick={() => navigate('/')}  className='button-primary'>
                Back to main page
            </button>
        </div> 
    </div>
  )
}

export default Success
