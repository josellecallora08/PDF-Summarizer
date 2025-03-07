import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Extract text from PDF
    const data = await pdfParse(req.file.buffer);
    const extractedText = data.text;

    // Send text to Gemini API for summarization
    const summary = await getSummaryFromGemini(extractedText);

    console.log(summary);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Error processing file" });
  }
});

// Function to call Gemini API
async function getSummaryFromGemini(text) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        system_instruction: {
          parts: {
            text: `Return the summarized version of this information ${text}`,
          },
        },
        contents: [
          {
            parts: [
              {
                text: `Summarize the following text: ${text}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate summary.";
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
