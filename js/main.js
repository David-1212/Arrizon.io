/* =========================================================
   Raicilla Hnos. Arrizón — Interacciones
   ========================================================= */

/* ============ CONFIGURACIÓN (EDITA AQUÍ) ============ */
const CONTACT = {
  whatsappNumber: "523881058508",        // +52 388 105 8508
  whatsappDisplay: "+52 388 105 8508",
  phoneDisplay: "+52 388 105 5998",
  phoneTel: "+523881055998",
  email: "raicillahnosarrizon@gmail.com", // TODO: reemplaza con el correo real
  facebook: "https://www.facebook.com/Hnos.Arrizon",
  instagram: "https://www.instagram.com/hnos.arrizon", // TODO: verifica el handle real
  tiktok: "https://www.tiktok.com/@hnos.arrizon",      // TODO: verifica el handle real
  mapLink: "https://www.google.com/maps?q=Rancho+La+Vieja,+Mascota,+Jalisco,+Mexico",
};

const wa = (msg) => `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`;

/* ============ Utilidades ============ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

document.querySelectorAll("section[id]").forEach((el) => (el.style.scrollMarginTop = "88px"));

/* ============ Bloqueo de scroll ============ */
const lockScroll = (on) => document.body.style.overflow = on ? "hidden" : "";

/* ============ AGE GATE ============ */
const ageGate = $("#ageGate");
const AGE_KEY = "arrizon_age_verified";

function initAgeGate() {
  if (!ageGate) return;
  const already = localStorage.getItem(AGE_KEY) === "yes";
  if (!already) {
    lockScroll(true);
    ageGate.classList.remove("is-hidden");
  }
  const yes = $("#ageYes");
  const no = $("#ageNo");
  if (yes) yes.addEventListener("click", () => {
    localStorage.setItem(AGE_KEY, "yes");
    ageGate.classList.add("is-hidden");
    lockScroll(false);
  });
  if (no) no.addEventListener("click", () => {
    ageGate.classList.add("is-denied");
    const title = $("#ageTitle");
    const sub = $(".age-gate__actions");
    const note = $(".age-gate__note");
    if (title) title.textContent = "Lo sentimos";
    if (sub) sub.style.display = "none";
    if (note) note.innerHTML = "Este sitio está dirigido a mayores de 18 años.<br>Te esperamos cuando cumplas.";
  });
}
initAgeGate();

/* ============ PRELOADER ============ */
window.addEventListener("load", () => {
  const pre = $("#preloader");
  if (pre) setTimeout(() => pre.classList.add("is-done"), 700);
});

/* ============ NAVBAR ============ */
const navbar = $("#navbar");
const burger = $("#burger");
const navLinks = $("#navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > 40);
}, { passive: true });

burger.addEventListener("click", () => {
  burger.classList.toggle("is-open");
  navLinks.classList.toggle("is-open");
});
$$("#navLinks a").forEach((a) =>
  a.addEventListener("click", () => {
    burger.classList.remove("is-open");
    navLinks.classList.remove("is-open");
  })
);

/* ============ SCROLL PROGRESS ============ */
const progressBar = $("#progressBar span");
const updateProgress = () => {
  if (!progressBar) return;
  const h = document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progressBar.style.width = `${(p * 100).toFixed(2)}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* ============ REVEAL ON SCROLL ============ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay;
        if (delay) el.style.transitionDelay = `${delay * 120}ms`;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
$$(".reveal").forEach((el) => revealObserver.observe(el));

/* ============ CONTADORES ============ */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || "";
      const dur = 1600;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
$$(".counter").forEach((el) => counterObserver.observe(el));

/* ============ HISTORIA: navegación de capítulos + scrollspy ============ */
const tlNav = $("#tlNav");
const tlFlow = $("#tlFlow");
if (tlNav && tlFlow) {
  const tlItems = $$(".tl-nav__item", tlNav);
  const tlCards = $$(".tl-card", tlFlow);

  tlItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = $("#" + btn.dataset.target, tlFlow);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  const tlSpy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      tlItems.forEach((b) => b.classList.toggle("is-active", b.dataset.target === id));
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  tlCards.forEach((c) => tlSpy.observe(c));
}

/* ============ PARALLAX HERO ============ */
const heroBg = $(".hero__bg");
window.addEventListener("scroll", () => {
  if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.18}px)`;
}, { passive: true });

/* ============ TILT EN TARJETAS ============ */
$$(".pcard").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave", () => (card.style.transform = ""));
});

