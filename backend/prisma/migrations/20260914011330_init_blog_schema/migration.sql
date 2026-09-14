-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SeriesStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('PREREQUISITE', 'REMEDIATION', 'VULNERABILITY', 'FOLLOW_UP', 'ADDITIONAL_READING', 'RELATED');

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "status" "SeriesStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "body" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriesEntry" (
    "id" SERIAL NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "SeriesEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTag" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "PostTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostRelationship" (
    "id" SERIAL NOT NULL,
    "sourcePostId" INTEGER NOT NULL,
    "targetPostId" INTEGER NOT NULL,
    "relationshipType" "RelationshipType" NOT NULL,
    "targetAnchor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostRelationship_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "PostRelationship_no_self_reference"
        CHECK ("sourcePostId" <> "targetPostId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Series_slug_key" ON "Series"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SeriesEntry_postId_key" ON "SeriesEntry"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "SeriesEntry_seriesId_position_key" ON "SeriesEntry"("seriesId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PostTag_postId_tagId_key" ON "PostTag"("postId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "PostRelationship_sourcePostId_targetPostId_relationshipType_key" ON "PostRelationship"("sourcePostId", "targetPostId", "relationshipType");

-- AddForeignKey
ALTER TABLE "SeriesEntry" ADD CONSTRAINT "SeriesEntry_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesEntry" ADD CONSTRAINT "SeriesEntry_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRelationship" ADD CONSTRAINT "PostRelationship_sourcePostId_fkey" FOREIGN KEY ("sourcePostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRelationship" ADD CONSTRAINT "PostRelationship_targetPostId_fkey" FOREIGN KEY ("targetPostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
