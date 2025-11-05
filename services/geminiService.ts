import { GoogleGenAI } from "@google/genai";

const systemInstruction = `You are an expert curriculum designer and teacher's assistant. Your task is to generate high-quality, ready-to-use educational resources based on the user's request. 
The output must be well-structured, clear, and formatted using Markdown. 
Use headings, bullet points, and numbered lists to organize the content effectively. 
Ensure the tone is professional, encouraging, and suitable for an educational context.
For example, if asked for a worksheet, create clear instructions and questions. If asked for a lesson plan, include objectives, materials, activities, and assessments.`;

export const generateResource = async (prompt: string): Promise<string> => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    // This message is user-facing as it will be caught and displayed in the UI.
    throw new Error("API key not found. Please ensure it is configured correctly in your deployment environment.");
  }
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            topP: 0.95,
        },
    });

    if (!response.text) {
        throw new Error("Received an empty response from the AI.");
    }
    
    return response.text;

  } catch (error) {
    console.error("Error generating resource from Gemini:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error("The configured API key is invalid. Please check and update it.");
    }
    throw new Error("Failed to generate the resource. The AI service may be temporarily unavailable.");
  }
};
