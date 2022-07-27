import React, { ChangeEventHandler } from 'react'

interface InputProps {
  label?: string
  type?: string
  placeholder: string
  color?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  name?: string
  value?: string
}

const InputBox = ({
  label,
  type,
  placeholder = '',
  color = 'black',
  onChange,
  name,
  value,
}: InputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 dark:text-white"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          className={`block w-full rounded-md border border-gray-300 bg-transparent p-3 text-${color} focus:border-leviplatte focus:ring-leviplatte sm:text-sm`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  )
}

export default InputBox
