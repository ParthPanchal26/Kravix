import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-slate-700',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
    return (
        <button className={`px-4 py-2 rounded-lg transition hover:bg-slate-900 hover:text-white ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
    )
}

export default Button