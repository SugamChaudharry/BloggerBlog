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
        <div className="form-control">
            {label && <label
            className="label"
            htmlFor={inputId}
            >
                <span className="label-text">{label}</span>
            </label>
            }
            <input type={type}
            className="input input-bordered"
            ref={ref}
            placeholder={placeholder}
            id={inputId}
            {...props}
            />
        </div>
    )
})

export default Input