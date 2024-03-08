const months = ['январь','февраль','март','апрель','май','июнь','июль','август',
 'сентябрь', 'октябрь','ноябрь','декабрь'];

export default function EducationItem({education, remove}) {
    const startDate = new Date(education.startDate)
    const endDate = new Date(education.endDate)
    return(
        <fieldset className="working-history" >
           <span>{months[startDate.getMonth()]} {startDate.getUTCFullYear()} - {months[endDate.getMonth()]}  {endDate.getUTCFullYear()} </span>
           <h4>{education.instanceName}</h4>
           <h4>{education.level}</h4>
           <h4>{education.specialization}</h4>

           <span onClick={() => remove(education)}>удалить</span>
        </fieldset>
    )
}