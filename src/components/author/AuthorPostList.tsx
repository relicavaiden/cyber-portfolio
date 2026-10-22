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

    if (posts.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-500">
        No posts in this section.
      </p>
    );
  }
    
    return (
        <div className="flex flex-col gap-4">
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