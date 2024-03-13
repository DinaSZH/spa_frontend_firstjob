import { useState, useEffect } from "react"

export default function SelectEmploymentTypes({employmentType, label, size, onChange, allEmploymentTypes}) {
    const [eTypes, setETypes] = useState([])

    const onSelect = (e) => {
        // Check if employmentType is not undefined and has a valid value
        if (employmentType && employmentType.includes) {
          const tps = [...employmentType];
          if (e.target.checked && !tps.includes(e.target.value * 1)) {
            onChange([...tps, e.target.value * 1]);
          } else if (!e.target.checked && tps.includes(e.target.value * 1)) {
            const index = tps.indexOf(e.target.value * 1);
            tps.splice(index, 1);
            onChange(tps);
          }
        }
      };
      
    return(
        <fieldset className={"fieldset " + size} >
            <label>{label}</label>
            <div>
                {allEmploymentTypes.map((type, index) => <div key={index} className="checkbox">
                    {employmentType.includes(type.id) &&   <input type="checkbox" name="employmentType" value={type.id} id={type.id + "-type"} onChange={onSelect} checked/> }
                    {!employmentType.includes(type.id) &&   <input type="checkbox" name="employmentType" value={type.id} id={type.id + "-type"} onChange={onSelect}/> }
                  
                    <label htmlFor={type.id + "-type"}>{type.name}</label>
            </div>
                    )}
                    
                    
            </div>
        </fieldset>
    )
}