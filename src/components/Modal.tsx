import { ReactNode } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[600px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}
