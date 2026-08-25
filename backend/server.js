import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
console.log(
  "Gemini key loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

const app = express();
const PORT = 5000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";

const parseJsonResponse = (text) => {
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "");
  return JSON.parse(cleaned);
};

const generateJson = async (prompt) => {
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return parseJsonResponse(response.text);
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "EDUAI backend is running",
  });
});

app.post("/api/test-ai", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: "Say hello to EDUAI in one short sentence.",
    });

    res.json({
      response: response.text,
    });
  } catch (error) {
console.error("Gemini error:", error);

res.status(500).json({
  error: error.message || String(error),
});
  }
});

app.post("/api/generate-lesson", async (req, res) => {
  try {
    const { subject, topic, grade, duration, difficulty, objectives, teachingStyle, activities } = req.body;

    if (!subject || !topic || !grade) {
      return res.status(400).json({ error: "subject, topic, and grade are required" });
    }

    const lesson = await generateJson(`Create a classroom lesson plan as JSON for ${grade} students.
Subject: ${subject}
Topic: ${topic}
Duration: ${duration} minutes
Difficulty: ${difficulty}
Objectives: ${objectives || "Choose suitable learning objectives."}
Teaching style: ${teachingStyle}
Number of activities: ${activities}

      Return exactly this shape: {"title": string, "objectives": string[], "introduction": string, "activities": [{"title": string, "description": string, "minutes": number}], "discussionQuestions": string[], "assessmentQuestions": string[], "homework": string, "visualAids": [{"title": string, "type": "diagram" | "example" | "prompt", "description": string}]}. For Visual teaching style, make visualAids especially concrete and include what the teacher should draw, show, or place on screen.`);

    res.json({ lesson });
  } catch (error) {
    console.error("Lesson generation error:", error);
    res.status(500).json({ error: error.message || String(error) });
  }
});

app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { subject, topic, grade, difficulty, questionCount, questionType = "Multiple Choice" } = req.body;

    if (!subject || !topic || !grade) {
      return res.status(400).json({ error: "subject, topic, and grade are required" });
    }

    const quiz = await generateJson(`Create ${questionCount || 5} ${questionType} quiz questions for ${grade} students.
Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty}

Return exactly this shape: {"questions": [{"question": string, "options": [string, string, string, string], "answer": number}]}. The answer must be the zero-based index of the correct option. Return only valid JSON.`);

    res.json({ questions: quiz.questions });
  } catch (error) {
    console.error("Quiz generation error:", error);
    res.status(500).json({ error: error.message || String(error) });
  }
});

app.listen(PORT, () => {
  console.log(`EDUAI backend running on http://localhost:${PORT}`);
});