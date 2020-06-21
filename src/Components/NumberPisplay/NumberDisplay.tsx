import React from 'react'
import './NumberDisplay.scss'


interface NumberDisplay {
    value: number
}


const NumberDisplay: React.FC<NumberDisplay> = ({value}) => {
    return (
        <div className='NumberDisplay'>
            {value.toString().padStart(3, '0')}
        </div>
    )
}

export default NumberDisplay
