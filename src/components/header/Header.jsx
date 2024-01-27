import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../../assets/images/logo.png'
import KeycloakService from '../../services/KeycloakService';
import { Menu, Button, Text, rem } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import RenderOnAuthenticated from "../../helpers/RenderOnAuthenticated";
import RenderOnAnonymous from "../../helpers/RenderOnAnonymous";

function Header() {
  
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(KeycloakService.isLoggedIn());

  useEffect(() => {
    const updateAuthenticationStatus = () => {
      setIsLoggedIn(KeycloakService.isLoggedIn());
    };

    KeycloakService.getKeycloak().onAuthSuccess = updateAuthenticationStatus;

    return () => {
      KeycloakService.getKeycloak().onAuthSuccess = null;
    };
  }, [isLoggedIn]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner"> 
          <div className='header-left'>
            <Link to="/"><img className='logo' src={logo} alt='logo'/></Link>
            <Link to="/">Home</Link>
            <RenderOnAnonymous><Link to="/employer/signup">For employers</Link></RenderOnAnonymous>
            <RenderOnAnonymous><Link to="/mentor/signup">Mentorship</Link></RenderOnAnonymous>
            <RenderOnAuthenticated><Link to="/profile/:username">Profile</Link></RenderOnAuthenticated>
            <RenderOnAuthenticated><Link to="/resumes">Resumes</Link></RenderOnAuthenticated>
            
          </div>

          <div className='header-right'>
            {!isLoggedIn&& (
              <div className='flex gap'>
                <button onClick={() => navigate('/register')} className='button no-mr'>
                  Sign Up
                </button>
                <button  onClick={() => KeycloakService.doLogin()} className='button no-mr'>
                  Sign In
                </button>
              </div>
            )}
            
            {isLoggedIn && (
              <>
               <Menu shadow="md" width={200} >
                  <Menu.Target >
                    <Button >{KeycloakService.getUsername()}</Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item onClick={() => navigate('/profile/:username')} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                      Profile
                    </Menu.Item>

                    <Menu.Divider />
                    <Menu.Item  onClick={() => KeycloakService.doLogout()}
                      color="red"
                      leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    >
                      Logout account
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

