import { useState, useEffect } from "react"

export default function SelectEmploymentTypes({employmentTypes, label, size, onChange, allEmploymentTypes}) {
    const [eTypes, setETypes] = useState([])

    // useEffect(() => {
    //     setETypes(employmentTypes)
    // }, [employmentTypes])

    const onSelect = (e) => {
        // console.log(e.target.value, e.target.name, e.target.checked)

        const tps = [...employmentTypes]
        if(e.target.checked && !tps.includes(e.target.value*1)){
            onChange([...tps, e.target.value*1])
        } else if(!e.target.checked && tps.includes(e.target.value*1)){
            const index = tps.indexOf(e.target.value*1);
            tps.splice(index, 1);
            onChange(tps)
        }
    }

    // useEffect(() => {
    //     onChange(eTypes)
    // }, [eTypes])

    // console.log(eTypes)
    return(
        <fieldset className={"fieldset " + size} >
            <label>{label}</label>
            <div>
                {/* {allEmploymentTypes.map((type, index) => <div key={index} className="checkbox">
                    {employmentTypes.includes(type.id) &&   <input type="checkbox" name="employmentTypes" value={type.id} id={type.id + "-type"} onChange={onSelect} checked/> }
                    {!employmentTypes.includes(type.id) &&   <input type="checkbox" name="employmentTypes" value={type.id} id={type.id + "-type"} onChange={onSelect}/> }
                  
                    <label for={type.id + "-type"}>{type.name}</label>
            </div>
                    )} */}
                    
                    <form className="flex">
                        <input id="html" type="checkbox" className="m3"/>
                        <label for="html">Полная занятость</label>
                    </form>
                    <form className="flex">
                        <input id="html" type="checkbox" className="m3"/>
                        <label for="html">Частичная занятость</label>
                    </form>
                    <form className="flex">
                        <input id="html" type="checkbox" className="m3"/>
                        <label for="html">Проектная работа</label>
                    </form>
                    <form className="flex">
                        <input id="html" type="checkbox" className="m3"/>
                        <label for="html">Волонетрство</label>
                    </form>
                    <form className="flex">
                        <input id="html" type="checkbox" className="m3"/>
                        <label for="html">Стажировка </label>
                    </form>
            </div>
        </fieldset>
    )
}