/* assets/js/legal-i18n.js */
(function () {
  function getParamLang() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("lang") || "es").toLowerCase();
  }

  // Diccionarios por página usando data-keys
  const dict = {
    es: {
      back: "Volver al inicio",
      langLabel: "Idioma",
      navBlog: "Blog",
      navFaq: "FAQ",
      navContact: "Contacto",
      navTerms: "Términos",
      navPrivacy: "Privacidad",
      navLegal: "Aviso legal",
      updated: "Última actualización",
    },
    en: {
      back: "Back to home",
      langLabel: "Language",
      navBlog: "Blog",
      navFaq: "FAQ",
      navContact: "Contact",
      navTerms: "Terms",
      navPrivacy: "Privacy",
      navLegal: "Legal",
      updated: "Last updated",
    },
    pt: {
      back: "Voltar para o início",
      langLabel: "Idioma",
      navBlog: "Blog",
      navFaq: "FAQ",
      navContact: "Contato",
      navTerms: "Termos",
      navPrivacy: "Privacidade",
      navLegal: "Aviso legal",
      updated: "Última atualização",
    },
    fr: {
      back: "Retour à l’accueil",
      langLabel: "Langue",
      navBlog: "Blog",
      navFaq: "FAQ",
      navContact: "Contact",
      navTerms: "Conditions",
      navPrivacy: "Confidentialité",
      navLegal: "Mentions légales",
      updated: "Dernière mise à jour",
    }
  };

  // Textos largos por página (3 páginas legales)
  const pages = {
    terminos: {
      es: {
        title: "Términos y Condiciones de Uso",
        intro: "Bienvenido/a a TikPlatform (“Servicio”). Al acceder o usar este sitio web, aceptas estos Términos y Condiciones. Si no estás de acuerdo, por favor no utilices el Servicio.",
        s1: "1. Definiciones",
        s1p: "“Usuario”: persona que visita el sitio y/o usa sus funciones. “Contenido”: videos, audios, textos o enlaces. “Terceros”: plataformas externas y proveedores técnicos.",
        s2: "2. Naturaleza del servicio",
        s2p: "TikPlatform ayuda a procesar enlaces de contenido público para facilitar la descarga. No alojamos una biblioteca pública propia del contenido de TikTok y no reclamamos derechos sobre material de terceros.",
        s3: "3. Uso responsable",
        s3p: "Aceptas usar el Servicio de forma legal. Se prohíbe descargar o reutilizar material con derechos sin permiso, suplantar identidad, acosar, o automatizar accesos masivos que dañen el servicio.",
        s4: "4. Propiedad intelectual",
        s4p: "El diseño, textos editoriales y marca pertenecen a TikPlatform o sus licenciantes. Los derechos del contenido de terceros pertenecen a sus propietarios.",
        s5: "5. Limitación de responsabilidad",
        s5p: "El Servicio se ofrece “tal cual”. No garantizamos disponibilidad continua. No somos responsables por fallas de terceros (plataformas, proveedores, redes) ni por usos indebidos del Usuario.",
        s6: "6. Cambios",
        s6p: "Podemos actualizar estos términos. El uso continuado implica aceptación de cambios.",
      },
      en: {
        title: "Terms and Conditions",
        intro: "Welcome to TikPlatform (the “Service”). By accessing or using this website, you agree to these Terms. If you disagree, please do not use the Service.",
        s1: "1. Definitions",
        s1p: "“User”: anyone who visits or uses the site. “Content”: videos, audio, text or links. “Third Parties”: external platforms and technical providers.",
        s2: "2. Nature of the service",
        s2p: "TikPlatform helps process public links to facilitate downloading. We do not host a public library of TikTok content and we do not claim rights over third-party material.",
        s3: "3. Responsible use",
        s3p: "You agree to use the Service legally. You must not reuse copyrighted material without permission, impersonate, harass, or automate abusive traffic that harms the Service.",
        s4: "4. Intellectual property",
        s4p: "Our design, editorial text and brand belong to TikPlatform or licensors. Third-party content rights belong to their owners.",
        s5: "5. Limitation of liability",
        s5p: "The Service is provided “as is”. We do not guarantee uninterrupted availability. We are not responsible for third-party failures or the User’s improper use.",
        s6: "6. Changes",
        s6p: "We may update these terms. Continued use means acceptance of changes.",
      },
      pt: {
        title: "Termos e Condições",
        intro: "Bem-vindo(a) ao TikPlatform (“Serviço”). Ao acessar ou usar este site, você concorda com estes Termos. Se não concordar, não use o Serviço.",
        s1: "1. Definições",
        s1p: "“Usuário”: quem visita/usa o site. “Conteúdo”: vídeos, áudio, texto ou links. “Terceiros”: plataformas externas e provedores técnicos.",
        s2: "2. Natureza do serviço",
        s2p: "O TikPlatform ajuda a processar links públicos para facilitar o download. Não hospedamos uma biblioteca pública de conteúdo do TikTok e não reivindicamos direitos sobre material de terceiros.",
        s3: "3. Uso responsável",
        s3p: "Você concorda em usar o Serviço legalmente. É proibido reutilizar material protegido sem permissão, se passar por alguém, assediar ou automatizar tráfego abusivo.",
        s4: "4. Propriedade intelectual",
        s4p: "Design, textos editoriais e marca pertencem ao TikPlatform ou licenciadores. Direitos de terceiros pertencem aos respectivos proprietários.",
        s5: "5. Limitação de responsabilidade",
        s5p: "Serviço “como está”. Não garantimos disponibilidade contínua. Não somos responsáveis por falhas de terceiros ou uso indevido do Usuário.",
        s6: "6. Alterações",
        s6p: "Podemos atualizar os termos. Uso contínuo implica aceitação.",
      },
      fr: {
        title: "Conditions d’utilisation",
        intro: "Bienvenue sur TikPlatform (le « Service »). En accédant au site, vous acceptez ces conditions. Si vous n’êtes pas d’accord, n’utilisez pas le Service.",
        s1: "1. Définitions",
        s1p: "« Utilisateur » : toute personne utilisant le site. « Contenu » : vidéos, audio, texte ou liens. « Tiers » : plateformes externes et fournisseurs techniques.",
        s2: "2. Nature du service",
        s2p: "TikPlatform aide à traiter des liens publics pour faciliter le téléchargement. Nous n’hébergeons pas une bibliothèque publique de contenu TikTok et ne revendiquons aucun droit sur le contenu tiers.",
        s3: "3. Utilisation responsable",
        s3p: "Vous acceptez une utilisation légale. Interdit : réutilisation sans autorisation, usurpation, harcèlement, automatisation abusive nuisant au Service.",
        s4: "4. Propriété intellectuelle",
        s4p: "Design, contenus éditoriaux et marque appartiennent à TikPlatform ou à ses concédants. Les droits du contenu tiers appartiennent à leurs propriétaires.",
        s5: "5. Limitation de responsabilité",
        s5p: "Service fourni « en l’état ». Pas de garantie d’accès continu. Nous ne sommes pas responsables des défaillances de tiers ou d’un usage inapproprié.",
        s6: "6. Modifications",
        s6p: "Nous pouvons mettre à jour ces conditions. L’usage continu vaut acceptation.",
      }
    },

    privacidad: {
      es: {
        title: "Política de Privacidad",
        intro: "Esta Política explica cómo TikPlatform trata información al visitar el sitio. Buscamos minimizar recolección y ser transparentes.",
        s1: "1. Datos que podemos recopilar",
        s1p: "Datos técnicos (navegador, idioma, páginas vistas) e IP para seguridad. El enlace pegado se usa para procesar la solicitud.",
        s2: "2. Cookies",
        s2p: "Podemos usar cookies para recordar preferencias (por ejemplo idioma) y analítica básica. Si hay publicidad, terceros pueden usar cookies según sus políticas.",
        s3: "3. Finalidad",
        s3p: "Operar el sitio, prevenir abuso y mejorar experiencia. No buscamos crear perfiles sensibles.",
        s4: "4. Retención y seguridad",
        s4p: "Conservamos logs el tiempo necesario. Aplicamos medidas razonables de seguridad.",
        s5: "5. Derechos",
        s5p: "Puedes solicitar información o eliminación cuando aplique. Contáctanos desde la página de Contacto.",
      },
      en: {
        title: "Privacy Policy",
        intro: "This Policy explains how TikPlatform handles information when you visit the site. We aim to minimize collection and stay transparent.",
        s1: "1. Data we may collect",
        s1p: "Technical data (browser, language, pages viewed) and IP for security. The pasted link is used to process your request.",
        s2: "2. Cookies",
        s2p: "We may use cookies to remember preferences (like language) and basic analytics. If ads are enabled, third parties may use cookies under their policies.",
        s3: "3. Purpose",
        s3p: "Operate the site, prevent abuse, and improve UX. We do not aim to build sensitive user profiles.",
        s4: "4. Retention & security",
        s4p: "We keep logs only as needed. We apply reasonable security measures.",
        s5: "5. Your rights",
        s5p: "You can request access or deletion where applicable. Contact us via the Contact page.",
      },
      pt: {
        title: "Política de Privacidade",
        intro: "Esta Política explica como o TikPlatform trata informações quando você visita o site. Buscamos minimizar coleta e ser transparentes.",
        s1: "1. Dados que podemos coletar",
        s1p: "Dados técnicos (navegador, idioma, páginas) e IP para segurança. O link colado é usado para processar sua solicitação.",
        s2: "2. Cookies",
        s2p: "Podemos usar cookies para lembrar preferências (idioma) e análise básica. Com anúncios, terceiros podem usar cookies segundo suas políticas.",
        s3: "3. Finalidade",
        s3p: "Operar o site, prevenir abuso e melhorar UX. Não buscamos perfis sensíveis.",
        s4: "4. Retenção e segurança",
        s4p: "Mantemos logs pelo tempo necessário. Usamos medidas razoáveis de segurança.",
        s5: "5. Direitos",
        s5p: "Você pode solicitar acesso/remoção quando aplicável. Contate-nos pela página de Contato.",
      },
      fr: {
        title: "Politique de confidentialité",
        intro: "Cette politique explique comment TikPlatform traite les informations lors de votre visite. Nous minimisons la collecte et restons transparents.",
        s1: "1. Données collectées",
        s1p: "Données techniques (navigateur, langue, pages vues) et IP pour la sécurité. Le lien collé sert à traiter la demande.",
        s2: "2. Cookies",
        s2p: "Cookies pour préférences (langue) et analytique basique. Avec la publicité, des tiers peuvent utiliser des cookies selon leurs politiques.",
        s3: "3. Finalité",
        s3p: "Faire fonctionner le site, prévenir l’abus, améliorer l’expérience. Pas de profilage sensible.",
        s4: "4. Conservation & sécurité",
        s4p: "Logs conservés seulement si nécessaire. Mesures de sécurité raisonnables.",
        s5: "5. Vos droits",
        s5p: "Vous pouvez demander l’accès ou la suppression si applicable. Contactez-nous via Contact.",
      }
    },

    legal: {
      es: {
        title: "Aviso Legal / Derechos (DMCA)",
        intro: "TikPlatform es independiente y no está afiliado a TikTok/ByteDance. El usuario es responsable del uso del contenido.",
        s1: "1. No afiliación",
        s1p: "No estamos asociados ni respaldados por TikTok. Marcas y logos pertenecen a sus propietarios.",
        s2: "2. Derechos de autor",
        s2p: "No reclamamos propiedad sobre contenido de terceros. Si vas a reutilizar públicamente, pide permiso.",
        s3: "3. Reportes (DMCA/IP)",
        s3p: "Si eres titular de derechos, puedes reportar material enviando datos de contacto, descripción de la obra y enlaces relevantes. Revisaremos la solicitud.",
      },
      en: {
        title: "Legal Notice / Copyright (DMCA)",
        intro: "TikPlatform is independent and not affiliated with TikTok/ByteDance. Users are responsible for how they use content.",
        s1: "1. No affiliation",
        s1p: "We are not associated with or endorsed by TikTok. Trademarks belong to their owners.",
        s2: "2. Copyright",
        s2p: "We do not claim ownership over third-party content. If you plan to republish, request permission.",
        s3: "3. Reports (DMCA/IP)",
        s3p: "If you are a rights holder, report with contact info, work description and relevant links. We will review and act when appropriate.",
      },
      pt: {
        title: "Aviso Legal / Direitos (DMCA)",
        intro: "TikPlatform é independente e não afiliado ao TikTok/ByteDance. O usuário é responsável pelo uso do conteúdo.",
        s1: "1. Sem afiliação",
        s1p: "Não somos associados nem endossados pelo TikTok. Marcas pertencem aos proprietários.",
        s2: "2. Direitos autorais",
        s2p: "Não reivindicamos propriedade de conteúdo de terceiros. Para republicar, peça permissão.",
        s3: "3. Relatórios (DMCA/IP)",
        s3p: "Titulares de direitos podem reportar com dados de contato, descrição da obra e links relevantes. Vamos revisar.",
      },
      fr: {
        title: "Mentions légales / Droits (DMCA)",
        intro: "TikPlatform est indépendant et non affilié à TikTok/ByteDance. L’utilisateur est responsable de l’usage du contenu.",
        s1: "1. Non-affiliation",
        s1p: "Nous ne sommes pas associés ni approuvés par TikTok. Les marques appartiennent à leurs propriétaires.",
        s2: "2. Droit d’auteur",
        s2p: "Nous ne revendiquons aucun droit sur le contenu tiers. Pour republier, demandez l’autorisation.",
        s3: "3. Signalements (DMCA/IP)",
        s3p: "Les ayants droit peuvent signaler avec coordonnées, description de l’œuvre et liens concernés. Nous examinerons la demande.",
      }
    }
  };

  function applyBaseUI(lang) {
    const t = dict[lang] || dict.es;
    document.querySelectorAll("[data-ui]").forEach(el => {
      const k = el.getAttribute("data-ui");
      if (t[k]) el.textContent = t[k];
    });
  }

  function applyPageText(pageKey, lang) {
    const page = pages[pageKey];
    if (!page) return;
    const t = page[lang] || page.es;

    document.querySelectorAll("[data-p]").forEach(el => {
      const k = el.getAttribute("data-p");
      if (t[k]) el.textContent = t[k];
    });

    // actualizar <html lang="">
    document.documentElement.lang = lang;

    // selector
    const sel = document.getElementById("langSelect");
    if (sel) sel.value = lang;
  }

  function setLang(lang, pageKey) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.location.href = url.toString();
  }

  window.TP_LEGAL = { getParamLang, applyBaseUI, applyPageText, setLang };
})();