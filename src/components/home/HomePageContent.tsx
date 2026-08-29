"use client"

import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import ProjectCard, { vulnerableSupportTicketProject } from "../projects/ProjectCard";


type Perspective = "neutral" | "engineering" | "security";

const HomePageContent = () => {
    const [perspective, setPerspective] = useState<Perspective>("neutral");


    useEffect(() => {
        const savedPerspective = localStorage.getItem("portfolio-perspective");

        if (
            savedPerspective === "engineering" ||
            savedPerspective === "security"
        ) {
            setPerspective(savedPerspective);
        }
        
    }, []);

    const handlePerspectiveChange = (newPerspective: Perspective) => {
        setPerspective(newPerspective);

        if (newPerspective === "neutral") {
            localStorage.removeItem("portfolio-perspective");
        } else {
            localStorage.setItem("portfolio-perspective", newPerspective);
        }
    };

    return (
        <section className="flex-1 flex flex-col justify-center-safe items-center pb-12">

            <h1 className="text-2xl">Engineering | Architecture | Security</h1>

            {perspective === "neutral" && (
                <div className="space-y-8">

                    <h2 className="pt-4 text-center">Choose a path</h2>

                    <div className="flex gap-x-12 text-lg">
                        <button
                            className="text-2xl font-semibold cursor-pointer hover:underline focus-visible:outline-2 text-blue-600" 
                            onClick={() => handlePerspectiveChange("engineering")}>
                            Engineering
                        </button>

                        <button
                            className="text-2xl font-semibold cursor-pointer hover:underline focus-visible:outline-2 text-red-600" 
                            onClick={() =>handlePerspectiveChange("security")}>
                            Security
                        </button>
                    </div>
                </div>
            )}

            {perspective !== "neutral" && (
                <>
                    <HeroSection perspective={perspective} />
                    <ProjectCard
                        title={vulnerableSupportTicketProject.title}
                        summary={vulnerableSupportTicketProject.summary[perspective]}
                        technologies={vulnerableSupportTicketProject.technologies}
                        status={vulnerableSupportTicketProject.status}
                    />
                    <button onClick={() => handlePerspectiveChange("neutral")}>Choose another path</button>
                </>
            )}
        </section>
    );
};

export default HomePageContent;