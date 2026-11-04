"use client";

type BlogPostErrorProps = {
    error: Error;
    reset: () => void;
};

export default function BlogPostError({
    error,
    reset,
}: BlogPostErrorProps) {
    return (
        <main>
            <p>Something went wrong loading this post.</p>
            <br />
            <button type="button" onClick={reset}>
                Try again
            </button>
            <link href="/blog" className="rounded border px-4 py-2">
                Back to writing
            </link>
        </main>
    )
}