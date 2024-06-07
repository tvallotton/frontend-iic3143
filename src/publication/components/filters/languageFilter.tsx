import RadioButton from "../../../common/RadioButton";

const LanguageFilter: React.FC<{value: string, setValue: (value: string) => void}> = ({value, setValue}) => {
    const options = [
        { value: "", label: "Todos" },
        { value: "en", label: "Inglés" },
        { value: "es", label: "Español" },
        { value: "fr", label: "Francés" },
        { value: "de", label: "Alemán" },
    ];

    return (
        <div className="flex flex-col">
            {options.map(option => (
                <RadioButton
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    selectedValue={value}
                    setValue={setValue}
                />
            ))}
        </div>
    );
};

export default LanguageFilter;