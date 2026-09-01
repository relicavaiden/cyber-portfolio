import type { ProjectStatus } from "@/data/projects";

const statusLabels = {
    available: "Available",
    disabled: "Disabled",
    "in-progress": "In Progress",
    "coming-soon": "Coming Soon",
};

export type ProjectCardProps = {
    title: string;
    summary: string;
    technologies: string[];
    status: ProjectStatus;
}

const ProjectCard = (
    {
        title,
        technologies,
        status,
        summary,
    } : ProjectCardProps
) => {
    return (
        <article className="max-w-md flex flex-col gap-1">
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="">{statusLabels[status]}</p>
            </div>
            <p>{summary}</p>

            <ul className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                    <li key={technology}
                     className="text-sm rounded-xl px-1 bg-slate-500 text-black">
                        {technology}
                    </li>
                ))}
            </ul>
        </article>
    )
}

export default ProjectCard