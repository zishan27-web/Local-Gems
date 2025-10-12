'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";


export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            toast.success(data.message || 'Registeration successful!');
            router.push('/api/auth/signin');
        } else {
            toast.error(data.error || 'Registration failed!');
        }
        setIsLoading(false);
    };

    const togglePasswordVisibility = ()=>{
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-[75vh] flex justify-center items-center flex-col m-5 text-white">
            <h1 className="sm:text-3xl text-2xl font-bold text-center mb-4 text-white">Create an Account</h1>
            <form onSubmit={handleSubmit} className="sm:w-sm w-full border-black shadow-2xl rounded-xl p-8 bg-slate-950 hover:scale-105 translate duration-600 ease-in-out">
                <div className="mb-4">
                    <label htmlFor="username" className="block font-medium mb-2">Username: </label>
                    <input
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full border rounded p-2 mb-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-2">Email: </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border rounded p-2 mb-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-medium">Password: </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border rounded p-2 w-full mb-2"
                    />
                    <img onClick={togglePasswordVisibility} className="w-4 h-4 relative bottom-9 sm:left-73 -right-11/12 invert" src={showPassword ? '/view.png' : '/hide.png'} alt="" />
                </div>
                <button type="submit" disabled={isLoading} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center w-full hover:cursor-pointer">
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                <div className="text-sm mt-2 text-center">
                    Already registerd?
                    <a className="text-blue-500 font-bold" href="/login"> Go to LogIn</a>
                </div>
            </form>
        </div>
    )
}
