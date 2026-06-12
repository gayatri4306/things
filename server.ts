import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const api_key = process.env.GEMINI_API_KEY;

if (api_key && api_key !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: api_key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI client:", error);
  }
} else {
  console.log("No valid GEMINI_API_KEY found. Falling back to rules-based local engine.");
}

// System instructions for the DormAura AI Assistant
const SYSTEM_INSTRUCTION = `You are AuraAI, the super smart and helpful AI assistant for DormAura, an premium, high-quality, and trustworthy marketplace for both boys' and girls' hostel essentials.

Core DormAura values to project:
1. CUSTOMER FIRST: Extreme quality and 100% trustworthy products. Every item carries standard 1-year dorm-proof warranty.
2. DAMAGED CLAMS & HELPLINE: If any customer receives a damaged product or it breaks during standard use, we do hassle-free free exchanges. Customers can contact our toll-free 24/7 helpline at +1-800-DORM-AURA or use the Helpline Tab to log an instantaneous exchange ticket under 2 minutes!
3. HOSTEL ORIENTED: Design specifications fit common hostel guidelines (low wattage limits, flame-retardant bamboo bedsheets, heavy-duty under-bed storage, and secure vaults for high-density roommates).
4. REASONABLE PRICING & WEEKEND DEALS: We keep markups slim to fit student budgets. On weekends (Saturdays & Sundays), we offer "Weekend Specials" with extra 15% discount.
5. PRODUCTS OFFERED: 
   - CozyCloud Orthopedic Mattress Topper (₹3,999, Premium foam)
   - AuraSoft Bamboo Bedsheet Set (₹2,399, Anti-bacterial, cooling)
   - Lumos360 Smart LED Desk Lamp (₹1,999, USB charging, clamp design)
   - Nebula Starry Night Projector (₹1,839, Ambient, destress)
   - SecureDorm Personal Electronic Safe (₹3,199, Cable lock, fingerprint)
   - FlexiSpace Underbed storage (₹1,599, Multi-pack, space-saver)
   - QuickDry Microfiber Towel Kit (₹1,279, anti-odor)
   - SilentBreeze Portable USB Fan (₹1,199, clip-on, brushless quiet)
   - DuraHold Over-The-Door Organizer (₹1,519)
   - AquaSafe Silicone Shower Caddy (₹1,039, anti-mold)
   - EcoWash Collapsible Smart Bucket (₹959, collapsible silicone laundry bucket)
   - AuraHydrate Insulated Thermal Jug (₹1,519, double-walled warm/cold jug)
   - PureGlow Anti-Acne Moisture Soaps (₹719, botanical charcoal soaps pack)
   - AuraPeriod SafeComfort Organic Bamboo Pads (₹639, premium organic girls pads)
   - AuraGlint Anti-Tarnish Minimalist Jewelry Set (₹1,999, silver plated girls daily rings-set)
   - GlowRush Lip Oil & Dewy Cheek Tint Duo (₹1,279, sweet-almond fast makeup tint)
   - DermaChill Hydrating Ceramide Moisturizer & SPF (₹1,599, dermatologist ceramide skin duo)
   - AlphaHold 6-in-1 Precision Grooming Trimmer (₹2,399, boys cordless trimmer)
   - AeroBarbell Heavy Resistance Gym Cord Kit (₹1,199, stackable boys workout bands)

Please keep response messages friendly, young, energetic, and concise (max 3 sentences). Promote hostel hacks or products politely! If asked about damage or exchange, point them to the helpline +1-800-DORM-AURA and explain that we ship replacement immediately, free of charge.`;

