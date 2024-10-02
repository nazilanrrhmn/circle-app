-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "followingId" INTEGER NOT NULL,
    "followersId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followersId_fkey" FOREIGN KEY ("followersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
