// ================================
// TikPlatform - main.js
// Llama al Cloudflare Worker (proxy) para evitar CORS y ocultar API KEY
// ================================

(function () {
  // ELEMENTOS DEL DOM
  const inputUrl = document.getElementById("videoUrl");
  const btn = document.getElementById("downloadBtn");
  const statusMsg = document.getElementById("statusMsg");
  const resultSection = document.getElementById("resultSection");

  const videoTitleEl = document.getElementById("videoTitle");
  const videoThumbEl = document.getElementById("videoThumb");
  const downloadLinkEl = document.getElementById("downloadLink");

  // URL del Worker (se define en index.html como window.TIK_WORKER_URL)
  const WORKER_URL = window.TIK_WORKER_URL || "";

  // Loader HTML del botón
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

  // Limpia parámetros raros del link de TikTok
  function cleanTikTokUrl(u) {
    try {
      const x = new URL(u);
      x.search = ""; // quita ?params
      return x.toString();
    } catch {
      return u.trim();
    }
  }

  // Valida que parezca URL de tiktok
  function looksLikeTikTokUrl(u) {
    return /^https?:\/\/(www\.)?tiktok\.com\//i.test(u) || /^https?:\/\/vm\.tiktok\.com\//i.test(u) || /^https?:\/\/vt\.tiktok\.com\//i.test(u);
  }

  async function callWorker(url) {
    if (!WORKER_URL) {
      throw new Error("Falta configurar la URL del Worker (window.TIK_WORKER_URL).");
    }

    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const raw = await response.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = { raw }; }

    if (!response.ok) {
      // Worker/RapidAPI error
      const msg =
        data?.error ||
        data?.details?.message ||
        data?.details?.msg ||
        `HTTP ${response.status}`;
      throw new Error(msg);
    }

    return data;
  }

  // Hace global la función para tu onclick="processDownload()"
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

    // UI
    statusMsg.classList.add("hidden");
    resultSection.classList.add("hidden");
    setLoading(true);

    try {
      const result = await callWorker(url);

      // RapidAPI suele devolver { data: {...} }
      if (!result || !result.data) {
        console.log("Respuesta Worker:", result);
        throw new Error("No se pudo obtener el video. Verifica que sea público.");
      }

      const videoData = result.data;

      // Título
      videoTitleEl.innerText = videoData.title || "Video de TikTok";

      // Thumb
      videoThumbEl.src = videoData.cover || videoData.origin_cover || "";
      videoThumbEl.alt = videoData.title ? `Miniatura: ${videoData.title}` : "Miniatura";

      // Link descarga
      const linkDescarga = videoData.hdplay || videoData.play || videoData.wmplay;
      if (!linkDescarga) {
        throw new Error("No se encontró enlace de descarga en la respuesta.");
      }
      downloadLinkEl.href = linkDescarga;

      // Mostrar resultado
      resultSection.classList.remove("hidden");
      showStatus("✅ ¡Video listo para descargar!", "text-green-600");

      // Scroll
      resultSection.scrollIntoView({ behavior: "smooth", block: "center" });

    } catch (err) {
      console.error(err);
      showStatus("❌ Error: " + (err?.message || "Intenta de nuevo."), "text-red-500");
    } finally {
      setLoading(false);
    }
  };
})();