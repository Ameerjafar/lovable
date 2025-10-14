-- CreateEnum
CREATE TYPE "ToolCall" AS ENUM ('READ_FILE', 'WRITE_FILE', 'UPDATE_FILE', 'DELETE_FILE');

-- CreateEnum
CREATE TYPE "MessageForm" AS ENUM ('USER', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "ConversationType" AS ENUM ('TOOL_CALL', 'TEXT_MESSAGE');

-- CreateTable
CREATE TABLE "ConverstationHistory" (
    "id" TEXT NOT NULL,
    "conntents" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "toolCall" "ToolCall",
    "type" "ConversationType" NOT NULL,
    "from" "MessageForm" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConverstationHistory_pkey" PRIMARY KEY ("id")
);
