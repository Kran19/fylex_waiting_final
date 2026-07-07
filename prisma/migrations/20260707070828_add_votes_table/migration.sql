-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "watchId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_phone_key" ON "Vote"("phone");
