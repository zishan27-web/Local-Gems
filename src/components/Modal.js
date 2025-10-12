// src/components/Modal.js
'use client';


export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        // The dark background overlay
        <div
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-sm bg-opacity-70 z-50 flex justify-center items-center p-2"
        >
            {/* The modal content box */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 p-5 rounded-lg shadow-2xl relative max-w-md w-full max-h-11/12 overflow-auto"
            >
                {/* The close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-red-500 hover:text-red-900 text-3xl font-bold"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}