/* ============ LINKS DE CONTACTO ============ */
function wireLinks() {
  const msgNav = "Hola, quiero pedir Raicilla Hnos. Arrizón. ¿Me pueden dar información?";
  const msgFloat = "Hola, quiero información sobre Raicilla Hnos. Arrizón.";
  const msgTour = "Hola, me gustaría reservar una visita y tour en la Taberna La Vieja.";

  const set = (id, href) => { const el = $("#" + id); if (el) el.href = href; };

  set("waNav", wa(msgNav));
  set("floatWa", wa(msgFloat));
  set("reservarWa", wa(msgTour));
  set("waLink", wa("Hola, quiero pedir Raicilla Hnos. Arrizón."));
  set("faqWa", wa("Hola, quiero pedir Raicilla Hnos. Arrizón. ¿Cómo puedo comprar?"));
  set("mapLink", CONTACT.mapLink);
  set("telLink", `tel:${CONTACT.phoneTel}`);
  set("mailLink", `mailto:${CONTACT.email}?subject=${encodeURIComponent("Información sobre Raicilla Hnos. Arrizón")}`);
  set("reservarMail", `mailto:${CONTACT.email}?subject=${encodeURIComponent("Reserva de visita · Taberna La Vieja")}`);
  set("fbLink", CONTACT.facebook);
  set("igLink", CONTACT.instagram);
  set("ttLink", CONTACT.tiktok);
  set("fbLink2", CONTACT.facebook);
  set("igLink2", CONTACT.instagram);
  set("ttLink2", CONTACT.tiktok);
}
wireLinks();

/* Botones "Pedir por WhatsApp" de cada producto */
$$(".wa-order").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = btn.closest(".pcard, .catrow, .punch, .prow, .mosaic__item, .pmenu__item, .shopcard");
    const heading = card ? card.querySelector("h3, h4") : null;
    let label = "producto";
    if (heading) {
      const clone = heading.cloneNode(true);
      clone.querySelector(".pmenu__tag")?.remove();
      label = clone.textContent.trim().replace(/\s+/g, " ") || "producto";
    }
    window.open(wa(`Hola, me interesa cotizar: ${label} de Raicilla Hnos. Arrizón. ¿Me pueden dar más información?`), "_blank");
  });
});

/* ============ MODAL DE PRODUCTO (foto + ficha) ============ */
const PRODUCTOS = {
  "blanco-750": {
    nombre: "Raicilla Blanco", formato: "750 ml · 45% Alc. Vol.", tag: "Clásica", precio: 350,
    img: "images/productos/raicilla_normal-cutout.png",
    desc: "Nuestra raicilla insignia. 100% agave maximiliana de la sierra, destilada a mano en la Taberna La Vieja.",
    notas: [
      ["Vista", "Transparente, brillante"],
      ["Nariz", "Agave cocido, cítricos y hierbas de la sierra"],
      ["Boca", "Herbal, ahumado sutil, mineral; final largo y cálido"],
    ],
    chips: ["45% Alc. Vol.", "Mascota, Jalisco", "Doble destilación"],
  },
  "madurada": {
    nombre: "Madurada en Vidrio", formato: "750 ml · 45% Alc. Vol.", tag: "Edición especial", precio: 550,
    img: "images/productos/madurado-cutout.png",
    desc: "Reposa en vidrio durante al menos 6 meses, un sello de nuestra casa: la maduración sin roble suaviza y redondea el destilado.",
    notas: [
      ["Vista", "Limpiada, lágrima fina"],
      ["Nariz", "Fruta madura, miel y flores"],
      ["Boca", "Redonda, suave, con un toque dulce y elegante final"],
    ],
    chips: ["45% Alc. Vol.", "6+ meses en vidrio", "Sin roble"],
  },
  "blanco-250": {
    nombre: "Raicilla Blanco", formato: "250 ml · 45% Alc. Vol.", tag: "Degustación", precio: 150,
    img: "images/productos/pachita-cutout.png",
    desc: "El mismo carácter de la sierra en formato viaje y degustación. Ideal para regalar, probar o llevar contigo.",
    notas: [
      ["Vista", "Transparente"],
      ["Nariz", "Agave, cítrico y un toque de bosque"],
      ["Boca", "Fresca, especiada, de trago largo"],
    ],
    chips: ["45% Alc. Vol.", "Formato 250 ml"],
  },
  "ponche-jamaica": {
    nombre: "Ponche de Jamaica", formato: "Macerado artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/jamaica-cutout.png",
    desc: "Flor de jamaica macerada con raicilla; ácida, refrescante y profunda.",
    notas: [
      ["Sabor", "Floral, ácida y refrescante"],
      ["Maridaje", "Cítricos y postres ligeros"],
    ],
    chips: ["Raicilla + jamaica", "Macerado artesanal"],
  },
  "ponche-mango": {
    nombre: "Ponche de Mango", formato: "Macerado artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/mango-cutout.png",
    desc: "Mango maduro; tropical, cremoso y de trago largo.",
    notas: [
      ["Sabor", "Tropical y cremoso"],
      ["Maridaje", "Mango, chile y sal de gusano"],
    ],
    chips: ["Raicilla + mango", "Macerado artesanal"],
  },
  "ponche-tamarindo": {
    nombre: "Ponche de Tamarindo", formato: "Macerado artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/tamarindo-cutout.png",
    desc: "Tamarindo agrio-dulce; cuerpo medio y carácter generoso.",
    notas: [
      ["Sabor", "Agrio-dulce, cuerpo medio"],
      ["Maridaje", "Comida picante y mariscos"],
    ],
    chips: ["Raicilla + tamarindo", "Macerado artesanal"],
  },
  "ponche-maracuya": {
    nombre: "Ponche de Maracuyá", formato: "Macerado artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/maracuya-cutout.png",
    desc: "Maracuyá silvestre; cítrico, vibrante y con semillas crujientes.",
    notas: [
      ["Sabor", "Cítrico y vibrante"],
      ["Maridaje", "Mariscos y ensaladas"],
    ],
    chips: ["Raicilla + maracuyá", "Macerado artesanal"],
  },
  "licor-cafe": {
    nombre: "Licor de Café", formato: "Macerado artesanal", tag: "Especial", precio: 250,
    img: "images/productos/cafe-cutout.png",
    desc: "Café de altura de la región; tostado, cálido y con cuerpo. Perfecto para la sobremesa.",
    notas: [
      ["Sabor", "Tostado y cálido"],
      ["Maridaje", "Postres y sobremesa"],
    ],
    chips: ["Café de la región", "Macerado artesanal"],
  },
};

