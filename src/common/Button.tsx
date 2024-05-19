// ButtonComponent.tsx
import React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
    color?: string;
    hoverColor?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({ text, onClick, color = "bg-main-blue", hoverColor="bg-blue-700" }) => {
    return (
        <button
            className={`${color} m-1 hover:${hoverColor} text-white font-bold py-2 px-4 rounded self-start w-full`} 
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ButtonComponent;