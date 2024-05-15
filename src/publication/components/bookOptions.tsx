interface BookOption {
    id: string;
    title: string;
    image: string;
    author: string;
}

interface BookOptionsProps {
    books: BookOption[];
    visible: boolean;
    onSelectBook: (bookid: string) => void;
    loadingSearch: boolean;
}

const BookOptions = ( { books, visible, onSelectBook, loadingSearch} : BookOptionsProps) => {
    return(
        <div style={{visibility: visible || loadingSearch ?"visible":"hidden"}} className="max-w-[550px] max-h-80 absolute z-50 overflow-y-scroll bg-slate-200">
            {!loadingSearch ? books.map((book) => (
                <div key={book.id} onMouseDown={(e) => e.preventDefault()} onClick={() => onSelectBook(book.id)} className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                    <div className="flex w-full h-20 items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                        <div className="w-6 flex flex-col items-center">
                            <div className="pl-2 flex relative w-12 h-12 justify-center items-center m-1 mr-2 mt-1"><img className="" alt="A" src={book.image}/> </div>
                        </div>
                        <div className="w-full items-center flex">
                            <div className="mx-2 -mt-1 pl-3 ">{book.title}
                                <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">{book.author}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )) : <div className="w-full h-20 flex items-center justify-center">Cargando...</div>}
        </div>
    );
};

export default BookOptions;
