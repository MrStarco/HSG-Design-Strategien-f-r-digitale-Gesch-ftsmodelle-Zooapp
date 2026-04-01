import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import WebSocket, { WebSocketServer } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../");

dotenv.config({ path: path.join(rootDir, ".env") });
dotenv.config({ path: path.join(rootDir, ".env.secrets") });

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
const server = createServer(app);
const wss = new WebSocketServer({ noServer: true });

function pickRandom<T>(list: T[]): T | null {
  if (!list.length) return null;
  return list[Math.floor(Math.random() * list.length)] ?? null;
}

function extractVideoIdsFromHtml(html: string) {
  const ids = new Set<string>();
  const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    ids.add(match[1]);
  }
  return [...ids];
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/youtube/random", async (req, res) => {
  try {
    const handle = String(req.query.handle ?? "@WalterZooSG");
    const channelUrl = `https://www.youtube.com/${handle}/videos`;
    const response = await fetch(channelUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
      },
    });

    if (!response.ok) {
      res.status(502).json({ error: "YouTube-Kanal konnte nicht geladen werden." });
      return;
    }

    const html = await response.text();
    const videoIds = extractVideoIdsFromHtml(html);
    const videoId = pickRandom(videoIds);
    if (!videoId) {
      res.status(404).json({ error: "Keine Videos im Kanal gefunden." });
      return;
    }

    res.json({
      handle,
      videoId,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    });
  } catch (error) {
    console.error("YouTube random API error:", error);
    res.status(500).json({ error: "Zufallsvideo konnte nicht geladen werden." });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { systemPrompt, messages } = req.body as {
      systemPrompt?: string;
      messages?: Array<{ role: "user" | "assistant"; content: string }>;
    };

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
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: "Die Chat-Antwort konnte nicht geladen werden." });
  }
});

const port = Number(process.env.BACKEND_PORT ?? 3001);

server.on("upgrade", (request, socket, head) => {
  const path = request.url?.split("?")[0];
  if (path !== "/ws" && path !== "/ws/") {
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, (client) => {
    wss.emit("connection", client, request);
  });
});

wss.on("connection", (client) => {
  client.on("message", (payload) => {
    for (const peer of wss.clients) {
      if (peer !== client && peer.readyState === WebSocket.OPEN) {
        peer.send(payload);
      }
    }
  });
});

server.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});
