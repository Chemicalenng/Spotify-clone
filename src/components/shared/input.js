const TextInput = ({ label, placeholder, type, value, setValue }) => {
    return (
        <div className="textInput flex flex-col space-y-2 w-full mb-6">
            <label htmlFor={label} className="font-semibold">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="p-3 border border-gray-400 border-solid rounded-md placeholder-gray-500 text-black"
                id={label}
                value={value} //setting the value of an input field (or another component that has a value prop) to the value stored in the variable or state named value
                onChange={(e) => 
                    setValue(e.target.value)
                } />

        </div>
    )
}
export default TextInput;