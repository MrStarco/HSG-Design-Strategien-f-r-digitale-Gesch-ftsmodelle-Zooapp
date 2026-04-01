import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../");
dotenv.config({ path: path.join(rootDir, ".env") });
dotenv.config({ path: path.join(rootDir, ".env.secrets") });
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
});
app.post("/api/chat", async (req, res) => {
    try {
        const { systemPrompt, messages } = req.body;
        if (!systemPrompt || !messages?.length) {
            res.status(400).json({ error: "systemPrompt und messages sind erforderlich." });
            return;
        }
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            max_tokens: 300,
            messages: [
                { role: "system", content: systemPrompt },
                ...messages.map((message) => ({
                    role: message.role,
                    content: message.content,
                })),
            ],
            temperature: 0.8,
        });
        const content = completion.choices[0]?.message?.content ?? "Ich habe gerade keine Antwort gefunden.";
        res.json({ content });
    }
    catch (error) {
        console.error("Chat API error:", error);
        res.status(500).json({ error: "Die Chat-Antwort konnte nicht geladen werden." });
    }
});
const port = Number(process.env.BACKEND_PORT ?? 3001);
app.listen(port, () => {
    console.log(`Backend läuft auf http://localhost:${port}`);
});
