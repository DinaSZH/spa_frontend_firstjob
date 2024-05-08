import MyVacancy from "./myvacancy/MyVacancy";
import { useSelector } from "react-redux";
import { Title, Text, Container } from "@mantine/core";
import classes from "./MyVacancies.module.css";

export default function MyVacancies({ vacancies }) {
  const showVacancies = vacancies.map((item) => <MyVacancy item={item} key={item.id} />)


  return <div>{showVacancies}</div>;
}
