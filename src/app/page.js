// src/app/page.js
'use client'

import { useRouter } from "next/navigation";
import Collage from "./assests/collage.png"

export default function Home() {
    const imageUrl = '/collage.png'; 
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/gems');
    };

    return (
        <>
            <div className="relative bg-cover h-screen bg-[url('./assests/collage.png')]" >

            {/* <div className="fixed inset-0 -z-10 bg-black/70"></div> */}

            <main className="min-h-screen flex flex-col justify-center items-center text-center text-white p-4">

                <div className="flex justify-center items-center gap-4 mb-4">
                    <img className="w-12 h-12 invert" src="/gems.png" alt="Local Gems logo" />
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        Local Gems
                    </h1>
                </div>

                <p className="max-w-3xl text-lg md:text-xl text-zinc-300 mb-8 font-medium">
                    Explore the authentic heart of your city, recommended by locals like you.
                </p>

                <button
                    type="button"
                    onClick={handleGetStarted}
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-8 py-3 text-center"
                >
                    Get Started
                </button>
            </main>
            </div>
        </>
    );
}