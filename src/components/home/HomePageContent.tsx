"use client"

import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";

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
        <>
            {perspective === "neutral" && (
                <>
                    <h2>Choose a path</h2>
                    <button onClick={() => handlePerspectiveChange("engineering")}>
                        Engineering
                    </button>

                    <button onClick={() =>handlePerspectiveChange("security")}>
                        Security
                    </button>
                </>
            )}

            {perspective !== "neutral" && (
                <>
                    <HeroSection perspective={perspective} />
                    <button onClick={() => handlePerspectiveChange("neutral")}>Choose another path</button>
                </>
            )}
        </>
    );
};

export default HomePageContent;