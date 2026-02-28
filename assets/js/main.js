// ================================
// TikPlatform - main.js (FIX+)
// ================================

(function () {
  const inputUrl = document.getElementById("videoUrl");
  const btn = document.getElementById("downloadBtn");
  const statusMsg = document.getElementById("statusMsg");
  const resultSection = document.getElementById("resultSection");

  const videoTitleEl = document.getElementById("videoTitle");
  const videoThumbEl = document.getElementById("videoThumb");
  const downloadLinkEl = document.getElementById("downloadLink");

  // ✅ Fallback directo por si el HTML no cargó window.TIK_WORKER_URL
  const FALLBACK_WORKER = "https://tik.berkeleyfelix1.workers.dev";

  let WORKER_URL = (window.TIK_WORKER_URL || FALLBACK_WORKER || "").trim();
  if (WORKER_URL.endsWith("/")) WORKER_URL = WORKER_URL.slice(0, -1);

  console.log("[TikPlatform] Worker URL:", WORKER_URL);

  const BTN_IDLE_HTML = `<span data-i18n="btn_download">DESCARGAR</span> <i class="fa-solid fa-cloud-arrow-down"></i>`;
  const BTN_LOADING_HTML = `<span class="loader"></span> Procesando...`;

  function showStatus(text, colorClass) {
    statusMsg.innerText = text;
    statusMsg.className = `mt-4 font-bold ${colorClass}`;
    statusMsg.classList.remove("hidden");
  }

  function setLoading(isLoading) {
    btn.disabled = isLoading;
    btn.innerHTML = isLoading ? BTN_LOADING_HTML : BTN_IDLE_HTML;
  }

  function cleanTikTokUrl(u) {
    try {
      const x = new URL(u);
      x.search = "";
      return x.toString();
    } catch {
      return (u || "").trim();
    }
  }

  function looksLikeTikTokUrl(u) {
    return (
      /^https?:\/\/(www\.)?tiktok\.com\//i.test(u) ||
      /^https?:\/\/vm\.tiktok\.com\//i.test(u) ||
      /^https?:\/\/vt\.tiktok\.com\//i.test(u)
    );
  }

  async function fetchWithTimeout(url, options, timeoutMs = 20000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(id);
    }
  }

  async function requestWorker(endpoint, tiktokUrl) {
    return await fetchWithTimeout(
      endpoint,
      {
        method: "POST",
        mode: "cors",
        cache: "no-store",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: tiktokUrl })
      },
      20000
    );
  }

  async function callWorker(tiktokUrl) {
    if (!WORKER_URL) throw new Error("Falta configurar WORKER_URL.");

    // ✅ intentos: sin slash y con slash (por compatibilidad)
    const endpoints = [WORKER_URL, WORKER_URL + "/"];

    let lastErr;

    for (const ep of endpoints) {
      try {
        const response = await requestWorker(ep, tiktokUrl);

        const raw = await response.text();
        let data;
        try { data = JSON.parse(raw); } catch { data = { raw }; }

        if (!response.ok) {
          const msg =
            data?.error ||
            data?.details?.message ||
            data?.details?.msg ||
            data?.message ||
            `HTTP ${response.status}`;
          throw new Error(msg);
        }

        return data;
      } catch (e) {
        lastErr = e;
        // si fue AbortError o Failed to fetch, probamos el otro endpoint
      }
    }

    if (lastErr?.name === "AbortError") {
      throw new Error("Tiempo de espera agotado. Intenta de nuevo.");
    }
    throw new Error(lastErr?.message || "Failed to fetch");
  }

  window.processDownload = async function processDownload() {
    let url = (inputUrl?.value || "").trim();

    if (!url) {
      showStatus("⚠️ Por favor pega un enlace primero.", "text-red-500");
      return;
    }

    url = cleanTikTokUrl(url);

    if (!looksLikeTikTokUrl(url)) {
      showStatus("⚠️ Pega un enlace válido de TikTok.", "text-red-500");
      return;
    }

    statusMsg.classList.add("hidden");
    resultSection.classList.add("hidden");
    setLoading(true);

    try {
      const result = await callWorker(url);

      if (!result?.data) {
        console.log("Respuesta Worker:", result);
        throw new Error("No se pudo obtener el video. Verifica que sea público.");
      }

      const videoData = result.data;

      videoTitleEl.innerText = videoData.title || "Video de TikTok";
      videoThumbEl.src = videoData.cover || videoData.origin_cover || "";
      videoThumbEl.alt = videoData.title ? `Miniatura: ${videoData.title}` : "Miniatura";

      const linkDescarga = videoData.hdplay || videoData.play || videoData.wmplay;
      if (!linkDescarga) throw new Error("No se encontró enlace de descarga en la respuesta.");

      downloadLinkEl.href = linkDescarga;

      resultSection.classList.remove("hidden");
      showStatus("✅ ¡Video listo para descargar!", "text-green-600");
      resultSection.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      console.error(err);
      let msg = err?.message || "Intenta de nuevo.";

      if (msg.includes("Failed to fetch")) {
        msg = "No se pudo conectar al Worker. Esto suele ser CORS/OPTIONS. Asegura que tu Worker responde OPTIONS con Access-Control-Allow-Origin.";
      }

      showStatus("❌ Error: " + msg, "text-red-500");
    } finally {
      setLoading(false);
    }
  };
})();