import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = 'text',
    className = '',
    placeholder,
    ...props
}, ref){
    const inputId = useId()
    return (
        <div className='w-full'>
            {label && <label
            className='inline-block mb-1 pl-1'
            htmlFor={inputId}
            >
                {label}
            </label>
            }
            <input type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            placeholder={placeholder}
            id={inputId}
            {...props}
            />
        </div>
    )
})

export default Input