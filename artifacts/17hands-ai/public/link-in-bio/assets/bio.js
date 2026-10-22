function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn("Link-in-bio preferences are unavailable.", error);
    return null;
  }
}
function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Link-in-bio preference could not be saved.", error);
  }
}

const htmlEl = document.documentElement;
const btnLight = document.getElementById("btn-theme-light");
const btnDark = document.getElementById("btn-theme-dark");

function setTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  btnLight.classList.toggle("active", theme === "light");
  btnDark.classList.toggle("active", theme === "dark");
  btnLight.setAttribute("aria-pressed", String(theme === "light"));
  btnDark.setAttribute("aria-pressed", String(theme === "dark"));
  document.querySelector('meta[name="theme-color"]').content =
    theme === "light" ? "#FAF8FD" : "#13091E";
  savePreference("17hands_bio_theme", theme);
}

btnLight.addEventListener("click", () => setTheme("light"));
btnDark.addEventListener("click", () => setTheme("dark"));

const I18N = {
  en: {
    coming_soon: "Coming soon",
    skip: "Skip to content",
    privacy: "Privacy",
    terms: "Terms",
    hero_eyebrow: "FOUNDER · 17HANDS.AI",
    founder_name: "Anastasia Blodgett",
    founder_role:
      "<strong>UC Berkeley CS</strong> · <strong>Cybersecurity &amp; Practical AI</strong>",
    hero_tagline:
      '“AI systems with a <span class="highlight-rosegold">human touch</span>.”',
    msoc_contact: "Email 17hands",
    links_eyebrow: "LINKS & BOOKING",
    links_title: "Work & Connect",
    link1_eyebrow: "CAL.COM/17HANDS · FREE INTRO CALL",
    link1_title: "Book a Call with Anastasia",
    link2_eyebrow: "17HANDS.AI · SMALL BUSINESSES",
    link2_title: "17hands.ai - Security & Practical AI",
    link3_eyebrow: "17HANDS.AI/FOR-YOU · INDIVIDUALS & FAMILIES",
    link3_title: "Personal & Family Digital Safety",
    family_eyebrow: "17 HANDS ECOSYSTEM",
    family_title: "Community & Projects",
    fam1_badge: "WORKSHOP",
    fam1_name: "Digital Defenders",
    fam2_badge: "COMMUNITY · COMING SOON",
    fam2_name: "Tea & Storytelling",
    fam3_badge: "CREATIVE NIGHTS · COMING SOON",
    fam3_name: "Karaoke & Music",
    footer_credit:
      'Branding by <a href="https://bulachak.com/portfolio/i4i" target="_blank" rel="noopener noreferrer">I4I</a> · a <a href="https://bulachak.com" target="_blank" rel="noopener noreferrer">Bulachak</a> project',
  },
  ru: {
    coming_soon: "Скоро",
    skip: "Перейти к содержимому",
    privacy: "Конфиденциальность",
    terms: "Условия",
    hero_eyebrow: "ОСНОВАТЕЛЬ · 17HANDS.AI",
    founder_name: "Анастасия Блоджетт",
    founder_role:
      "<strong>UC Berkeley CS</strong> · <strong>Кибербезопасность и Практичный ИИ</strong>",
    hero_tagline:
      '«AI-системы с <span class="highlight-rosegold">человеческим теплом</span>».',
    msoc_contact: "Написать в 17hands",
    links_eyebrow: "ССЫЛКИ И ЗАПИСЬ",
    links_title: "Связаться и начать работу",
    link1_eyebrow: "CAL.COM/17HANDS · БЕСПЛАТНЫЙ ЗВОНОК",
    link1_title: "Записаться на звонок с Анастасией",
    link2_eyebrow: "17HANDS.AI · ДЛЯ МАЛОГО БИЗНЕСА",
    link2_title: "17hands.ai - Безопасность и Практичный ИИ",
    link3_eyebrow: "17HANDS.AI/FOR-YOU · ДЛЯ ЛЮДЕЙ И СЕМЕЙ",
    link3_title: "Личная и семейная кибербезопасность",
    family_eyebrow: "ЭКОСИСТЕМА 17 HANDS",
    family_title: "Сообщества и проекты",
    fam1_badge: "ПРАКТИКУМ",
    fam1_name: "Digital Defenders",
    fam2_badge: "СООБЩЕСТВО · СКОРО",
    fam2_name: "Чай и Истории",
    fam3_badge: "ТВОРЧЕСТВО · СКОРО",
    fam3_name: "Караоке и Музыка",
    footer_credit:
      'Брендинг: <a href="https://bulachak.com/portfolio/i4i" target="_blank" rel="noopener noreferrer">I4I</a> · проект <a href="https://bulachak.com" target="_blank" rel="noopener noreferrer">Bulachak</a>',
  },
};

const btnEn = document.getElementById("btn-lang-en");
const btnRu = document.getElementById("btn-lang-ru");

function setLanguage(lang) {
  htmlEl.setAttribute("lang", lang);
  btnEn.classList.toggle("active", lang === "en");
  btnRu.classList.toggle("active", lang === "ru");
  btnEn.setAttribute("aria-pressed", String(lang === "en"));
  btnRu.setAttribute("aria-pressed", String(lang === "ru"));
  const dict = I18N[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });
  savePreference("17hands_bio_lang", lang);
}

btnEn.addEventListener("click", () => setLanguage("en"));
btnRu.addEventListener("click", () => setLanguage("ru"));

const params = new URLSearchParams(window.location.search);
const preferredTheme =
  params.get("theme") || readPreference("17hands_bio_theme");
const preferredLanguage =
  params.get("lang") || readPreference("17hands_bio_lang");
setTheme(preferredTheme === "light" ? "light" : "dark");
setLanguage(preferredLanguage === "ru" ? "ru" : "en");
