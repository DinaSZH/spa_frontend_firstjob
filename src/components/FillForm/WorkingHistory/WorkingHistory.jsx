const months = ['январь','февраль','март','апрель','май','июнь','июль','август',
 'сентябрь', 'октябрь','ноябрь','декабрь'];

export default function WorkingHistory({workingHistory, remove}) {
    const startDate = new Date(workingHistory.start_date)
    const endDate = new Date(workingHistory.end_date)
    return(
        <fieldset className="working-history" >
           <span>{months[startDate.getMonth()]} {startDate.getUTCFullYear()} - {months[endDate.getMonth()]}  {endDate.getUTCFullYear()} </span>
           <h4>{workingHistory.company_name}</h4>
           <h4>{workingHistory.company_description}</h4>

           <span onClick={() => remove(workingHistory)}>удалить</span>
        </fieldset>
    )
}