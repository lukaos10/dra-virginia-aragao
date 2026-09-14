import "./style.css";

const WHATSAPP_URL =
  "https://wa.me/5585988207837?text=" +
  encodeURIComponent(
    "Olá, Dra. Virgínia! Gostaria de agendar uma consulta.",
  );

const drawerToggle = document.querySelector<HTMLInputElement>("#nav-drawer");

document.querySelectorAll<HTMLAnchorElement>(".drawer-side a").forEach((link) => {
  link.addEventListener("click", () => {
    if (drawerToggle) {
      drawerToggle.checked = false;
    }
  });
});

const carousel = document.querySelector<HTMLDivElement>("#servicos-carousel");
const scrollCarousel = (direction: number) => {
  carousel?.scrollBy({ left: direction * 300, behavior: "smooth" });
};

document
  .querySelector("#servicos-prev")
  ?.addEventListener("click", () => scrollCarousel(-1));
document
  .querySelector("#servicos-next")
  ?.addEventListener("click", () => scrollCarousel(1));

const form = document.querySelector<HTMLFormElement>("#agendar-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const nome = String(data.get("nome") ?? "").trim();
  const telefone = String(data.get("telefone") ?? "").trim();
  const tratamento = String(data.get("tratamento") ?? "").trim();
  const mensagem = String(data.get("mensagem") ?? "").trim();

  const parts = [
    `Olá, Dra. Virgínia! Meu nome é ${nome}.`,
    "Gostaria de agendar uma consulta.",
  ];

  if (tratamento) {
    parts.push(`Interesse: ${tratamento}.`);
  }
  if (telefone) {
    parts.push(`Telefone: ${telefone}.`);
  }
  if (mensagem) {
    parts.push(mensagem);
  }

  window.open(
    `https://wa.me/5585988207837?text=${encodeURIComponent(parts.join(" "))}`,
    "_blank",
    "noopener,noreferrer",
  );
});

document.querySelectorAll<HTMLAnchorElement>("[data-whatsapp]").forEach((link) => {
  if (!link.getAttribute("href")) {
    link.href = WHATSAPP_URL;
  }
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
  const from = group.dataset.revealGroup;
  const children = [...group.children].filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && !child.hasAttribute("data-reveal-group"),
  );

  children.forEach((child, index) => {
    child.classList.add("reveal");
    if (from === "fade") {
      child.classList.add("reveal-fade");
    }
    if (from === "left" || (group.classList.contains("grid") && index === 0 && children.length === 2)) {
      child.classList.add("reveal-left");
    }
    if (from === "right" || (group.classList.contains("grid") && index === 1 && children.length === 2)) {
      child.classList.add("reveal-right");
    }
    child.style.setProperty("--reveal-delay", `${index * 140}ms`);
  });
});

document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
  element.classList.add("reveal");
  if (element.dataset.reveal === "left") {
    element.classList.add("reveal-left");
  }
  if (element.dataset.reveal === "right") {
    element.classList.add("reveal-right");
  }
});

const revealElements = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}
