import MyVacancy from "./myvacancy/MyVacancy";

export default function MyVacancies({ vacancies }) {
  const showVacancies = vacancies.map((item) => <MyVacancy item={item} key={item.id} />)


  return <div>{showVacancies}</div>;
}
