export type BlogPostSummary = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    publishedAt: string | null;
    series: {
        title: string;
        slug: string;
    } | null;
    tags: {
        name: string;
        slug: string;
    } [];
};

export type BlogPostDetail = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    body: string | null;
    publishedAt: string | null;

    series: {
        title: string;
        slug: string;
    } | null;

    tags: {
        name: string;
        slug: string;
    }[];

    coverImage: {
        url: string;
        altText: string | null;
    } | null;

    outgoingRelationships: {
        relationshipType: string;
        anchor: string | null;
        title: string;
        slug: string;
    }[];

    incomingRelationships: {
        relationshipType: string;
        anchor: string | null;
        title: string;
        slug: string;
    }[];
};