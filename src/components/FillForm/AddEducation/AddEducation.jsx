import { DatePickerInput, YearPickerInput } from "@mantine/dates"
import { useState } from "react"
export default function ModalAddExp({close, addEducation}) {
    const [startYear, setStartYear] = useState(); 
    const [endYear, setEndYear] = useState()
    const [instanceName, setInstanceName] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [level, setLevel] = useState("")

    const onChangesetInstanceName = (e) => {
        setInstanceName(e.target.value)
    }
    
    const onChangeSpecialization = (e) => {
        setSpecialization(e.target.value)
    }
    
    const onChangeLevel = (e) => {
        setLevel(e.target.value)
    }
    
    const save = () => {
        const formattedStartYear = startYear ? startYear.getFullYear() : null;
        const formattedEndYear = endYear ? endYear.getFullYear() : null;
    
        const education = {
            startYear: formattedStartYear,
            endYear: formattedEndYear,
            instanceName,
            specialization,
            level
        }
    
        console.log(education)
        addEducation(education)
    }   
    
    return(
        <div className="modal">
            <div className="modal-backdrop" onClick={close}></div>
            <div className="modal-inner">
    
                <h2>Образование</h2>
                <h4>Начало обучения</h4>

                <YearPickerInput
                    label="Pick date"
                    value={startYear}
                    onChange={(date) => setStartYear(date)}
                    className='mb10'/>
    
                <h4>Конец обучения</h4>
                
                <YearPickerInput
                    label="Pick date"
                    value={endYear}
                    onChange={(date) => setEndYear(date)}
                    className='mb10'/>
    
                <h4>Название учебного заведения</h4>
                <input className="input" placeholder="Название учебного заведения" type="text" onChange={onChangesetInstanceName} value={instanceName}/>
    
                <h4>Специализация</h4>
                <input className="input" placeholder="Специализация" type="text" onChange={onChangeSpecialization} value={specialization}/>
    
                <h4>Уровень образования</h4>
                <input className="input" placeholder="Уровень образования" type="text" onChange={onChangeLevel} value={level}/>
    
                <div className="modal-actions">
                    <button className="button button-primary-bordered" onClick={close}>Отменить</button>
                    <button className="button button-primary" onClick={save}>Сохранить</button>
                 </div>
                
            </div>         
    </div>
    )
    }