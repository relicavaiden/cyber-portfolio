import type { BlogPostSummary } from "@/types/blog-post";
import Link from "next/link";

type BlogPostCardProps = {
    post: BlogPostSummary;
};

export default function BlogPostCard({
    post,
}: BlogPostCardProps) {
    return (
        <article>
            <h2>
                <Link href={`/blog/${post.slug}`}>
                    {post.title}
                </Link>
            </h2>

            {post.excerpt && (
                <p>{post.excerpt}</p>
            )}

            {post.publishedAt && (
                <time>
                    {new Date(post.publishedAt).toLocaleDateString()}
                </time>
            )}

            {post.series && (
                <p>
                    {post.series.title}
                </p>
            )}

            {post.tags.map((tag) => {
                return (
                    <span key={tag.slug}>
                        {tag.name}
                    </span>
                );
            })}
        </article>
    )
}