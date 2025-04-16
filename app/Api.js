import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
async function run(prompt) {
  try{
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      prompt,
    ]);
    console.log(result.response.text());
    return result.response.text();

  }
  catch (e) {
    return e.message
  }
}

export default run;

