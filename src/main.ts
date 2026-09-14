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
