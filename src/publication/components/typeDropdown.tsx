interface TypeDropdownProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  name: string;
  id: string;
  options: string[];
}

const TypeDropdown = ({ label, value, onChange, name, id, options }: TypeDropdownProps) => {
    return (
        <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
                {label}
            </label>
            <select
                name={name}
                id={id}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => onChange(e)}
                value={value}
            >
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TypeDropdown;