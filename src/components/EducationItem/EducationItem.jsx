const months = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

export default function EducationItem({ education, remove }) {
  // const startDate = new Date(education.startYear)
  // const endDate = new Date(education.endYear)
  return (
    <fieldset className="working-history">
      <span>
        {education.startYear} - {education.endYear}{" "}
      </span>
      <h4>{education.instanceName}</h4>
      <h4>{education.level}</h4>
      <h4>{education.specialization}</h4>

      <span className="cursor" onClick={() => remove(education)}>
        удалить
      </span>
    </fieldset>
  );
}
