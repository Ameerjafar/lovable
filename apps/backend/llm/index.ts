
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
console.log(genAI)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

export async function streamTextResponse() {
  const prompt = "president of america";
  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
  }
}

streamTextResponse();