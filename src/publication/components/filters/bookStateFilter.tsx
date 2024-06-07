import RadioButton from "../../../common/RadioButton";

const BookStateFilter: React.FC<{ value: string, setValue: (value: string) => void }> = ({ value, setValue }) => {
    const options = ["", "Nuevo", "Como Nuevo", "Usado", "Muy Usado"];

    return (
        <div className="flex flex-col">
            {options.map(option => (
                <RadioButton
                    key={option}
                    label={option || "Todos"}
                    value={option}
                    selectedValue={value}
                    setValue={setValue}
                />
            ))}
        </div>
    );
};

export default BookStateFilter;