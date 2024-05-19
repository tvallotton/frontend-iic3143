import libraryImage from './assets/library.jpeg';
import { Link } from 'react-router-dom'; 
import Navbar from './common/Navbar';

// // Componente para representar una categoría de libro
// const BookCategory = ({ name: string, image: string }) => (
//   <div className="text-center">
//     <img src={image} alt={name} className="w-40 h-40 object-cover mx-auto" />
//     <h3 className="mt-2 text-lg">{name}</h3>
//   </div>
// );

export default function LandingPage() {

  const categories = [
    { name: 'Ficción', image: 'path/to/fiction.jpg' },
    { name: 'Ciencia', image: 'path/to/science.jpg' },

  ];

  return (
    <>
    <Navbar/>
    <div className='font-body'>
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold font-title">Únete a una comunidad de lectores</h1>
        <p className="text-xl mt-4">Compárte, intercambia y vende libros por internet.</p>
        <Link to="/search" className="mt-6 inline-block bg-main-blue hover:bg-dark-blue text-white py-2 px-8 rounded transition duration-300 font-body">Buscar ahora</Link>
      </section>

      <section className='justify-center flex'>
        <img src={libraryImage} alt="Library" className="w-full h-64 object-none px-4" />
      </section>

      {/* Book Categories Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          {categories.map((category) => (
            // <BookCategory key={category.name} name={category.name} image={category.image} />
            <h1>{category.name}</h1>
          ))}
        </div>
      </section>

      {/* New Publications Section */}
      <section className="bg-gray-200 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Nuevas Publicaciones</h2>
          {/* Aquí podrías listar las nuevas publicaciones, posiblemente usando otro componente */}
        </div>
      </section>
    </div>
    </>
    
  );
}