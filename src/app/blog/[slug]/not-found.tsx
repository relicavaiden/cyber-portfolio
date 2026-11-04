import Link from "next/link";

export default function NotFound() {
    return (
        <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
            <h1 className="text-3xl font-semibold">
                Post not found
            </h1>

            <p className="opacity-75">
                This post does not exist or is not currently published.
            </p>

            <Link href="/blog">
                Back to writing
            </Link>
        </main>
    );
}