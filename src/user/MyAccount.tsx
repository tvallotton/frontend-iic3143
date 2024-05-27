import React, { useState, useEffect } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

// Simulando una función que obtiene la información del usuario y su historial de transacciones
const fetchUserInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Humano Amigable',
        email: 'humano@ejemplo.com',
        transactions: [
          { id: 1, date: '2024-05-01', amount: '-$50', description: 'Compra de comida' },
          { id: 2, date: '2024-05-15', amount: '+$1500', description: 'Depósito de nómina' },
        ],
      });
    }, 1000);
  });
};

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUserInfo().then((data) => {
      setUserInfo(data);
    });
  }, []);

  if (!userInfo) {
    return <div className="flex justify-center items-center p-5">Cargando información...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold mb-4 text-main-blue mt-48">Aquí está tu información, {userInfo.name}</h2>
      <p className="mb-2"><span className="font-semibold">Email:</span> {userInfo.email}</p>
      <h3 className="font-bold mb-2 text-main-blue">Historial de Transacciones:</h3>
      <ul className="list-disc">
        {userInfo.transactions.map((transaction) => (
          <li key={transaction.id} className="mb-1">
            <span className="font-semibold">{transaction.date}</span> - {transaction.description} - <span className="font-semibold text-main-blue">{transaction.amount}</span>
          </li>
        ))}
      </ul>
    </div>
    <Footer/>
    </>
  );
};

export default MyAccount;