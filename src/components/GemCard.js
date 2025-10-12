import Image from "next/image";

export default function GemCard({ onDelete, _id, name, description, submittedBy, imageUrl, deletingId, session, onClick }) {
    const isDeleting = deletingId === _id;
    const isOwner = session && session.user.username === submittedBy;
    return (
         <div 
            onClick={onClick} // The onClick for the modal is now on the main container
            disabled={isDeleting}
            className="relative border-gray-700 border-1 rounded-lg bg-slate-900 text-white p-4 shadow-lg m-10 hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out hover:shadow-lg hover:bg-slate-950 group flex flex-col justify-between"
        >
            {/* These are now direct children of the flex container */}
            <h2 className="text-2xl font-bold mb-2 group-hover:blur-[1px]">{name}</h2>
            
            {imageUrl ? (
                <div className="flex-grow flex items-center justify-center my-4 group-hover:blur-[1px]">
                    <Image className="mx-auto rounded-md object-contain max-h-40" width={150} height={150} src={imageUrl} alt={`Image for ${name}`}></Image>
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center my-4 group-hover:blur-[1px]">
                    <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center">
                        {/* Placeholder icon or text */}
                    </div>
                </div>
            )}
            
            <p className="text-gray-400 mb-2 w-full p-2 rounded text-ellipsis whitespace-nowrap overflow-hidden border group-hover:blur-[1px]">
                {description}
            </p>
            
            <p className="text-sm text-gray-500 italic group-hover:blur-[1px]">Submitted By: {submittedBy}</p>

            {/* The icons are positioned absolutely and are not affected by flexbox */}
            <img 
                onClick={(e) => { e.stopPropagation(); onClick(); }} // Make icon clickable and stop propagation
                className="w-6 h-6 invert absolute hidden group-hover:block top-2 right-2 blur-none hover:scale-120 transition duration-300 ease-in-out" 
                src="/view-modal.png" 
                alt="View Gem" 
            />
            
            {isOwner && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(_id); }} // Stop propagation here too
                    className="absolute hidden group-hover:block top-2 right-10 text-slate-400 hover:text-slate-600 font-bold hover:cursor-pointer" 
                    disabled={isDeleting}
                >
                    {isDeleting ? ( '...' ) : (
                        <img className="w-6 h-6 hover:scale-120 transition duration-300 ease-in-out" src="/delete.png" alt="Delete"/>
                    )}
                </button>
            )}
        </div>
    );
}