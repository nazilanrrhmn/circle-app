/*
  Warnings:

  - A unique constraint covering the columns `[followingId,followersId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follow_followingId_followersId_key" ON "Follow"("followingId", "followersId");
