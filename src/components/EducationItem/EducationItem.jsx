export default function EducationItem({ education, remove }) {
  return (
    <fieldset className="working-history">
      <span>
        {education.startYear} - {education.endYear}{" "}
      </span>
      <h4>{education.instanceName}</h4>
      <h4>{education.level}</h4>
      <h4>{education.specialization}</h4>

      <span className="cursor" onClick={() => remove(education)}>
        delete
      </span>
    </fieldset>
  );
}
