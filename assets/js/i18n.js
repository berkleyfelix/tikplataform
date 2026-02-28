/* assets/js/i18n.js */
(function () {
  const LANG_KEY = "tp_lang";

  const dict = {
    es: {
      nav_how: "Cómo funciona",
      nav_benefits: "Beneficios",
      nav_faq: "Preguntas Frecuentes",
      nav_blog: "Blog",
      nav_contact: "Contacto",
      hero_title_a: "Descargar Videos de",
      hero_title_b: "TikTok",
      hero_subtitle: "Sin marca de agua. Calidad HD. Totalmente Gratis.",
      input_placeholder: "Pega el enlace de TikTok aquí...",
      btn_download: "DESCARGAR",
      result_title: "Resultado",
      footer_tagline: "La mejor herramienta para creadores de contenido.",
      legal_priv: "Política de Privacidad",
      legal_terms: "Términos de Uso",
      legal_legal: "Aviso Legal",
      legal_faq: "FAQ",
      legal_dmca: "Derechos/DMCA",
    },
    en: {
      nav_how: "How it works",
      nav_benefits: "Benefits",
      nav_faq: "FAQ",
      nav_blog: "Blog",
      nav_contact: "Contact",
      hero_title_a: "Download",
      hero_title_b: "TikTok Videos",
      hero_subtitle: "No watermark. HD quality. 100% Free.",
      input_placeholder: "Paste the TikTok link here...",
      btn_download: "DOWNLOAD",
      result_title: "Result",
      footer_tagline: "A smart tool for content creators.",
      legal_priv: "Privacy Policy",
      legal_terms: "Terms of Use",
      legal_legal: "Legal Notice",
      legal_faq: "FAQ",
      legal_dmca: "Copyright/DMCA",
    },
    pt: {
      nav_how: "Como funciona",
      nav_benefits: "Benefícios",
      nav_faq: "Perguntas Frequentes",
      nav_blog: "Blog",
      nav_contact: "Contato",
      hero_title_a: "Baixar vídeos do",
      hero_title_b: "TikTok",
      hero_subtitle: "Sem marca d'água. Qualidade HD. 100% Grátis.",
      input_placeholder: "Cole o link do TikTok aqui...",
      btn_download: "BAIXAR",
      result_title: "Resultado",
      footer_tagline: "A melhor ferramenta para criadores.",
      legal_priv: "Política de Privacidade",
      legal_terms: "Termos de Uso",
      legal_legal: "Aviso Legal",
      legal_faq: "FAQ",
      legal_dmca: "Direitos/DMCA",
    },
    fr: {
      nav_how: "Comment ça marche",
      nav_benefits: "Avantages",
      nav_faq: "FAQ",
      nav_blog: "Blog",
      nav_contact: "Contact",
      hero_title_a: "Télécharger des vidéos",
      hero_title_b: "TikTok",
      hero_subtitle: "Sans filigrane. Qualité HD. 100% Gratuit.",
      input_placeholder: "Collez le lien TikTok ici...",
      btn_download: "TÉLÉCHARGER",
      result_title: "Résultat",
      footer_tagline: "Un outil utile pour les créateurs.",
      legal_priv: "Politique de confidentialité",
      legal_terms: "Conditions d’utilisation",
      legal_legal: "Mentions légales",
      legal_faq: "FAQ",
      legal_dmca: "Droits/DMCA",
    }
  };

  function getLang() {
    return localStorage.getItem(LANG_KEY) || "es";
  }

  function setLang(lang) {
    if (!dict[lang]) lang = "es";
    localStorage.setItem(LANG_KEY, lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    const table = dict[lang] || dict.es;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (table[key]) el.textContent = table[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (table[key]) el.setAttribute("placeholder", table[key]);
    });

    // hreflang/canonical básico (opcional)
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const url = new URL(canonical.href);
      url.searchParams.set("lang", lang);
      canonical.href = url.toString();
    }

    const selector = document.getElementById("langSelect");
    if (selector) selector.value = lang;
  }

  window.TP_I18N = { getLang, setLang, applyLang };

  document.addEventListener("DOMContentLoaded", () => {
    applyLang(getLang());

    const selector = document.getElementById("langSelect");
    if (selector) {
      selector.addEventListener("change", (e) => setLang(e.target.value));
    }
  });
})();