import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_HOST = "tiktok-video-no-watermark2.p.rapidapi.com";
const API_KEY = process.env.RAPIDAPI_KEY;

app.post("/api/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!API_KEY) {
      return res.status(500).json({ error: "RAPIDAPI_KEY no está configurada en .env" });
    }

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "URL inválida" });
    }

    const encodedParams = new URLSearchParams();
    encodedParams.set("url", url);
    encodedParams.set("hd", "1");

    const r = await fetch(`https://${API_HOST}/`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST
      },
      body: encodedParams
    });

    const raw = await r.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = { raw }; }

    if (!r.ok) {
      return res.status(r.status).json({
        error: "RapidAPI error",
        status: r.status,
        details: data
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

app.listen(3000, () => console.log("✅ Proxy corriendo en http://localhost:3000"));