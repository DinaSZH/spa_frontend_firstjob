import React from 'react'
import Header from '../components/header/Header'
import homeLogo from '../assets/images/homePhoto.png'
import KeycloakService from '../services/KeycloakService'

const Home = () => {
  return (
    <div>
      <div className='container'>
        <div className='home-block'>
            <div>
              <h1>First Job</h1>
              <p>Job for everyone</p>
              <div>
              <button className='button'>
                  Search
              </button>
              </div>
              
            </div>

            <div>
              <img className='homePhoto' src={homeLogo} alt='logo'/>
            </div>
        </div>
       
      </div>
    </div>
  )
}

export default Home
