// server/services/aiService.js

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// Initialize the Google AI client with your API key from the .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Safety settings to prevent the AI from blocking responses
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

// ✅ Helper function to extract and parse JSON from AI response
function extractAndParseJSON(text) {
  try {
    // First, try to parse directly (in case it's already clean JSON)
    return JSON.parse(text);
  } catch (e) {
    // If that fails, try to extract JSON from markdown code blocks
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1].trim());
      } catch (parseError) {
        throw new Error(`Failed to parse extracted JSON: ${parseError.message}`);
      }
    }
    
    // If no code blocks found, try to find JSON-like content
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      const jsonContent = text.substring(jsonStart, jsonEnd + 1);
      try {
        return JSON.parse(jsonContent);
      } catch (parseError) {
        throw new Error(`Failed to parse extracted JSON content: ${parseError.message}`);
      }
    }
    
    throw new Error(`No valid JSON found in response: ${text}`);
  }
}

async function analyzeResumeWithAI(resumeText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
      You are an expert career coach and resume reviewer for a tech company.
      Analyze the following resume text and provide feedback in a strict JSON format.

      The resume text is:
      ---
      ${resumeText}
      ---

      Based on the text, provide the following:
      1. A concise "summary" of the candidate's profile in 2-3 sentences.
      2. A list of key "strengths" as an array of strings. Find at least 3 strengths.
      3. A list of "improvements" or areas to enhance as an array of strings. Find at least 2 areas for improvement.

      IMPORTANT: Return ONLY a valid JSON object with no additional text, explanations, or markdown formatting. The structure must be exactly:
      {
        "summary": "A brief summary of the candidate.",
        "strengths": ["Strength one.", "Strength two.", "Strength three."],
        "improvements": ["Improvement one.", "Improvement two."]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    console.log("Raw AI Response (Resume Analysis):", responseText);
    
    // ✅ Use the helper function to extract and parse JSON
    return extractAndParseJSON(responseText);
    
  } catch (error) {
    console.error("Error with Gemini API (Resume Analysis):", error);
    
    // Return a fallback response
    return {
      summary: "Unable to analyze resume at this time.",
      strengths: ["Technical experience", "Educational background", "Professional skills"],
      improvements: ["Add more specific achievements", "Include quantifiable results"]
    };
  }
}

async function getAIFeedbackAndNextQuestion(role, history) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      safetySettings,
    });

    const chat = model.startChat({ history: history });

    const prompt = `
      You are an expert interviewer conducting an interview for a "${role}" position.
      Based on the conversation history and the user's last answer, provide:
      1. Brief, constructive feedback on their last answer (2-3 sentences max)
      2. Ask the next relevant interview question for this role
      
      IMPORTANT: Return ONLY a valid JSON object with no additional text, explanations, or markdown formatting. The structure must be exactly:
      {
        "feedback": "Your feedback on the previous answer.",
        "nextQuestion": "Your next interview question."
      }
    `;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    console.log("Raw AI Response (Interview):", responseText);
    
    // ✅ Use the helper function to extract and parse JSON
    return extractAndParseJSON(responseText);
    
  } catch (error) {
    console.error("Error with Gemini API chat:", error);
    
    // Return a fallback response
    return {
      feedback: "Thank you for your response. Let's continue with the interview.",
      nextQuestion: `Tell me about a challenging project you worked on as a ${role} and how you overcame the difficulties.`
    };
  }
}

// ✅ Add function to get the first interview question
async function getFirstInterviewQuestion(role) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
      You are an expert interviewer starting an interview for a "${role}" position.
      Ask an appropriate opening interview question for this role.
      
      IMPORTANT: Return ONLY a valid JSON object with no additional text, explanations, or markdown formatting. The structure must be exactly:
      {
        "firstQuestion": "Your opening interview question."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    console.log("Raw AI Response (First Question):", responseText);
    
    const parsed = extractAndParseJSON(responseText);
    return parsed.firstQuestion || "Tell me about yourself and why you're interested in this position.";
    
  } catch (error) {
    console.error("Error getting first question:", error);
    
    // Return a fallback question
    return `Tell me about yourself and your experience as a ${role}.`;
  }
}

module.exports = { 
  analyzeResumeWithAI, 
  getAIFeedbackAndNextQuestion,
  getFirstInterviewQuestion 
};