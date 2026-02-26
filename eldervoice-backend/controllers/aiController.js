const { GoogleGenAI } = require("@google/genai");

exports.analyzeMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('your_gemini_api_key_here')) {
      return res.status(500).json({ error: "Gemini API key is missing or not configured." });
    }

    // Initialize Gemini client per request to avoid crashing the server on startup if the key is missing
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const systemInstruction = "You are a helpful AI assistant specialized in analyzing health queries for elderly patients and suggesting whether they might need medical attention or just general advice. Keep responses concise and supportive.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction,
      }
    });

    res.json({
      originalMessage: message,
      analysis: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Server error during AI analysis" });
  }
};