import { useState } from "react";

export default function(dafaultValue = false)
{
    const [value, setValue] = useState(dafaultValue);
    
    const toggler = (newValue) => {
        setValue(oldValue => {
            if (typeof newValue === 'function') return newValue
            return !oldValue;
        })
    }

    return [value, toggler]
}