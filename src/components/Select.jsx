import React from 'react'

const Select = ({
    options,
    label,
    className = '',
    ...props
}, ref) => {

    const id = React.useId();

    return (
        <div className='w-full'>
            {label && <label className='' htmlFor={id}></label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-slate-50 duration-200 border border-slate-200 w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);