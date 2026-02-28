/* assets/js/main.js */

// ELEMENTOS DEL DOM
const inputUrl = document.getElementById('videoUrl');
const btn = document.getElementById('downloadBtn');
const statusMsg = document.getElementById('statusMsg');
const resultSection = document.getElementById('resultSection');

// ⚠️ Recomendación: NO publiques tu API KEY en frontend.
// Para producción, usa backend. Aquí lo dejo porque ya lo tienes así.
const API_KEY = 'TU_API_KEY';
const API_HOST = 'tiktok-video-no-watermark2.p.rapidapi.com';

async function processDownload() {
  const url = (inputUrl?.value || "").trim();

  if (!url) {
    showStatus('⚠️ Por favor pega un enlace primero.', 'text-red-500');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<span class="loader"></span> Procesando...`;
  statusMsg.classList.add('hidden');
  resultSection.classList.add('hidden');

  const encodedParams = new URLSearchParams();
  encodedParams.set('url', url);
  encodedParams.set('hd', '1');

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    },
    body: encodedParams
  };

  try {
    const response = await fetch(`https://${API_HOST}/`, options);
    if (!response.ok) throw new Error('Error en la conexión.');
    const result = await response.json();

    if (result.data) {
      const videoData = result.data;
      document.getElementById('videoTitle').innerText = videoData.title || "Video de TikTok";
      document.getElementById('videoThumb').src = videoData.cover || videoData.origin_cover || "";

      const linkDescarga = videoData.hdplay || videoData.play;
      document.getElementById('downloadLink').href = linkDescarga;

      resultSection.classList.remove('hidden');
      showStatus('✅ ¡Video listo para descargar!', 'text-green-600');
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // ✅ Tip AdSense: NO pongas anuncios aquí si esta sección es “solo botones”.
      // En su lugar, deja anuncios en el blog y guías editoriales.
    } else {
      throw new Error('No se encontró el video. Verifica que sea público.');
    }
  } catch (error) {
    showStatus('❌ Error: ' + (error.message || 'Intenta de nuevo.'), 'text-red-500');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span data-i18n="btn_download">DESCARGAR</span> <i class="fa-solid fa-cloud-arrow-down"></i>`;
    // Re-aplicar idioma al label del botón
    if (window.TP_I18N) window.TP_I18N.applyLang(window.TP_I18N.getLang());
  }
}

function showStatus(text, colorClass) {
  statusMsg.innerText = text;
  statusMsg.className = `mt-4 font-bold ${colorClass}`;
  statusMsg.classList.remove('hidden');
}