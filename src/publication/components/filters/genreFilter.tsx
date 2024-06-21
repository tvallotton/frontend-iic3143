import { useGenres } from "../context/genresContext";
import RadioButton from "../../../common/RadioButton";

const GenreFilter: React.FC<{ value: string, setValue: (value: string) => void }> = ({ value, setValue }) => {
    const genres = useGenres();

    return (
        <div className="flex flex-col">
            <RadioButton label="Todos" value="" selectedValue={value} setValue={setValue} />
            {genres.map((genre) => (
                <RadioButton key={genre} label={genre} value={genre} selectedValue={value} setValue={setValue} />
            ))}
        </div>
    );
};

export default GenreFilter;