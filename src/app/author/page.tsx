"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthorPostList from "@/components/author/AuthorPostList";
import type { AuthorPost } from "@/types/author-post";
import AuthorPostCard from "@/components/author/AuthorPostCard";

export default function AuthorPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [posts, setPosts] = useState<AuthorPost[]>([]);

    const [activeFilter, setActiveFilter] = useState<
            "ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED"
        >("ALL")
    
        const visiblePosts =
            activeFilter === "ALL"
                ? posts
                : posts.filter((post) => post.status === activeFilter);

    const draftPosts = posts.filter(
        (post) => post.status === "DRAFT"
    );
    const archivedPosts = posts.filter(
        (post) => post.status === "ARCHIVED"
    );
    const publishedPosts = posts.filter(
        (post) => post.status === "PUBLISHED"
    );

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
                    "http://localhost:4000/api/auth/session",
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
                    "http://localhost:4000/api/author/posts",
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
    }, []);

    if (isLoading) {
        return <p>Checking session...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
            <h1 className="text-3xl font-semibold">Author Dashboard</h1>
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