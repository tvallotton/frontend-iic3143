interface Review {
  rating: number;
  comment: string;
  publicationId?: string;
  reviewedUserId?: string;
};

interface ShowReviewProps {
  reviews: Review[];
};

const ShowReviews = ({ reviews }: ShowReviewProps) => {
    return (
        <div className='w-full max-w-6xl p-6'>
            <h2 className='text-2xl font-medium text-gray-800 mb-4'>Reseñas recibidas</h2>
            <ul className='list-disc pl-5'>
                {reviews.map((review, index) => (
                    <li key={index} className='mb-1'>
                        <span>{review.rating} estrellas</span> -{" "}
                        <span className='font-semibold'>{review.comment}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowReviews;
