"use client";

import { usePerspective } from "@/context/PerspectiveContext";
import {
  engineeringResume,
  securityResume,
} from "@/data/resumes";

export default function ResumePage() {
  const { perspective, changePerspective } = usePerspective();

  const orderedResumes =
    perspective === "security"
      ? [securityResume, engineeringResume]
      : [engineeringResume, securityResume];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <div className="flex w-full justify-center gap-12">
        <button
          type="button"
          onClick={() => changePerspective("engineering")}
          className={`text-xl text-blue-600 ${
            perspective === "engineering"
              ? "font-semibold underline"
              : ""
          }`}
        >
          Engineering
        </button>

        <button
          type="button"
          onClick={() => changePerspective("security")}
          className={`text-xl text-red-600 ${
            perspective === "security"
              ? "font-semibold underline"
              : ""
          }`}
        >
          Cybersecurity
        </button>
      </div>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {orderedResumes.map((resume) => (
          <article
            key={resume.perspective}
            className="flex h-full flex-col gap-4 rounded-md border border-dashed p-5"
          >
            <div>
              <h2 className="text-xl font-semibold">
                {resume.title}
              </h2>

              <p className="mt-2 text-pretty">
                {resume.summary}
              </p>
            </div>

            <ul className="flex flex-col gap-2">
              {resume.highlights.map((highlight) => (
                <li key={highlight} className="text-sm">
                  • {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex gap-3">
              <a
                href={resume.file}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border px-3 py-2 text-sm font-medium"
            >
                View Resume
            </a>

            <a
                href={resume.file}
                download
                className="rounded-md border px-3 py-2 text-sm font-medium"
            >
                Download PDF
            </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}