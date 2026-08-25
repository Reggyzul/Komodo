import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import ws from "ws";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: "env.local" }); // also try without dot

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// ─── Supabase Server Client ───────────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

let supabaseServer: ReturnType<typeof createClient> | null = null;

function getSupabaseServer() {
  if (!supabaseServer && SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseServer = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      realtime: { transport: ws as any },
    });
  }
  return supabaseServer;
}

// ─── Keep-Alive System — Ping Supabase every 6 days so it never gets paused ──
function startKeepAlive() {
  const SIX_DAYS_MS = 6 * 24 * 60 * 60 * 1000;

  const ping = async () => {
    const sb = getSupabaseServer();
    if (!sb) return;
    try {
      const { error } = await sb.from("destinations").select("id").limit(1);
      if (error) {
        console.log(`[KeepAlive] ⚠️ Ping error: ${error.message}`);
      } else {
        console.log(`[KeepAlive] ✅ Supabase pinged at ${new Date().toISOString()}`);
      }
    } catch (e: any) {
      console.log(`[KeepAlive] ⚠️ Ping failed: ${e.message}`);
    }
  };

  // Ping immediately on start, then every 6 days
  ping();
  setInterval(ping, SIX_DAYS_MS);
}

// ─── API: Fetch all CMS data for SSR injection ───────────────────────────────
app.get("/api/data", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const sb = getSupabaseServer();
    if (!sb) {
      res.status(503).json({ error: "Supabase not configured" });
      return;
    }

    const [destRes, pkgRes, testRes, faqRes, settRes] = await Promise.all([
      sb.from("destinations").select("*").eq("is_active", true).order("sort_order"),
      sb.from("packages").select("*").eq("is_active", true).order("sort_order"),
      sb.from("testimonials").select("*").eq("is_active", true).order("created_at"),
      sb.from("faqs").select("*").eq("is_active", true).order("sort_order"),
      sb.from("site_settings").select("*"),
    ]);

    res.json({
      destinations: destRes.data || [],
      packages: pkgRes.data || [],
      testimonials: testRes.data || [],
      faqs: faqRes.data || [],
      settings: settRes.data || [],
    });
  } catch (error: any) {
    console.error("API /data error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ─── API: Keep-alive endpoint (can also be called from a cron service) ────────
app.get("/api/keep-alive", async (req: express.Request, res: express.Response): Promise<void> => {
  const sb = getSupabaseServer();
  if (!sb) {
    res.status(503).json({ ok: false, message: "Supabase not configured" });
    return;
  }
  try {
    const { error } = await sb.from("destinations").select("id").limit(1);
    if (error) throw error;
    res.json({ ok: true, ts: new Date().toISOString() });
  } catch (e: any) {
    res.status(500).json({ ok: false, message: e.message });
  }
});

// ─── Gemini AI Client ─────────────────────────────────────────────────────────
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
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// ─── API: AI Planner ─────────────────────────────────────────────────────────
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
        systemInstruction:
          "You are an expert Indonesian tour guide and travel consultant. Create amazing, engaging, realistic, and detailed travel itineraries.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description:
                "Catchy title for the trip in Indonesian, e.g., 'Petualangan Eksotis Bali: 3 Hari Penuh Kenangan'",
            },
            description: {
              type: Type.STRING,
              description:
                "Brief overview description of the trip and what makes it special in Indonesian.",
            },
            estimatedCostRange: {
              type: Type.STRING,
              description:
                "Estimated cost range for the whole trip in Rupiah or currency format (e.g., 'Rp 3.500.000 - Rp 5.000.000')",
            },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER, description: "Day number" },
                  theme: {
                    type: Type.STRING,
                    description:
                      "Daily theme or focus in Indonesian, e.g., 'Eksplorasi Budaya & Pura'",
                  },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: {
                          type: Type.STRING,
                          description: "Time of the activity (e.g., '08:00 - 10:00')",
                        },
                        activity: {
                          type: Type.STRING,
                          description: "Short activity title in Indonesian",
                        },
                        description: {
                          type: Type.STRING,
                          description:
                            "Engaging and descriptive activity explanation in Indonesian",
                        },
                      },
                      required: ["time", "activity", "description"],
                    },
                  },
                },
                required: ["day", "theme", "activities"],
              },
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description:
                "Useful tips for traveling to this destination (clothing, currency, customs, safety) in Indonesian",
            },
            recommendedHotels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Hotel name" },
                  type: {
                    type: Type.STRING,
                    description: "Type/Star level, e.g. 'Hotel Bintang 4' or 'Resor Mewah'",
                  },
                  priceRange: {
                    type: Type.STRING,
                    description: "Price per night in Indonesian format",
                  },
                },
                required: ["name", "type", "priceRange"],
              },
              description: "Recommended hotels matching the budget style",
            },
          },
          required: [
            "title",
            "description",
            "estimatedCostRange",
            "itinerary",
            "tips",
            "recommendedHotels",
          ],
        },
      },
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

// ─── Vite SSR + Static Serving ────────────────────────────────────────────────
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

    // SSR: inject initial data into HTML for zero-delay hydration
    app.get("*", async (req, res) => {
      try {
        const sb = getSupabaseServer();
        let initialData = null;

        if (sb) {
          const [destRes, pkgRes, testRes, faqRes, settRes] = await Promise.all([
            sb.from("destinations").select("*").eq("is_active", true).order("sort_order"),
            sb.from("packages").select("*").eq("is_active", true).order("sort_order"),
            sb.from("testimonials").select("*").eq("is_active", true).order("created_at"),
            sb.from("faqs").select("*").eq("is_active", true).order("sort_order"),
            sb.from("site_settings").select("*"),
          ]);

          initialData = {
            destinations: destRes.data || [],
            packages: pkgRes.data || [],
            testimonials: testRes.data || [],
            faqs: faqRes.data || [],
            settings: settRes.data || [],
          };
        }

        let html = require("fs").readFileSync(
          path.join(distPath, "index.html"),
          "utf-8"
        );

        if (initialData) {
          const script = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};</script>`;
          html = html.replace("</head>", `${script}</head>`);
        }

        res.send(html);
      } catch (e) {
        // Fallback to serving static index.html without SSR data
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🗄️  Supabase: ${SUPABASE_URL ? "✅ Connected" : "❌ Not configured"}`);
  });

  // Start keep-alive after server is up
  startKeepAlive();
}

setupApp();
