-- CreateTable
CREATE TABLE "like_replies" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "repliesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "like_replies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "like_replies_authorId_repliesId_key" ON "like_replies"("authorId", "repliesId");

-- AddForeignKey
ALTER TABLE "like_replies" ADD CONSTRAINT "like_replies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_replies" ADD CONSTRAINT "like_replies_repliesId_fkey" FOREIGN KEY ("repliesId") REFERENCES "replies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
