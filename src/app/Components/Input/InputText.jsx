import React from 'react'

const InputText = ({ Placeholder, Name, ClassName, value, onChange, Type }) => {
  return (
    <div ClassName="grid  bg-red-500 max-w-lg  items-center gap-5 w-[5vw]  sm:w-96">
      <label
        className={`text-lg text-gray-900 mb-4 font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${ClassName}`}
      >{Name}</label>
      <input
        placeholder={Placeholder}
        type={Type || "text"}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${ClassName}` }
        value={value}
        onChange={onChange}
      />
    </div>

  )
}

export default InputText