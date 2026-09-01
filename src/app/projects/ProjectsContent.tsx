"use client"

import { usePerspective } from "@/context/PerspectiveContext";
import ProjectCard from "@/components/projects/ProjectCard";
import { vulnerableSupportTicketProject } from "@/data/projects";


export const ProjectsContent = () => {
    const { perspective, changePerspective } = usePerspective();

    return (
        <div className="flex flex-col gap-1">
        <h2>Engineering | Cybersecurity</h2>

            {perspective !== null && (
                <>
                    <ProjectCard
                        title={vulnerableSupportTicketProject.title}
                        summary={vulnerableSupportTicketProject.summary[perspective]}
                        status={vulnerableSupportTicketProject.status}
                        technologies={vulnerableSupportTicketProject.technologies}
                    />
                </>        
                )}
                <div className="space-y-8">
                        <h2 className="pt-4 text-center">View as</h2>

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
            </div>
    )

}