import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
  console.log("above line");
  const result = await model.generateContent("who is the president of america");
  console.log(result.response.text());
}

run();
