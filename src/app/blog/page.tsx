import BlogPostCard from "@/components/blog/BlogPostCard";
import { BlogPostSummary } from "@/types/blog-post";

export default async function BlogPage() {
    const response = await fetch("http://localhost:4000/api/posts");

    const posts: BlogPostSummary[] = await response.json();

    if (!response.ok) {
        throw new Error("Faileed to load published posts");
    }

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
            <header className="space-y-3">
                <h1 className="text-4xl font-semibold">
                    Writing
                </h1>

                <p className="max-w-2xl text-sm opacity-75">
                    Notes on software engineering, security, architecture, and the systems I build along the way.
                </p>

                <section>
                    {posts.length === 0
                        ? <p>No published writing yet.</p>
                        : posts.map((post) => (
                            <BlogPostCard
                                key={post.id}
                                post={post}
                            />
                        ))
                    }
                </section>
            </header>
        </main>
    )
}