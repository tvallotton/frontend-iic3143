import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { FaUser, FaBirthdayCake, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../auth/useAuth";

export type User = {
  id: string;
  name: string;
  lastName: string;
  birthdate: string;
  email: string;
};

const MyAccount = () => {
    const { user: userInfo } = useAuth();

    if (!userInfo) {
        return <div className='flex justify-center items-center p-5'>Cargando información...</div>;
    }

    return (
        <>
            <Navbar />
            <div className='pt-48 min-h-screen px-4 py-12 flex flex-col items-center font-body'>
                <div className='w-full max-w-6xl p-6 mb-6'>
                    <h1 className='text-4xl font-bold font-title mb-4'>Mi cuenta</h1>
                    <h2 className='text-2xl font-medium text-gray-800 mb-4'>
            ¡Bienvenido de vuelta, {userInfo.name}!
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <p className='mb-2'>
                                <FaUser className='inline mr-2' />
                Nombre: {`${userInfo.name} ${userInfo.lastName}`}
                            </p>
                            <p className='mb-2'>
                                <FaBirthdayCake className='inline mr-2' />
                Cumpleaños: {userInfo.birthdate}
                            </p>
                        </div>
                        <div>
                            <p>
                                <FaEnvelope className='inline mr-2' />
                Email: {userInfo.email}
                            </p>
                        </div>
                    </div>
                </div>
                <hr style={{ borderColor: "#ccc", width: "100%", marginBottom: "24px" }} />
                <div className='w-full max-w-6xl p-6'>
                    <h2 className='text-2xl font-medium text-gray-800 mb-4'>Mi historial de transacciones</h2>
                    <ul className='list-disc pl-5'>
                        <p>Todavia no hay transacciones</p>
                        {/* {userInfo.transactions.map((transaction) => (
              <li key={transaction.id} className='mb-1'>
                <span className='font-semibold'>{transaction.date}</span> -{' '}
                {transaction.description} -{' '}
                <span
                  className={`font-semibold ${
                    transaction.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {transaction.amount}
                </span>
              </li>
            ))} */}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyAccount;
