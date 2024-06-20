import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { FaUser, FaBirthdayCake, FaEnvelope, FaStar } from "react-icons/fa";
import { useAuth } from "../auth/useAuth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCreate from "../review/reviewCreate";
import ShowReviews from "./components/showReviews";

export type User = {
    id: string;
    name: string;
    lastName: string;
    birthdate: string;
    email: string;
};

export type Transaction = {
    id: string;
    publicationId: string;
    publication: {
        title: string;
        ownerId: string;
    };
    status: string;
    emailSent: boolean;
    updatedAt: string;
};

export type Review = {
    rating: number;
    comment: string;
    publicationId?: string;
    reviewedUserId?: string;
};

const MyAccount: React.FC = () => {
    const { user: userInfo } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [showReviewForm, setShowReviewForm] = useState<null | string>(null);
    const [reviewsGiven, setReviewsGiven] = useState<Review[]>([]);
    const [userRating, setUserRating] = useState("Aun no disponible");
    const [receivedReviews, setReceivedReviews] = useState<Review[]>([]);

    const fetchInteractions = async () => {
        try {
            const response = await axios.get("/user/interactions");
            if (response.status === 200) {
                setTransactions(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchReviewsGiven = async () => {
        try {
            const response = await axios.get(`/reviews/given/${userInfo?.id}`);
            if (response.status === 200) {
                setReviewsGiven(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchReviewsReceived = async () => {
        try {
            const response = await axios.get(`/reviews/received/${userInfo?.id}`);
            if (response.status === 200) {
                setReceivedReviews(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const hasGivenReview = (transaction: Transaction) => {
        return reviewsGiven.some((review) => review.publicationId === transaction.publicationId);
    };

    const getUserRating = async () => {
        try {
            const response = await axios.get(`/reviews/rating/${userInfo?.id}`);
            if (response.data.average){
                setUserRating(response.data.average.toString());
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userInfo) {
            fetchInteractions();
            fetchReviewsGiven();
            fetchReviewsReceived();
            getUserRating();
        }
    }, [userInfo, showReviewForm]);

    const toggleReviewForm = (transactionId: string) => {
        setShowReviewForm(prev => prev === transactionId ? null : transactionId);
    };

    const handleCloseReviewForm = () => {
        setShowReviewForm(null);
    };

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
                                Cumpleaños: {userInfo.birthdate?.split("T")[0]}
                            </p>
                        </div>
                        <div>
                            <p>
                                <FaEnvelope className='inline mr-2' />
                                Email: {userInfo.email}
                            </p>
                            <p>
                                <FaStar className='inline mr-2' />
                                Rating: {userRating.toString().slice(0,3)}
                            </p>
                        </div>
                    </div>
                </div>
                <hr style={{ borderColor: "#ccc", width: "100%", marginBottom: "24px" }} />
                <div className='w-full max-w-6xl p-6'>
                    <h2 className='text-2xl font-medium text-gray-800 mb-4'>Mi historial de transacciones</h2>
                    <ul className='list-disc pl-5'>
                        <p className='font-semibold py-5'>Publicador contactado: </p>
                        {transactions
                            .filter((transaction) => transaction.status === "VIEWED")
                            .map((transaction) => (
                                <li key={`viewed-${transaction.id}`} className='mb-1'>
                                    <span>{transaction.publication.title}</span> -{" "}
                                    <span
                                        className={`font-semibold ${transaction.publicationId.startsWith("-") ? "text-red-500" : "text-green-500"
                                        } `}
                                    >
                                        <a href={`/publications/${transaction.publicationId}`}>Ver Publicación</a>
                                    </span> -{" "}
                                    Email enviado el {transaction.updatedAt.split(".")[0].replace("T", " a las ").replace("Z", "")}
                                </li>
                            ))}
                        <p className="font-semibold py-5">Completadas: </p>
                        {transactions
                            .filter((transaction) => transaction.status === "COMPLETED")
                            .map((transaction) => (
                                <li key={`completed-${transaction.id}`} className='mb-1'>
                                    <span>{transaction.publication.title}</span> -{" "}
                                    <span
                                        className={`font-semibold ${transaction.publicationId.startsWith("-") ? "text-red-500" : "text-green-500"
                                        } `}
                                    >
                                        <a href={`/publications/${transaction.publicationId}`}>Ver Publicación</a>
                                    </span> -{" "}
                                    Completada el {transaction.updatedAt.split(".")[0].replace("T", " a las ").replace("Z", "")}
                                    {/* add review button */}
                                    {!hasGivenReview(transaction) && (
                                        <span>
                                            <span> -{" "}</span>
                                            <button className='text-main-blue underline' onClick={() => toggleReviewForm(transaction.id)}> {showReviewForm === transaction.id ? "Cancelar" : "Dejar reseña"} </button>
                                        </span>
                                    )}
                                    {showReviewForm === transaction.id && (
                                        <div className="p-5">
                                            <div className="px-10 py-5 bg-slate-500 bg-opacity-30">
                                                <ReviewCreate publicationId={transaction.publicationId} reviewedUserId={transaction.publication.ownerId} onClose={handleCloseReviewForm} />
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
                <hr style={{ borderColor: "#ccc", width: "100%", marginBottom: "24px" }} />
                {/* reviews received */}
                <ShowReviews reviews={receivedReviews} />
            </div>
            <Footer />
        </>
    );
};

export default MyAccount;
