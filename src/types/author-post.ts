export type AuthorPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    body: string | null;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
};

export type UpdatePostInput = {
    title?: string;
    excerpt?: string;
    body?: string;
};