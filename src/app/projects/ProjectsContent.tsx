"use client"

import { usePerspective } from "@/context/PerspectiveContext";
import ProjectCard from "@/components/projects/ProjectCard";
import { vulnerableSupportTicketProject } from "@/data/projects";


export const ProjectsContent = () => {
    const { perspective, changePerspective } = usePerspective();

    return (
        <div className="flex flex-col gap-1">
            <div className="space-y-8 p-2">
                    <div className="flex gap-x-12 text-lg justify-center">
                    <button
                        className={`text-2xl cursor-pointer focus-visible:outline-2 text-blue-600 ${
                            perspective === "engineering" 
                            ? "font-semibold underline"
                            : "hover:underline"
                        }`} 
                        onClick={() => changePerspective("engineering")}>
                        Engineering
                    </button>

                    <button
                        className={`text-2xl cursor-pointer focus-visible:outline-2 text-red-600 ${
                            perspective === "security" 
                            ? "font-semibold underline"
                            : "hover:underline"
                        }`} 
                        onClick={() =>changePerspective("security")}>
                        Cybersecurity
                    </button>
                </div>
            </div>

            {perspective !== null && (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProjectCard
                        title={vulnerableSupportTicketProject.title}
                        summary={vulnerableSupportTicketProject.summary[perspective]}
                        status={vulnerableSupportTicketProject.status}
                        technologies={vulnerableSupportTicketProject.technologies[perspective]}
                    />
                </section> 
                )}
        </div>
    )

}