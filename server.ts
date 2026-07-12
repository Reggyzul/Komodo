import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Initialize Gemini SDK lazily to avoid crashing if GEMINI_API_KEY is not defined at boot.
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.post("/api/ai-planner", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { destination, duration, budget, travelStyle, notes } = req.body;

    if (!destination || !duration) {
      res.status(400).json({ error: "Destination and duration are required" });
      return;
    }

    const ai = getGeminiClient();
    
    const prompt = `Create a detailed travel itinerary for a trip to "${destination}" for ${duration} days.
Travel details:
- Budget level: ${budget || "Medium"}
- Travel style: ${travelStyle || "General sightseeing"}
${notes ? `- Custom request/notes: ${notes}` : ""}

Provide the output in Indonesian language since the user is Indonesian. Ensure the response conforms exactly to the requested JSON schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Indonesian tour guide and travel consultant. Create amazing, engaging, realistic, and detailed travel itineraries.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Catchy title for the trip in Indonesian, e.g., 'Petualangan Eksotis Bali: 3 Hari Penuh Kenangan'"
            },
            description: {
              type: Type.STRING,
              description: "Brief overview description of the trip and what makes it special in Indonesian."
            },
            estimatedCostRange: {
              type: Type.STRING,
              description: "Estimated cost range for the whole trip in Rupiah or currency format (e.g., 'Rp 3.500.000 - Rp 5.000.000')"
            },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: {
                    type: Type.INTEGER,
                    description: "Day number"
                  },
                  theme: {
                    type: Type.STRING,
                    description: "Daily theme or focus in Indonesian, e.g., 'Eksplorasi Budaya & Pura'"
                  },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: {
                          type: Type.STRING,
                          description: "Time of the activity (e.g., '08:00 - 10:00')"
                        },
                        activity: {
                          type: Type.STRING,
                          description: "Short activity title in Indonesian"
                        },
                        description: {
                          type: Type.STRING,
                          description: "Engaging and descriptive activity explanation in Indonesian"
                        }
                      },
                      required: ["time", "activity", "description"]
                    }
                  }
                },
                required: ["day", "theme", "activities"]
              }
            },
            tips: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: "Useful tips for traveling to this destination (clothing, currency, customs, safety) in Indonesian"
            },
            recommendedHotels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "Hotel name"
                  },
                  type: {
                    type: Type.STRING,
                    description: "Type/Star level, e.g. 'Hotel Bintang 4' or 'Resor Mewah'"
                  },
                  priceRange: {
                    type: Type.STRING,
                    description: "Price per night in Indonesian format"
                  }
                },
                required: ["name", "type", "priceRange"]
              },
              description: "Recommended hotels matching the budget style"
            }
          },
          required: ["title", "description", "estimatedCostRange", "itinerary", "tips", "recommendedHotels"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response text received from Gemini API");
    }

    const result = JSON.parse(responseText.trim());
    res.json(result);
  } catch (error: any) {
    console.error("AI Planner Error:", error);
    res.status(500).json({ error: error.message || "Gagal membuat itinerary perjalanan." });
  }
});
// Setup Vite or static serving
async function setupApp() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupApp();
