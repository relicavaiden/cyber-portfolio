import type { Perspective } from "@/types/perspective";

export type ProjectStatus =
  | "available"
  | "disabled"
  | "in-progress"
  | "coming-soon";

export type Project = {
  title: string;
  summary: Partial<Record<Perspective, string>>;
  technologies: Partial<Record<Perspective, string[]>>;
  status: ProjectStatus;
};

export const vulnerableSupportTicketProject = {
    title: "Support Ticket",
    summary: {
        engineering: "Engineering focus: full-stack architecture, API design, React/TypeScript frontend, Flask backend, SQLite, testing.",
        security: "Security focus: intentionally vulnerable baseline, OWASP analysis, authentication / authorization weaknesses, remediation, and verification.",
    },
    technologies: {
        engineering: ["Next.js", "Flask", "Tailwind CSS", "SQLite"],
        security: ["OWASP", "Authentication", "Authorization", "Session Security", "Security Testing"],
    },
    status: "available" as const
};

export const portfolioProject = {
    title: "Developer Portfolio",
    summary: {
        engineering:
            "Full-stack portfolio and technical writing platform with authenticated authoring, post lifecycle management, series, tags, relationships, and media support.",
    },
    technologies: {
        engineering: [
            "Next.js",
            "TypeScript",
            "React",
            "Tailwind CSS",
            "Node.js",
            "Express",
            "PostgreSQL",
            "Prisma"
        ]
    },
    status: "available" as const
};

export const jobConnectorProject = {
    title: "Job Search Connector",
    summary: {
        engineering:
            "Planned open-source connector for retrieving external job listings and normalizing them into a consistent application-facing data model for filtering and consumption.",
    },
    technologies: {
        engineering: [
            "TypeScript",
            "Node.js",
            "REST APIs"
        ]
    },
    status: "coming-soon" as const
};