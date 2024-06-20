import { useState, FC, Dispatch, SetStateAction, useEffect } from "react";
import ButtonComponent from "../../common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Interaction } from "../types";
import ReviewCreate from "../../review/reviewCreate";

interface ClosePublicationModalProps {
  showCloseModal: boolean;
  setShowCloseModal: Dispatch<SetStateAction<boolean>>;
  publicationId: string | undefined;
}

const ClosePublicationModal: FC<ClosePublicationModalProps> = ({ showCloseModal, setShowCloseModal, publicationId }) => {
    const [selectedInteraction, setSelectedInteraction] = useState("");
    const [interactions, setInteractions] = useState([] as Interaction[]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInteractions = async () => {
            try {
                const response = await axios.get(`/publications/${publicationId}/interactions`);
                if (response.status === 200) {
                    setInteractions(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchInteractions();
    }, []);

    const handleClosePublication = () => {
        if (interactions.length > 0 && !selectedInteraction) {
            alert("Por favor, selecciona la interacción completada.");
            return;
        }
        if (selectedInteraction !== "closeOnly") {
            axios.patch(`/publications/interactions/${selectedInteraction}`);
        }
        axios.put(`/publications/${publicationId}`, { status: "Cerrada" });
        setShowCloseModal(false);
        navigate("/");
    };

    return (
        <>
            {showCloseModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-8 rounded-lg'>
                        <h2 className='text-2xl font-bold text-center'>¿Estás seguro de cerrar la publicación?</h2>
                        {interactions.length > 0 && (
                            <div>
                                <label htmlFor="interactionSelect">Selecciona la interacción completada:</label>
                                <select
                                    id="interactionSelect"
                                    value={selectedInteraction}
                                    onChange={(e) => setSelectedInteraction(e.target.value)}
                                    className="block w-full mt-2"
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="closeOnly">Cerrar sin interacción</option>
                                    {interactions.map((interaction) => (
                                        <option key={interaction.id} value={interaction.id}>
                                            {interaction.user.name}
                                        </option>
                                    ))}
                                </select>
                                <ReviewCreate publicationId={publicationId} reviewedUserId={selectedInteraction} />
                            </div>
                        )}
                        <div className='flex justify-center mt-4'>
                            <ButtonComponent
                                text='Cancelar'
                                onClick={() => setShowCloseModal(false)}
                                color='bg-red-500'
                                hoverColor='bg-red-800'
                            />
                            <ButtonComponent
                                text='Cerrar publicación'
                                onClick={handleClosePublication}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ClosePublicationModal;