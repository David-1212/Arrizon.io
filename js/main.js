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
  const already = localStorage.getItem(AGE_KEY) === "yes";
  if (!already) {
    lockScroll(true);
    ageGate.classList.remove("is-hidden");
  }
  $("#ageYes").addEventListener("click", () => {
    localStorage.setItem(AGE_KEY, "yes");
    ageGate.classList.add("is-hidden");
    lockScroll(false);
  });
  $("#ageNo").addEventListener("click", () => {
    ageGate.classList.add("is-denied");
    const card = $(".age-gate__card");
    const title = $("#ageTitle");
    const sub = $(".age-gate__actions");
    const note = $(".age-gate__note");
    title.textContent = "Lo sentimos";
    if (sub) sub.style.display = "none";
    if (note) note.innerHTML = "Este sitio está dirigido a mayores de 18 años.<br>Te esperamos cuando cumplas. 🥂";
  });
}
initAgeGate();

/* ============ PRELOADER ============ */
window.addEventListener("load", () => {
  setTimeout(() => $("#preloader").classList.add("is-done"), 700);
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

/* ============ CARRUSEL HISTORIA (estilo Netflix: fila desplazable + autoplay) ============ */
const historyTrack = $("#historyTrack");
const hPrev = $("#hPrev");
const hNext = $("#hNext");
if (historyTrack && hPrev && hNext) {
  const AUTOPLAY_MS = 4500; // 0 = desactiva el avance automático
  const GAP = 16;
  let timer = null;

  const stepX = () => {
    const c = historyTrack.querySelector(".hcard");
    return c ? c.offsetWidth + GAP : 300;
  };
  const atEnd = () => historyTrack.scrollLeft >= historyTrack.scrollWidth - historyTrack.clientWidth - 4;
  const atStart = () => historyTrack.scrollLeft <= 4;

  const updateBtns = () => {
    hPrev.disabled = atStart();
    hNext.disabled = atEnd();
  };

  const moveBy = (cards) => historyTrack.scrollBy({ left: cards * stepX(), behavior: "smooth" });

  const start = () => {
    stop();
    if (AUTOPLAY_MS > 0) {
      timer = setInterval(() => {
        if (atEnd()) historyTrack.scrollTo({ left: 0, behavior: "smooth" });
        else moveBy(1);
      }, AUTOPLAY_MS);
    }
  };
  const stop = () => { if (timer) clearInterval(timer); timer = null; };

  hPrev.addEventListener("click", () => { stop(); moveBy(-1); start(); });
  hNext.addEventListener("click", () => { stop(); moveBy(1); start(); });

  historyTrack.addEventListener("scroll", updateBtns, { passive: true });

  /* Arrastre con mouse (en táctil se usa el scroll nativo de Netflix) */
  historyTrack.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    stop();
    historyTrack.classList.add("is-dragging");
    const startX = e.clientX;
    const startScroll = historyTrack.scrollLeft;
    const onMove = (ev) => { historyTrack.scrollLeft = startScroll - (ev.clientX - startX); };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      historyTrack.classList.remove("is-dragging");
      updateBtns();
      start();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  });

  historyTrack.addEventListener("mouseenter", stop);
  historyTrack.addEventListener("mouseleave", start);
  historyTrack.addEventListener("focusin", stop);
  historyTrack.addEventListener("focusout", start);
  historyTrack.addEventListener("touchstart", stop, { passive: true });
  historyTrack.addEventListener("touchend", start, { passive: true });

  updateBtns();
  start();
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
    const card = btn.closest(".pcard, .catrow, .punch");
    const name = card ? (card.querySelector("h3, h4")?.textContent.trim() || "producto") : "producto";
    window.open(wa(`Hola, me interesa cotizar: ${name} de Raicilla Hnos. Arrizón. ¿Me pueden dar más información?`), "_blank");
  });
});

/* ============ FORMULARIO → WHATSAPP ============ */
$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const nombre = f.nombre.value.trim() || "—";
  const telefono = f.telefono.value.trim();
  const asunto = f.asunto.value;
  const mensaje = f.mensaje.value.trim() || "—";
  const msg =
    `Hola, soy ${nombre}.\n` +
    (telefono ? `Mi teléfono: ${telefono}.\n` : "") +
    `Asunto: ${asunto}.\n\n${mensaje}`;
  window.open(wa(msg), "_blank");
  f.reset();
});

/* ============ MODAL CATÁLOGO ============ */
const modal = $("#catalogModal");
$("#btnVerTodos").addEventListener("click", () => {
  modal.classList.add("is-open");
  lockScroll(true);
});
$$("[data-close]").forEach((el) =>
  el.addEventListener("click", () => {
    modal.classList.remove("is-open");
    lockScroll(false);
  })
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) {
    modal.classList.remove("is-open");
    lockScroll(false);
  }
});

/* ============ AÑO ============ */
$("#year").textContent = new Date().getFullYear();
