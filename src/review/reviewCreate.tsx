import axios from "axios";
import React, { useState } from "react";
import FormTextInput from "../publication/components/formTextInput";

interface Review {
  rating: number;
  comment: string;
  publicationId?: string;
  reviewedUserId?: string;
}

interface ReviewCreateProps {
  publicationId?: string;
  reviewedUserId?: string;
  onClose?: () => void;
}

const ReviewCreate: React.FC<ReviewCreateProps> = ({ publicationId, reviewedUserId, onClose }) => {
    const [formData, setFormData] = useState<Review>({
        rating: 3,
        comment: "",
        publicationId: publicationId,
        reviewedUserId: reviewedUserId,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/reviews", formData);
            if (onClose) onClose();
        } catch (error) {
            console.error("Error creating review:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        var { name, value } = e.target;
        if (name === "rating" && (parseInt(value) < 1 || parseInt(value) > 5)) {
            return;
        }
        setFormData((previous) => ({
            ...previous,
            [name]: name === "rating" ? parseInt(value) : value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* nuber input that is only 1 to 5 and doesnt allow other numbers*/}
            <FormTextInput label="Rating (1-5)" value={formData.rating} onChange={handleChange}
                placeholder="3" type="number" name="rating" id="rating" />

            <FormTextInput label="Comment" value={formData.comment} onChange={handleChange}
                placeholder="Muy confiable" type="text" name="comment" id="comment"/>

            <div>
                <button
                    type="submit" className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-start w-full">
          Listo
                </button>
            </div>
        </form>
    );
};

export default ReviewCreate;