const shopModal = $("#shopModal");
if (shopModal) {
  const mImg = $("#modalImg");
  const mTag = $("#modalTag");
  const mName = $("#modalName");
  const mPrice = $("#modalPrice");
  const mFormat = $("#modalFormat");
  const mDesc = $("#modalDesc");
  const mNotes = $("#modalNotes");
  const mChips = $("#modalChips");
  const mWa = $("#modalWa");

  mImg.addEventListener("error", () => { if (!mImg.dataset.fallback) { mImg.dataset.fallback = "1"; mImg.src = "images/producto-4.jpg"; } });

  const openShopModal = (slug) => {
    const p = PRODUCTOS[slug];
    if (!p) return;
    mImg.src = p.img;
    mImg.alt = `${p.nombre} ${p.formato}`;
    mTag.textContent = p.tag;
    mName.textContent = p.nombre;
    mPrice.innerHTML = `$${p.precio} <small>MXN</small>`;
    mFormat.textContent = p.formato;
    mDesc.textContent = p.desc;
    mNotes.innerHTML = p.notas.map(([k, v]) => `<li><strong>${k}</strong><span>${v}</span></li>`).join("");
    mChips.innerHTML = p.chips.map((c) => `<span>${c}</span>`).join("");
    mWa.href = wa(`Hola, me interesa cotizar: ${p.nombre} ${p.formato.split(" · ")[0]} de Raicilla Hnos. Arrizón. ¿Me pueden dar más información?`);
    shopModal.classList.add("is-open");
    lockScroll(true);
    mImg.focus?.();
  };

  const closeShopModal = () => {
    shopModal.classList.remove("is-open");
    lockScroll(false);
  };

  $$(".shopcard__open, .shopcard__details").forEach((el) =>
    el.addEventListener("click", () => openShopModal(el.dataset.slug || el.closest(".shopcard")?.dataset.slug))
  );
  $$("[data-close]", shopModal).forEach((el) => el.addEventListener("click", closeShopModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && shopModal.classList.contains("is-open")) closeShopModal();
  });
}

/* ============ AÑO ============ */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============ PROCESO: navegación de pasos + scrollspy + video ============ */
const stepNav = $("#stepNav");
const stepsFlow = $("#stepsFlow");
if (stepNav && stepsFlow) {
  const stepItems = $$(".steps-nav__item", stepNav);
  const steps = $$(".step", stepsFlow);

  /* Click en la píldora → desplaza hasta el paso */
  stepItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = $("#step-" + btn.dataset.step, stepsFlow);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  /* Scrollspy: resalta el paso visible */
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const n = e.target.id.replace("step-", "");
      stepItems.forEach((b) => b.classList.toggle("is-active", b.dataset.step === n));
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  steps.forEach((s) => spy.observe(s));

  /* Video por paso: el slot ▶ se activa solo si el paso define data-video */
  steps.forEach((step) => {
    const media = $(".step__media", step);
    const slot = $(".step__video-slot", media);
    const src = step.dataset.video;
    if (!slot || !src) return;

    const video = document.createElement("video");
    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.hidden = true;
    slot.append(video);
    slot.classList.add("is-ready");

    const play = () => {
      video.hidden = false;
      video.play();
      slot.classList.add("is-playing");
    };
    const close = () => {
      video.pause();
      video.hidden = true;
      slot.classList.remove("is-playing");
    };

    slot.addEventListener("click", play);
    video.addEventListener("click", (e) => { e.stopPropagation(); close(); });
    video.addEventListener("ended", close);
  });
}
