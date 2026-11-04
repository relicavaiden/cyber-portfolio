"use client"

import { usePerspective } from "@/context/PerspectiveContext";
import ProjectCard from "@/components/projects/ProjectCard";
import { vulnerableSupportTicketProject, portfolioProject, jobConnectorProject, Project } from "@/data/projects";

const projects: Project[] = [
  vulnerableSupportTicketProject,
  portfolioProject,
  jobConnectorProject,
];

export const ProjectsContent = () => {
    const { perspective, changePerspective } = usePerspective();

    return (
        <div 
            className={`flex w-full flex-col gap-1  ${
                perspective === null
                    ? "min-h-[70vh] items-center justify-center"
                    : ""
                }`}
        >
            <div className="w-full p-2">
                    <div className="flex w-full justify-center  gap-x-12 text-lg">
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
                    {projects.map((project) => {
                    const summary = project.summary[perspective];
                    const technologies = project.technologies[perspective];

                    if (!summary || !technologies) {
                        return null;
                    }

                    return (
                        <ProjectCard
                        key={project.title}
                        title={project.title}
                        summary={summary}
                        status={project.status}
                        technologies={technologies}
                        />
                    );
                    })}
                </section> 
                )}
        </div>
    )

}