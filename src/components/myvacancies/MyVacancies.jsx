import MyVacancy from "./myvacancy/MyVacancy";
import { useSelector } from 'react-redux';

export default function MyVacancies () {
    // const vacancies = useSelector((state) => state.vacancy.vacancies)
    const vacancies = [{
        name: 'Software engineer',
        createdAt:  '23.01.2023',
        salary_from: 400000,
        salary_to:800000,
        salary_type:'KZT',
        skills: ['Node.JS', "SQL", "Vue", 'Javascript']
      },
      {
        name: 'React engineer',
        createdAt:  '23.01.2023',
        salary_from: 300000,
        salary_to:400000,
        salary_type:'KZT',
        skills: ['React', "Redux", "Vue", 'Javascript']
      },
      {
        name: 'Backend engineer',
        createdAt:  '23.01.2023',
        salary_from: 100000,
        salary_to:300000,
        salary_type:'KZT',
        skills: ['Java', "Spring", "MySQL", 'GIT']
      }]


    const showVacancies = vacancies.map(item => (<MyVacancy 
        item={item}
        key={item.id}
        />));
    return(<div>
        {showVacancies}
    </div>)
}