import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { FaUser, FaStar } from "react-icons/fa";
//import { useAuth } from "../auth/useAuth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Review } from "./MyAccount";
import { useParams } from "react-router-dom";
import ShowReviews from "./components/showReviews";

export type User = {
  id: string;
  name: string;
  lastName: string;
  birthdate: string;
};

const OtherUsersProfile: React.FC = () => {
    const [profileInfo, setProfileInfo] = useState<User | null>(null);
    const { userId } = useParams();
    const [userRating, setUserRating] = useState("Aun no disponible");
    const [receivedReviews, setReceivedReviews] = useState<Review[]>([]);

    const fetchProfileInfo = async () => {
        try {
            const response = await axios.get("/user/" + userId);
            if (response.status === 200) {
                console.log(response.data.user);
                setProfileInfo(response.data.user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getUserRating = async () => {
        try {
            const response = await axios.get(`/reviews/rating/${userId}`);
            if (response.data.average){
                setUserRating(response.data.average.toString());
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchReviewsReceived = async () => {
        try {
            const response = await axios.get(`/reviews/received/${userId}`);
            if (response.status === 200) {
                setReceivedReviews(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfileInfo();
        getUserRating();
        fetchReviewsReceived();
    }, [userId]);

    return (
        <>
            <Navbar />
            <div className="pt-48 min-h-screen px-4 py-12 flex flex-col items-center font-body">
                <div className="w-full max-w-6xl p-6 mb-5">
                    <h1 className='text-4xl font-bold font-title mb-4'>Perfil de usuario</h1>
                    <div className="mt-6">
                        <div className="flex justify-between">
                            <div>
                                <FaUser className="inline mr-2" />
                Nombre: {profileInfo?.name} {profileInfo?.lastName}
                            </div>
                        </div>
                        <div className="mt-4">
                            <FaStar className="inline mr-2" />
              Rating: {userRating}
                        </div>
                    </div>
                </div>
                <hr style={{ borderColor: "#ccc", width: "100%", marginBottom: "24px" }} />
                <ShowReviews reviews={receivedReviews} />
            </div>
            <Footer />
        </>
    );
};

export default OtherUsersProfile;