export type ProjectStatus = 
    | "available"
    | "disabled"
    | "in-progress"
    | "coming-soon";

export const vulnerableSupportTicketProject = {
    title: "Support Ticket",
    summary: {
        engineering: "Engineering focus: full-stack architecture, API design, React/TypeScript frontend, Flask backend, SQLite, testing.",
        security: "Security focus: intentionally vulnerable baseline, OWASP analysis, authentication/authorization weaknesses, remediation, verification."
    },
    technologies: ["Next.js", "Flask", "Tailwind CSS", "SQLite"],
    status: "in-progress" as const
};