import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Define the schema for the structured JSON response
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        reviewSections: {
            type: Type.ARRAY,
            description: "A list of code review sections.",
            items: {
                type: Type.OBJECT,
                required: ["category", "feedback"],
                properties: {
                    category: {
                        type: Type.STRING,
                        description: "The category of the feedback. Must be one of: 'Overall Summary', 'Potential Bugs', 'Style & Readability', 'Performance', 'Best Practices & Suggestions'."
                    },
                    feedback: {
                        type: Type.ARRAY,
                        description: "A list of detailed, actionable points for this category. Each point should be a concise string.",
                        items: { type: Type.STRING }
                    }
                }
            }
        }
    }
};


const buildPrompt = (code: string): string => {
  return `
You are a world-class senior software engineer and an expert code reviewer AI. Your task is to analyze the following code snippet and provide a comprehensive review.

Generate your response as a single JSON object that strictly adheres to the provided schema. The JSON object should contain a root property "reviewSections".

The review MUST cover the following categories:
- 'Overall Summary'
- 'Potential Bugs'
- 'Style & Readability'
- 'Performance'
- 'Best Practices & Suggestions'

For each category, provide a list of clear, concise, and actionable feedback points. If there's no feedback for a category, provide an empty array for the "feedback" property.

Here is the code to review:
\`\`\`
${code}
\`\`\`
`;
};


export interface ReviewSection {
  category: string;
  feedback: string[];
}
export interface ReviewData {
  reviewSections: ReviewSection[];
}


export const performCodeReview = async (code: string): Promise<ReviewData> => {
  try {
    const prompt = buildPrompt(code);

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

  
    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    if (!parsedResponse.reviewSections) {
        throw new Error("Invalid response format from API.");
    }

    return parsedResponse as ReviewData;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof SyntaxError) {
    
        return Promise.reject(new Error("Failed to parse the review from Gemini. The response was not valid JSON."));
    }
    if (error instanceof Error) {
        if(error.message.includes('API key not valid')) {
            return Promise.reject(new Error("The provided API key is invalid. Please check your configuration."));
        }
         return Promise.reject(new Error(`An error occurred during the code review: ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred during the code review."));
  }
};