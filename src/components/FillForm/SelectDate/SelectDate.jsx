import { useState , useEffect} from "react"

export default function SelectDate({size, label, onChange, value}) {
    const [day, setDay] = useState("")
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState("")

    useEffect(() => {
        const date = new Date();
        date.setDate(day);
        date.setMonth(month);
        date.setFullYear(year);
        onChange(date)
        console.log(date)
    }, [day, month, year])

    useEffect(() => {
        if(value){
            const date = new Date(value)
            setDay(date.getDate())
            setMonth(date.getMonth())
            setYear(date.getFullYear())
        }
    }, [value])

    
    return(
        <fieldset className={"fieldset " + size} >
            <label>{label}</label>
            <div className="selectdate">
            <input className="input" placeholder="День" type="text" onChange={(e) => setDay(e.target.value)} value={day}/>
            <select onChange={(e) => setMonth(e.target.value)} placeholder="Месяц" className="input" value={month}>
                <option value={0}>январь</option>
                <option value={1}>февраль</option>
                <option value={2}>март</option>
                <option value={3}>апрель</option>
                <option value={4}>май</option>
                <option value={5}>июнь</option>
                <option value={6}>июль</option>
                <option value={7}>август</option>
                <option value={8}>сентябрь</option>
                <option value={9}>октябрь</option>
                <option value={10}>ноябрь</option>
                <option value={11}>декабрь</option>
            </select>
            <input className="input" placeholder="Год" type="text" onChange={(e) => setYear(e.target.value)} value={year}/>
            </div>
            
        </fieldset>
    )
}