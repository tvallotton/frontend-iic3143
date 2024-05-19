interface FormTextInputProps {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    type: string;
    name: string;
    id: string;
    disabled?: boolean;
}

const FormTextInput = ( { label, value, onChange, placeholder, type, name, id, disabled = false} : FormTextInputProps) => {
    return(
        name !== "description" ?
            <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                    {label}
                </label>
                <input type={type}  name={name} id={id} placeholder={placeholder} disabled={disabled}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                    onChange={(e) => onChange(e)} value={value}/>
            </div> : <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                    {label}
                </label>
                <textarea placeholder={placeholder} disabled={disabled}
                    className="w-full h-60 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                    onChange={(e) => onChange(e)} value={value} name={name} id={id}/>
            </div>
    );
};

export default FormTextInput;