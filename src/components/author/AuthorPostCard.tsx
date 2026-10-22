import type { AuthorPost, UpdatePostInput } from "@/types/author-post";
import { useState } from "react";

type AuthorPostCardProps = {
    post: AuthorPost;
    onPostUpdated: (updatePost: AuthorPost) => void;
};

export default function AuthorPostCard({
    post,
    onPostUpdated,
}: AuthorPostCardProps) {
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [excerpt, setExcerpt] = useState(post.excerpt ?? "");
    const [body, setBody] = useState(post.body ?? "");
    const [successMessage, setSuccessMessage] = useState("");

    const savePost = async (): Promise<AuthorPost | undefined> => {
        setError("");
        setSuccessMessage("");

        const updateData: UpdatePostInput = {
            title,
            excerpt,
            body,
        };

        const response = await fetch(
            `http://localhost:4000/api/posts/${post.slug}`,
            {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            }
        );
        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error);
            return;
        }

        const updatedPost: AuthorPost = await response.json();

        return updatedPost;
    };

    const publishPost = async (): Promise<AuthorPost | undefined> => {
        setError("");
        setSuccessMessage("");

        const response = await fetch(
            `http://localhost:4000/api/posts/${post.slug}/publish`,
            {
                method: "PATCH",
                credentials: "include"
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error);
            return;
        }

        const publishedPost: AuthorPost = await response.json();

        return publishedPost
    }

    const handleArchive = async () => {
        setError("");
        setSuccessMessage("");

        const response = await fetch(
            `http://localhost:4000/api/posts/${post.slug}/archive`,
            {
                method: "PATCH",
                credentials: "include",
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error);
            return;
        }

        const updatedPost: AuthorPost = await response.json();

        onPostUpdated(updatedPost);
        setSuccessMessage("Post archived");
    };

    const handleSaveDraft = async () => {
        const updatedPost = await savePost();

            if (!updatedPost) {
                return;
            }

            onPostUpdated(updatedPost)
            setSuccessMessage("Draft saved");
            setIsEditing(false);
        };

    const handleSaveAndPublish = async () => {
        const savedPost = await savePost();

        if (!savedPost) {
            return;
        }

        const publishedPost = await publishPost();

        if (!publishedPost) {
            onPostUpdated(savedPost);
            return;
        }

        onPostUpdated(publishedPost);
    }
    return (
        
        <div className="rounded-lg border p-5 shadow-sm">
            <h2 className="font-semibold text-xl">{post.title}</h2>
            <p className="mt-1 text-sm text-gray-500"
            >
                {post.status}
            </p>
            {post.status === "DRAFT" && (
                <div className="mt-4 flex flex-wrap gap-2">
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="rounded-md border px-3 py-2 text-sm font-medium"
                        >
                            Edit
                        </button>
                    
                    {isEditing && (
                        <div className="mt-4 flex w-full flex-col gap-4">
                            <input
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />

                            <textarea
                                value={excerpt}
                                onChange={(event) => setExcerpt(event.target.value)}
                                className="min-h-24 w-full rounded-md border px-3 py-2"
                            />

                            <textarea
                                value={body}
                                onChange={(event) => setBody(event.target.value)}
                                className="min-h-64 w-full rounded-md border px-3 py-2"
                            />

                            <button 
                                type="button" 
                                onClick={handleSaveDraft}
                                className="rounded-md border px-3 py-2 text-sm font-medium"
                            >
                                Save Draft
                            </button>

                            <button 
                                type="button" 
                                onClick={handleSaveAndPublish}
                                className="rounded-md border px-3 py-2 text-sm font-medium"
                                >
                                Save & Publish
                            </button>

                        </div>
                    )}
                    {error && (
                        <p className="w-full text-sm text-red-600">{error}</p>
                    )}
                    {successMessage && (
                        <p className="w-full text-sm text-green-600">{successMessage}</p>
                    )}
                </div>
            )}
            {post.status === "PUBLISHED" && (
                <div>
                    <button 
                        type="button" 
                        onClick={handleArchive}
                        className="rounded-md border mt-4 px-3 py-2 text-sm font-medium hover:bg-gray-100"
                        >
                            Archive
                        </button>
                </div>
            )}
            
        </div>
    );
}