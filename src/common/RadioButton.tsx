const RadioButton: React.FC<{ label: string, value: string, selectedValue: string, setValue: (value: string) => void }> = ({ label, value, selectedValue, setValue }) => {
    return (
        <label className="inline-flex items-center">
            <input
                type="radio"
                className="form-radio"
                value={value}
                checked={selectedValue === value}
                onChange={(e) => setValue(e.target.value)}
            />
            <span className="ml-2">{label}</span>
        </label>
    );
};

export default RadioButton;