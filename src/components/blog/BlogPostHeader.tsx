import type { BlogPostDetail } from "@/types/blog-post";

type BlogPostHeaderProps = {
    post: BlogPostDetail;
};

export default function BlogPostHeader({
    post,
}: BlogPostHeaderProps) {
    return (
        <header className="space-y-4 border-b pb-8">
            <h1 className="text-4xl font-semibold tracking-tight">
                {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm opacity-70">
                {post.publishedAt && (
                    <time>
                        {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                )}

                {post.series && (
                    <p>{post.series.title}</p>
                )}
            </div>
            
            {post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag.slug}
                            className="rounded-full border px-3 py-1 text-sm"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            )}
        </header>
    )
}