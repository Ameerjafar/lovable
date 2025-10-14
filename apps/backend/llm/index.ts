
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI("AIzaSyBTTu5LFFGzKErTAqmRF0AcvH-ldvCijNo");
console.log(genAI)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

export async function streamTextResponse(projectId: string, userId: string) {
  const prompt = "president of america";
  const result = await model.generateContentStream(prompt);
  let wholeText = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    wholeText = wholeText + chunkText;
  }
  console.log(wholeText);
}

streamTextResponse();