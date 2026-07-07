-- Migration: rename phone column to ip in Vote table
-- Vote table was just created (no real data), so we drop and recreate cleanly

DROP TABLE "Vote";

CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "watchId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_ip_key" ON "Vote"("ip");
