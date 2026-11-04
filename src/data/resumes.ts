import type { Perspective } from "@/types/perspective";

export type ResumeData = {
  perspective: Perspective;
  title: string;
  summary: string;
  highlights: string[];
  file: string;
};

export const engineeringResume: ResumeData = {
  perspective: "engineering",
  title: "Software Engineering Resume",
  summary:
    "Software engineering experience focused on full-stack development, REST APIs, application architecture, testing, and secure software development.",
  highlights: [
    "Java, Spring Boot, Groovy, Python, and Flask",
    "React, Next.js, TypeScript, and Tailwind CSS",
    "REST API design and backend application development",
    "PostgreSQL, MySQL, SQLite, and Prisma",
    "JUnit testing, CI/CD, Git, and Agile workflows",
    "Full-stack and security-focused portfolio projects",
  ],
  file: "/resumes/Edward_Ricks_Software_Engineering_Resume.pdf",
};

export const securityResume: ResumeData = {
  perspective: "security",
  title: "IT & Cybersecurity Resume",
  summary:
    "IT and cybersecurity-focused experience covering technical support, systems, networking, troubleshooting, security fundamentals, and secure application analysis.",
  highlights: [
    "Technical troubleshooting and user support",
    "Windows, Active Directory, and systems administration labs",
    "Networking fundamentals and Wireshark analysis",
    "OWASP application security and vulnerability remediation",
    "Authentication, authorization, and session security",
    "Cybersecurity degree coursework and hands-on security projects",
  ],
  file: "/resumes/Edward_Ricks_IT_Cybersecurity_Resume.pdf",
};

export const resumes: ResumeData[] = [
  engineeringResume,
  securityResume,
];