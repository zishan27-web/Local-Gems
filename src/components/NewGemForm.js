'use client'

import { useState } from "react";

export default function NewGemForm({ onAddGem }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        // console.log({ name,description });
        // onAddGem({ name, description, image, location });
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }
        formData.append('location', location);

        await onAddGem(formData);

        setName('');
        setDescription('');
        setImage('null');
        setLocation('');
        e.target.reset();
        setIsLoading(false);

    }

    return (
        <div>
            {isLoading ?
                (
                    <p className="text-lg font-bold text-center text-gray-500">Submitting gem...</p>
                ) : (<form onSubmit={handleSubmit} className="border-black border-2 rounded-lg p-4 text-white w-3/4 mx-auto shadow-2xl mt-20">
                    <h2 className="text-2xl font-bold mb-4 text-white">Submit a new Gem</h2>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium" htmlFor="name">Gem Name: </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 rounded border"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="font-medium block mb-2" htmlFor="description">Description: </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full p-2 rounded border"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="font-medium block mb-2" htmlFor="image">Image: </label>
                        <div className="flex items-center gap-4 border rounded w-full p-2">
                            <label htmlFor="image" className="bg-blue-500 rounded-2xl p-1 px-2 hover:cursor-pointer hover:bg-blue-600 transition-colors duration-300">
                                Choose File
                            </label>
                        <input
                            type="file"
                            id="image"
                            // value={image} // The brower does not allow the programmer to set the value we can only read it in React it mena the file input musst be  "uncontrolled component."
                            // The error message is coming directly from the browser. If a website's code could set the path of a file input (e.g., value="C:\Users\MyPC\secrets.txt"), a malicious site could try to trick you into uploading sensitive files from your computer without your knowledge.
                            onChange={(e) => setImage(e.target.files[0])}
                            accept="image/*"
                            className="hidden"
                            required
                        />
                        {image && (<span>{image.name}</span>)}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="font-medium block mb-2" htmlFor="location">Location / Address: </label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="w-full p-2 rounded border"
                        />
                    </div>
                    <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-4 py-2 text-center hover:cursor-pointer" type="submit">
                    {
                        isLoading ? "Adding..." : "Add Gem"
                    }
                    </button>
                </form>
                )}
        </div>
    );
}