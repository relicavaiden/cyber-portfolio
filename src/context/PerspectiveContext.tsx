"use client"

import { useState, useEffect, useContext, createContext } from "react"
import type { ReactNode } from "react"
import type { Perspective } from "@/types/perspective"

type PerspectiveContextValue = {
    perspective: Perspective | null
    changePerspective: (value: Perspective | null) => void
}

const PerspectiveContext = createContext<PerspectiveContextValue | undefined>(undefined);

type PerspectiveProviderProps = {
    children: ReactNode;
};

export const PerspectiveProvider = ({
    children,
}: PerspectiveProviderProps) => {
    const [perspective, setPerspective] = useState<Perspective | null>(null);

    useEffect(() => {
            const savedPerspective = localStorage.getItem("portfolio-perspective");
    
            if (
                savedPerspective === "engineering" ||
                savedPerspective === "security"
            ) {
                setPerspective(savedPerspective);
            }
            
        }, []);

        const changePerspective = (newPerspective: Perspective | null) => {
            setPerspective(newPerspective);
    
            if (newPerspective === null) {
                localStorage.removeItem("portfolio-perspective");
            } else {
                localStorage.setItem("portfolio-perspective", newPerspective);
            }
        };


        return (
            <PerspectiveContext.Provider
                value={{
                    perspective,
                    changePerspective,
                }}
            >
                { children }
            </PerspectiveContext.Provider>
        )
}

export const usePerspective = () => {
    const context = useContext(PerspectiveContext);
        if (context === undefined) {
            throw new Error("usePerspective must be within a PerspectiveProvider");
        }
        
    return context;
}