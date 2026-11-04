import BlogPostHeader from "@/components/blog/BlogPostHeader";
import type { BlogPostDetail } from "@/types/blog-post";
import { notFound } from "next/navigation";


type BlogPostPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function BlogPostPage({
    params,
}: BlogPostPageProps) {
    const { slug } = await params;

    const response = await fetch(
        `http://localhost:4000/api/posts/${slug}`
    );

    if (response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error("Failed to load post");
    }

    const post: BlogPostDetail = await response.json();

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <BlogPostHeader post={post}/>

            {post.coverImage && (
                <img
                    src={post.coverImage.url}
                    alt={post.coverImage.altText ?? ""}
                    className="mt-8 w-full rounded-lg object-cover"
                />
            )}

            {post.body && (
                <article className="mt-10 whitespace-pre-wrap text-base leading-8">
                    {post.body}
                </article>
            )}
        </main>
    );
}