import { DatePickerInput } from "@mantine/dates"
import { useState } from "react"
export default function ModalAddExp({close, addWorkingHistory}) {
    const [startDate, setStartDate] = useState(Date.now())
    const [endDate, setEndDate] = useState(Date.now())

    const [company, setCompany] = useState("")
    const [position, setPosition] = useState("")
    const [responsibilitites, setResponsibilitites] = useState("")


    const onChangeCompanyName = (e) => {
        setCompany(e.target.value)
    }

    const onChangePosition = (e) => {
        setPosition(e.target.value)
    }

    const onChangeResponsibilitites = (e) => {
        setResponsibilitites(e.target.value)
    }

    const save = () => {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        const workingHistory = {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            responsibilitites,
            company,
            position
        }

        console.log(workingHistory)
        addWorkingHistory(workingHistory)
    }

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString('en-US', options);
    }


    return(
        <div className="modal">
            <div className="modal-backdrop" onClick={close}></div>
            <div className="modal-inner">

                <h2>Опыт работы</h2>
                <h4>Начало работы</h4>

                {/* {testdate.toLocaleDateString()} */}
                <DatePickerInput
                              placeholder="Pick date"
                              onChange={(date) => setStartDate(date)}
                              className='mb10'/>

                <h4>Конец работы</h4>

                <DatePickerInput
                    placeholder="Pick date"
                    onChange={(date) => setEndDate(date)}
                    className='mb10'/>

                <h4>Организация</h4>
                <input className="input" placeholder="Название компании" type="text" onChange={onChangeCompanyName} value={company}/>

                <h4>Должность</h4>
                <input className="input" placeholder="Должность" type="text" onChange={onChangePosition} value={position}/>

                <h4>Обязанности на рабочем месте</h4>
                <textarea className="textarea" placeholder="Опишите что вы делали на работе" type="text" onChange={onChangeResponsibilitites}>{responsibilitites}</textarea>
                <div className="modal-actions">
                    <button className="button button-primary-bordered" onClick={close}>Отменить</button>
                    <button className="button button-primary" onClick={save}>Сохранить</button>
             </div>
            </div>
             
             
    </div>
    )
}