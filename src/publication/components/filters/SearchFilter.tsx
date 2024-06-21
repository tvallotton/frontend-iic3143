const SearchFilter = ({ value, onChange, placeholder }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }) => (
    <div className="relative w-96 p-2">
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-3 pl-10 mb-4 border-2 border-gray-300 rounded-md text-lg"
        />
        <svg className="absolute left-3 top-6 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>
);

export default SearchFilter;