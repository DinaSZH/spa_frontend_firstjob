import { DatePickerInput } from "@mantine/dates"
import { useState } from "react"
export default function ModalAddExp({close, addEducation}) {
    const [startDate, setStartDate] = useState(Date.now())
    const [endDate, setEndDate] = useState(Date.now())

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
        const education = {
            startDate,
            endDate,
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

                {/* {testdate.toLocaleDateString()} */}
                <DatePickerInput
                              placeholder="Pick date"
                              onChange={(date) => setStartDate(date)}
                              className='mb10'/>

                <h4>Конец обучения</h4>

                <DatePickerInput
                    placeholder="Pick date"
                    onChange={(date) => setEndDate(date)}
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