// Local rules-based chatbot fallback when Gemini API is deactivated
function getLocalResponse(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes("damage") || q.includes("exchange") || q.includes("broken") || q.includes("complain") || q.includes("return") || q.includes("replace")) {
    return "Don't worry! If you received a damaged or broken product, please contact our 24/7 helpline at +1-800-DORM-AURA or log an exchange claim in our 'Helpline' tab. We offer 100% free exchanges with instant home delivery!";
  }
  
  if (q.includes("weekend") || q.includes("offer") || q.includes("deal") || q.includes("discount") || q.includes("cheap") || q.includes("price")) {
    return "DormAura offers premium products at student-friendly prices. Also, check out our Saturday-Sunday Weekend Specials for an extra 15% off automatically applied!";
  }
  
  if (q.includes("lamp") || q.includes("light") || q.includes("lumos")) {
    return "Our Lumos360 Smart LED Desk Lamp (₹1,999) is highly popular! It clamps onto any bedframe or desk, features USB fast-charging, and eye-care LEDs suitable for midnight cram sessions.";
  }

  if (q.includes("makeup") || q.includes("cosmetic") || q.includes("glowrush") || q.includes("tint") || q.includes("lip")) {
    return "Our GlowRush Lip Oil & Dewy Cheek Tint Duo (₹1,279) is a perfect 30-second cosmetic companion for girls on campus! It uses sweet almond oil to keep skin moisturized throughout class hours.";
  }

  if (q.includes("skin") || q.includes("moisturizer") || q.includes("dermachill") || q.includes("protection") || q.includes("spf")) {
    return "The DermaChill Ceramide Moisturizer & SPF Duo (₹1,599) hydrates dry skin barriers and shields against harsh campus UV rays with premium non-greasy SPF 50 protection!";
  }

  if (q.includes("jewelry") || q.includes("jewel") || q.includes("ring") || q.includes("necklace") || q.includes("bracelet") || q.includes("glint")) {
    return "Check out our beautiful AuraGlint Anti-Tarnish Minimalist Jewelry Set (₹1,999) curated for girls. Made from solid surgical steel plated in genuine sterling silver, it remains shiny in steam showers!";
  }

  if (q.includes("pad") || q.includes("stayfree") || q.includes("satfree") || q.includes("period") || q.includes("hygiene") || q.includes("sanitary")) {
    return "The AuraPeriod SafeComfort Organic Bamboo Pads (₹639) provide ultra-absorbent, hypoallergenic anti-rash wing protection for girls during long active college lecture hours.";
  }

  if (q.includes("soap") || q.includes("soaf") || q.includes("cleanser") || q.includes("pureglow")) {
    return "Our PureGlow botanical soaps pack (₹719 for 3) is a miracle for hostel face & skin care. Formulated with activated charcoal and skin-cooling tea tree oil, it keeps humidity breakouts far away!";
  }

  if (q.includes("bucket") || q.includes("ecowash") || q.includes("leak") || q.includes("cleaning") || q.includes("laundry")) {
    return "The EcoWash Collapsible Smart Bucket (₹959) is a marvelous hostel space-saver. It holds 10L, has a controlled pouring spout, and collapses down to just 2 inches to slide under your desk/bunk.";
  }

  if (q.includes("jug") || q.includes("water") || q.includes("drink") || q.includes("hydrate")) {
    return "The AuraHydrate Insulated Thermal Jug (₹1,519) is a heavy-duty stainless beverage jug that keeps drinking water chilled for 24 hours. A flip straw makes sipping easy during hot class weeks!";
  }

  if (q.includes("trimmer") || q.includes("shave") || q.includes("grooming") || q.includes("shaving") || q.includes("beard") || q.includes("groom")) {
    return "The AlphaHold 6-in-1 Precision Trimmer (₹2,399) is an absolute must-have boy thing! It is cordless, titanium-plated, and runs 150 minutes straight so you bypass waiting in salon queues!";
  }

  if (q.includes("boy") || q.includes("man") || q.includes("guy")) {
    return "We have wonderful products specifically curated for boys' rooms! Check out our new 6-in-1 Precision Trimmer, secure electronic safe, or our Heavy Resistance Workout Bands by clicking the floor filters.";
  }

  if (q.includes("girl") || q.includes("woman") || q.includes("lady")) {
    return "We have beautiful items curated for girls' hostel rooms! Try our new anti-rash organic sanitary pads, sweet-almond cheek makeup tint, dewy skin moisturizer, or our tarnish-free sterling jewelry. Select 'Girls Floor' filter to see them!";
  }

  if (q.includes("safe") || q.includes("secure") || q.includes("protect") || q.includes("lock")) {
    return "Our SecureDorm Personal Electronic Safe (₹3,199) comes with a heavy-duty steel lock tether. It secures the vault directly to your bedpost or study table to keep your laptop, keys, and cards perfectly safe.";
  }

  if (q.includes("bed") || q.includes("mattress") || q.includes("sheet")) {
    return "DormAura bedding is stellar! The CozyCloud Orthopedic Mattress Topper (₹3,999) turns standard wooden bunks into clouds, while our Bamboo Bedsheet Set (₹2,399) is cooling and hypo-allergenic.";
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("help") || q.includes("welcome")) {
    return "Hey there! Welcome to DormAura. I'm AuraAI, your student advisor. What premium hostel essentials can I help you find today? Ask me about weekend offers, boys/girls products, or free exchanges!";
  }

  return "That is super exciting! At DormAura, we focus on high-quality, certified trustworthy gear for hostel living. Ask me about student deals, weekend savings, or how to easily exchange any damaged product via +1-800-DORM-AURA!";
}

// Chat API Route
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  // If Gemini client is activated, send to LLM
  if (ai) {
    try {
      // Build conversation structure compatible with @google/genai SDK chats or direct contents
      // To keep it highly robust and quick (avoiding complex session issues), we'll do a content generation with context.
      const formattedHistory = Array.isArray(history) 
        ? history.slice(-6).map((h: any) => `${h.sender === "user" ? "User" : "AuraAI"}: ${h.text}`).join("\n")
        : "";

      const prompt = `Conversation history:\n${formattedHistory}\n\nUser: ${message}\n\nGenerate your response as AuraAI following the system instructions:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const responseText = response.text || getLocalResponse(message);
      return res.json({ responseText });
    } catch (err) {
      console.error("Gemini API core generateContent failed, using local rules-based fallback:", err);
      return res.json({ 
        responseText: getLocalResponse(message), 
        note: "API connection paused. Operating on trustworthy local intelligence." 
      });
    }
  }

  // Offline fallback response
  return res.json({ responseText: getLocalResponse(message) });
});

// Start listening and mount Vite elements
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite Development Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving built static distribution.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DormAura full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
