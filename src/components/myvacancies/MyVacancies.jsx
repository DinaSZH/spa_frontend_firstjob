import MyVacancy from "./myvacancy/MyVacancy";
import { useSelector } from 'react-redux';

export default function MyVacancies () {
    // const vacancies = useSelector((state) => state.vacancy.vacancies)
    const vacancies = [{
        title: 'Software engineer',
        createdAt:  '23.01.2023',
        salaryFrom: 400000,
        salaryTo:800000,
        сurrency:'KZT',
        skills: ['Node.JS', "SQL", "Vue", 'Javascript']
      },
      {
        title: 'React engineer',
        createdAt:  '23.01.2023',
        salaryFrom: 300000,
        salaryTo:400000,
        сurrency:'KZT',
        skills: ['React', "Redux", "Vue", 'Javascript']
      },
      {
        title: 'Backend engineer',
        createdAt:  '23.01.2023',
        salaryFrom: 100000,
        salaryTo:300000,
        сurrency:'KZT',
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