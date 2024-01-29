import { useState , useEffect} from "react"

export default function SelectDate({size, label, onChange, value}) {
    const [day, setDay] = useState("")
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState("")

    useEffect(() => {
        if (day !== "" && month !== "" && year !== "") {
          const date = new Date(year, month, day);
          onChange(date);
        }
      }, [day, month, year, onChange]);
    
      useEffect(() => {
        if (value) {
          const date = new Date(value);
          setDay(date.getDate().toString());
          setMonth(date.getMonth().toString());
          setYear(date.getFullYear().toString());
        }
      }, [value]);

    
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