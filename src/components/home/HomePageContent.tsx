"use client"

import { useState } from "react";

type Perspective = "neutral" | "engineering" | "security";

const HomePageContent = () => {
    const [perspective, setPerspective] = useState<Perspective>("neutral");

    return (
        <>
            {perspective === "neutral" && (
                <>
                    <h2>Choose a path</h2>
                    <button onClick={() => setPerspective("engineering")}>
                        Engineering
                    </button>

                    <button onClick={() =>setPerspective("security")}>
                        Security
                    </button>
                </>
            )}

            {perspective === "engineering" && (
                <>
                    <h2>Engineering</h2>
                    <p>Engineering intro</p>
                    <button onClick={() => setPerspective("neutral")}>
                        Choose another path
                    </button>
                </>
            )}
            

            {perspective === "security" && (
                <>
                    <h2>Security</h2>
                    <p>Security intro</p>
                    <button onClick={() => setPerspective("neutral")}>
                        Choose another path
                    </button>
                </>
            )}

        </>
    );
};

export default HomePageContent;