-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "MediaRole" AS ENUM ('COVER', 'INLINE');

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" SERIAL NOT NULL,
    "type" "MediaType" NOT NULL,
    "storageKey" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "altText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostMedia" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "mediaAssetId" INTEGER NOT NULL,
    "role" "MediaRole" NOT NULL,

    CONSTRAINT "PostMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_storageKey_key" ON "MediaAsset"("storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_url_key" ON "MediaAsset"("url");

-- CreateIndex
CREATE UNIQUE INDEX "PostMedia_postId_mediaAssetId_role_key" ON "PostMedia"("postId", "mediaAssetId", "role");

-- AddForeignKey
ALTER TABLE "PostMedia" ADD CONSTRAINT "PostMedia_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostMedia" ADD CONSTRAINT "PostMedia_mediaAssetId_fkey" FOREIGN KEY ("mediaAssetId") REFERENCES "MediaAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
