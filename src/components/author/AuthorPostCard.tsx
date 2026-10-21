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
        <div>
            <h2>{post.title}</h2>
            <p>{post.status}</p>
            {post.status === "DRAFT" && (
                <div>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    
                    {isEditing && (
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />

                            <textarea
                                value={excerpt}
                                onChange={(event) => setExcerpt(event.target.value)}
                            />

                            <textarea
                                value={body}
                                onChange={(event) => setBody(event.target.value)}
                            />

                            <button type="button" onClick={handleSaveDraft}>
                                Save Draft
                            </button>

                            <button type="button" onClick={handleSaveAndPublish}>
                                Save & Publish
                            </button>

                        </div>
                    )}
                    {error && <p>{error}</p>}
                    {successMessage && <p>{successMessage}</p>}
                </div>
            )}
            {post.status === "PUBLISHED" && (
                <div>
                    <button type="button" onClick={handleArchive}>Archive</button>
                </div>
            )}
        </div>
    );
}