"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthorPostList from "@/components/author/AuthorPostList";
import type { AuthorPost } from "@/types/author-post";

import { API_BASE_URL } from "@/lib/api";

export default function AuthorPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState("");
    const [createError, setCreateError] = useState("");

    const [posts, setPosts] = useState<AuthorPost[]>([]);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    const [activeFilter, setActiveFilter] = useState<
            "ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED"
        >("ALL")
    
        const visiblePosts =
            activeFilter === "ALL"
                ? posts
                : posts.filter((post) => post.status === activeFilter);

    const handleCreatePost = async () => {
        const title = newPostTitle.trim();

        if (!title) {
            return;
        }

        setIsCreatingPost(true);
        setCreateError("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/posts`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                }),
            });

            if (!response.ok) {
                setError("Unable to create post.");
                return;
            }

            const createdPost: AuthorPost = await response.json();

            setPosts((currentPosts) => [
                createdPost,
                ...currentPosts,
            ]);

            setNewPostTitle("");
            setActiveFilter("DRAFT");
        } catch {
            setCreateError("Unable to connect to the post service.");
        } finally {
            setIsCreatingPost(false);
        }
    };

    const handlePostUpdated = (updatedPost: AuthorPost) => {
        setPosts((currentPosts) =>
        currentPosts.map((post) =>
        post.id === updatedPost.id
            ? updatedPost
            : post
        )
    );
    };

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/auth/session`,
                    {
                        credentials: "include",
                    }
                );

                if (response.status === 401) {
                    router.replace("/author/login");
                    return;
                }

                if (!response.ok) {
                    setError("Unable to verify your session.");
                    setIsLoading(false);
                    return;
                }

                const postResponse = await fetch(
                    `${API_BASE_URL}/api/author/posts`,
                    {
                        credentials: "include",
                    }
                );

                if (!postResponse.ok) {
                    setError("Unable to fetch posts.");
                    setIsLoading(false);
                    return;
                }

                const data: AuthorPost[] = await postResponse.json();

                setPosts(data);
                setIsLoading(false);
        
            } catch {
                setError("Unable to connect to the authentication service.");
                setIsLoading(false)
            }
        };

        checkSession();
    }, [router]);

    if (isLoading) {
        return <p>Checking session...</p>;
    }

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">
                    Author Dashboard
                </h1>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newPostTitle}
                        onChange={(event) =>
                            setNewPostTitle(event.target.value)
                        }
                        placeholder="New post title"
                        className="flex-1 rounded-md border px-3 py-2"
                    />

                    <button
                        type="button"
                        onClick={handleCreatePost}
                        disabled={
                            isCreatingPost ||
                            !newPostTitle.trim()
                        }
                        className="rounded-md border px-4 py-2 font-medium disabled:opacity-50"
                    >
                        {isCreatingPost
                            ? "Creating..."
                            : "Create Draft"}
                    </button>
                </div>

                {createError && (
                    <p className="text-sm">
                        {createError}
                    </p>
                )}
            </div>
            <div className="flex flex-wrap gap-2 border-b pb-3">
                <button 
                    onClick={() => setActiveFilter("ALL")}
                    className={activeFilter === "ALL" ? 
                    "rounded-md border px-3 py-2 text-sm font-medium" : 
                    "rounded-md border px-3 py-2 text-sm font-medium"}
                    >
                        All
                </button>
                <button 
                    onClick={() => setActiveFilter("DRAFT")}
                    className={activeFilter === "DRAFT" ?
                    "rounded-md border px-3 py-2 text-sm font-medium"
                    : 
                    "rounded-md border px-3 py-2 text-sm font-medium"}
                    >
                        Draft
                </button>
                <button 
                    onClick={() => setActiveFilter("PUBLISHED")}
                    className={activeFilter === "PUBLISHED" ? 
                    "rounded-md border px-3 py-2 text-sm font-medium" : 
                    "rounded-md border px-3 py-2 text-sm font-medium"}
                    >
                        Published
                </button>
                <button 
                    onClick={() => setActiveFilter("ARCHIVED")}
                    className={activeFilter === "ARCHIVED" ? 
                    "rounded-md border px-3 py-2 text-sm font-medium" : 
                    "rounded-md border px-3 py-2 text-sm font-medium"}
                    >
                        Archived
                </button>
            </div>

            <AuthorPostList 
                posts={visiblePosts} 
                onPostUpdated={handlePostUpdated}
            />
        </main>
    )
}