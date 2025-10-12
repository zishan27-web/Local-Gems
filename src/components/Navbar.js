'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";

export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <nav className="p-4 bg-black">
            <div className="mx-auto flex justify-between items-center">
                <Link href='/' className="font-bold text-white sm:text-3xl text-2xl flex justify-center
                items-center gap-2">
                    <img className="w-5 h-5 invert" src="/gems.png" alt="" />Local Gems
                </Link>
                <div>
                    {
                        status === 'loading' ? (
                            <p>Loading...</p>
                        ) : session ? (
                            <div className="flex justify-center items-center gap-3">
                                <div className="flex items-center gap-1 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2.5 py-1 text-center hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
                                    <img className="w-6 h-6" src="/user.png" alt="" />
                                    <p className="rounded-4xl text-black">
                                        {session.user.username}
                                    </p>
                                </div>
                                <button onClick={() => signOut()} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center gap-3">
                                <Link href='/register' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
                                    Sign Up
                                </Link>

                                <button onClick={() => signIn()} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
                                    Log In
                                </button>

                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}
