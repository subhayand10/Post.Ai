-- CreateTable
CREATE TABLE "videos" (
    "title" TEXT NOT NULL,
    "urls" TEXT[],

    CONSTRAINT "videos_pkey" PRIMARY KEY ("title")
);
