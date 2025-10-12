'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";


export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
            // callbackUrl: '/gems'
        });

        setIsLoading(false);

        if (result.error) {
            toast.error(result.error || 'Invalid credentials');
        }else{
            // toast.success('Logged in successfully!');
            router.push('/gems?login=success');
        }
    };

    const togglePasswordVisibility = ()=>{
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-[80vh] flex justify-center items-center flex-col m-5 p-4 text-white">
            <h1 className="text-3xl font-bold text-center mb-4 text-white">Log In</h1>
            <form onSubmit={handleSubmit} className="sm:w-sm w-full border-black shadow-2xl rounded-xl p-8 bg-slate-950 hover:scale-105 translate duration-600 ease-in-out">
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-2">Email: </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border rounded p-2 mb-2 bg-slate-950"
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
                    <img onClick={togglePasswordVisibility} className="w-4 h-4 relative bottom-9 left-73 hover:cursor-pointer invert" src={showPassword ? '/view.png' : '/hide.png'} alt="" />
                </div>
                <button type="submit" disabled={isLoading} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center w-full">
                    {isLoading ? 'Logging...' : 'Log In'}
                </button>
            </form>
        </div>
    )
}
