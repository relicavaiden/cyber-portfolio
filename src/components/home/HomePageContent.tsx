"use client"

import HeroSection from "./HeroSection";
import { usePerspective } from "@/context/PerspectiveContext";


const HomePageContent = () => {

    const { perspective, changePerspective } = usePerspective();
    

    return (
        <section className="flex-1 flex flex-col justify-center-safe items-center pb-12">

            <h1 className="text-2xl">Engineering | Architecture | Security</h1>

            {perspective === null && (
                <div className="space-y-8">

                    <h2 className="pt-4 text-center">Choose a path</h2>

                    <div className="flex gap-x-12 text-lg">
                        <button
                            className="text-2xl font-semibold cursor-pointer hover:underline focus-visible:outline-2 text-blue-600" 
                            onClick={() => changePerspective("engineering")}>
                            Engineering
                        </button>

                        <button
                            className="text-2xl font-semibold cursor-pointer hover:underline focus-visible:outline-2 text-red-600" 
                            onClick={() =>changePerspective("security")}>
                            Cybersecurity
                        </button>
                    </div>
                </div>
            )}

            {perspective !== null && (
                <>
                    <HeroSection perspective={perspective} />
                    <button onClick={() => changePerspective(null)}>Choose another path</button>
                </>
            )}
        </section>
    );
};

export default HomePageContent;