import type { AuthorPost } from "@/types/author-post";
import AuthorPostCard from "./AuthorPostCard";

type AuthorPostListProps = {
    posts: AuthorPost[];
    onPostUpdated: (updatedPost: AuthorPost) => void;
};

export default function AuthorPostList({
    posts,
    onPostUpdated,
}: AuthorPostListProps) {
    return (
        <div>
            {posts.map((post) => (
                <AuthorPostCard
                    key={post.id}
                    post={post}
                    onPostUpdated={onPostUpdated}
                />
            ))}
        </div>
    )
}