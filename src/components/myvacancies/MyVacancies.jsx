import MyVacancy from "./myvacancy/MyVacancy";
import { useSelector } from 'react-redux';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './MyVacancies.module.css';


export default function MyVacancies ({vacancies}) {
   
    const showVacancies = vacancies && vacancies.length > 0 ? vacancies.map(item => (
        <MyVacancy 
          item={item}
          key={item.id}
        />
      )) : <Container className={classes.root}>
      <Title className={classes.title}>There is no vacancies.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
      You do not have any vacancies, create a vacancy by clicking on the button "Create Vacancy"
      </Text>
    </Container>;

    return(<div>
        {showVacancies}
    </div>)
}