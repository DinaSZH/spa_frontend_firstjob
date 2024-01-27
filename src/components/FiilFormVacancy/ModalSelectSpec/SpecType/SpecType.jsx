import { useEffect, useState } from "react"
import Spec from "./Spec/Spec"

export default function SpecType({specType, onChange, value}) {
    const [active, setActive] = useState(false)
    useEffect(() => {
        specType.specializations.map(spec => spec.id === value ? setActive(true):null)
    }, [])
    return (
        <div>
        <div className={`specTypes${active?" active":""}`} onClick={() => setActive(!active)}>
            <img src="/images/arrow.png"/>
            {specType.name}
        </div>
        {active && specType.specializations.map(spec => (<Spec key={spec.id} spec={spec} onChange={onChange} value={value}/>) )}
        </div>
    )
}