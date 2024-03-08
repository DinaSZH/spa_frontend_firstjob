import { DatePickerInput } from "@mantine/dates"
import { useState } from "react"
export default function ModalAddExp({close, addWorkingHistory}) {
    const [start_date, setStartDate] = useState(Date.now())
    const [end_date, setEndDate] = useState(Date.now())

    const [company, setCompany] = useState("")
    const [company_description, setCompany_description] = useState("")
    const [responsibilitites, setResponsibilitites] = useState("")


    const onChangeCompanyName = (e) => {
        setCompany(e.target.value)
    }

    const onChangeCompanyDescription = (e) => {
        setCompany_description(e.target.value)
    }

    const onChangeResponsibilitites = (e) => {
        setResponsibilitites(e.target.value)
    }

    const save = () => {
        const workingHistory = {
            start_date,
            end_date,
            responsibilitites,
            company,
            company_description
        }

        console.log(workingHistory)
        addWorkingHistory(workingHistory)
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
                <input className="input" placeholder="Должность" type="text" onChange={onChangeCompanyDescription} value={company_description}/>

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