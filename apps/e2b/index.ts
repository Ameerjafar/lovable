import express, { Request, Response } from "express";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "./prompt";
import { createFile, updateFile, deleteFile, readFile } from "./tools";
import { Sandbox } from "@e2b/code-interpreter";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.E2B_API_KEY);

const app = express();

app.use(express.json());

app.post("/prompt", async (req: Request, res: Response) => {
  const { prompt } = req.body;

  const sandbox = await Sandbox.create(process.env.TEMPLATE_ID!);
  // const url = sandbox.getHost(3000);
  // console.log(url);
  sandbox.commands.run("npm install");
  // const host = await sandbox.getHost(3000)
  console.log("prompt", prompt);
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  const response = streamText({
    model: openrouter("gpt-4o-mini"),
    tools: {
      createFile: createFile,
      updateFile: updateFile,
      deleteFile: deleteFile,
      readFile: readFile,
    },
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  console.log(await response.content);
  const result = response.pipeTextStreamToResponse(res);
  res.status(200).json({ result });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
