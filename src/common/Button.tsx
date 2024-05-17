// ButtonComponent.tsx
import React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button
            className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-start w-full" 
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ButtonComponent;