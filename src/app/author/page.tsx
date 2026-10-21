"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthorPostList from "@/components/author/AuthorPostList";
import type { AuthorPost } from "@/types/author-post";

export default function AuthorPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [posts, setPosts] = useState<AuthorPost[]>([]);

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
        <main>
            <h1>Author Dashboard</h1>

            <section>
                <h2>Drafts</h2>
                <AuthorPostList 
                    posts={draftPosts} 
                    onPostUpdated={handlePostUpdated}
                />
            </section>

            <section>
                <h2>Published</h2>
                <AuthorPostList 
                    posts={publishedPosts} 
                    onPostUpdated={handlePostUpdated}
                />
            </section>

            <section>
                <h2>Archived</h2>
                <AuthorPostList 
                    posts={archivedPosts} 
                    onPostUpdated={handlePostUpdated}
                />
            </section>
        </main>
    )
}