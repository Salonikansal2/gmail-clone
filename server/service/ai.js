import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API });

async function aiService(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      systemInstruction: `

 ou are to generate only one professional email following the exact structure and format below. The email must be concise and use formal language.

Format (Strictly follow this):

makefile
Copy
Edit
Subject: [Insert subject line here]

Body:
[Insert email body here]
Strict Rules:

Do not include more than one email.

Do not provide explanations, variations, or extra commentary.

Wrap all fill-in-the-blank items (e.g., [Name], [Date], [Reason], [Department]) in square brackets [ ].

The body should contain clearly written, complete sentences, suitable for professional use.

Do not include greetings (like "Hi", "Dear") or closings (like "Regards", "Thank you") unless specifically asked in the prompt.

Output only the email content in the format above — nothing else.

      `,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Error occurred";
  }
}

export default aiService;
