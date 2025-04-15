import { useState } from 'react';

type ModalMode = 'edit' | 'delete';

export function useModal<T>() {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<ModalMode>('edit');
    const [item, setItem] = useState<T | null>(null);

    const openModal = (data: T, mode: ModalMode) => {
        setItem(data);
        setMode(mode);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setItem(null);
    };

    return {
        isOpen,
        item,
        mode,
        openModal,
        closeModal,
    };
}
