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
    skip: "Skip to content",
    privacy: "Privacy",
    terms: "Terms",
    hero_eyebrow: "FOUNDER · 17HANDS.AI",
    founder_name: "Anastasia Blodgett",
    founder_role:
      "<strong>UC Berkeley CS</strong> · <strong>Cybersecurity &amp; Practical AI</strong>",
    hero_tagline:
      '“AI systems with a <span class="highlight-rosegold">human touch</span>.”',
    msoc_contact: "Email Anastasia",
    save_hint:
      "This app's browser can't save contacts. Tap <strong>···</strong> at the top, choose <strong>Open in browser</strong>, then tap Save contact again.",
    msoc_save: "Save contact to phone",
    offers_eyebrow: "FOR YOUR BUSINESS",
    offers_title: "Get found. Get booked.",
    offer_audit_eyebrow: "FREE · RESULTS NEXT BUSINESS DAY",
    offer_audit_title: "Get a free SEO, AEO & speed audit",
    offer_audit_desc:
      "Email me your website link. You get a plain-English audit of how Google and AI assistants see your site, and what slows it down.",
    offer_site_eyebrow: "CUSTOM WEBSITE · SEO · AEO · FAST",
    offer_site_title: "A custom branded website that ranks",
    offer_site_desc:
      "Built for search and AI assistants, with top performance scores. No templates.",
    offer_bio_eyebrow: "NOT A LINKTREE · YOUR BRAND",
    offer_bio_title: "Want a link-in-bio page like this one?",
    offer_bio_desc:
      "Your own design, your own domain, and a page that turns followers into clients.",
    offer_ai_eyebrow: "AI AUTOMATION · CONSULTATION",
    offer_ai_title: "Happy with your website, but buried in busywork?",
    offer_ai_desc:
      "Book a call and we'll find where AI automation can take repetitive work off your plate and speed up your business.",
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
    skip: "Перейти к содержимому",
    privacy: "Конфиденциальность",
    terms: "Условия",
    hero_eyebrow: "ОСНОВАТЕЛЬ · 17HANDS.AI",
    founder_name: "Анастасия Блоджетт",
    founder_role:
      "<strong>UC Berkeley CS</strong> · <strong>Кибербезопасность и Практичный ИИ</strong>",
    hero_tagline:
      '«AI-системы с <span class="highlight-rosegold">человеческим теплом</span>».',
    msoc_contact: "Написать Анастасии",
    save_hint:
      "Браузер этого приложения не умеет сохранять контакты. Нажмите <strong>···</strong> вверху, выберите <strong>Открыть в браузере</strong> и снова нажмите «Сохранить контакт».",
    msoc_save: "Сохранить контакт",
    offers_eyebrow: "ДЛЯ ВАШЕГО БИЗНЕСА",
    offers_title: "Вас находят. Вам пишут.",
    offer_audit_eyebrow: "БЕСПЛАТНО · ОТВЕТ НА СЛЕДУЮЩИЙ РАБОЧИЙ ДЕНЬ",
    offer_audit_title: "Бесплатный аудит SEO, AEO и скорости",
    offer_audit_desc:
      "Пришлите ссылку на ваш сайт. Вы получите понятный разбор: как ваш сайт видят Google и AI-ассистенты и что его замедляет.",
    offer_site_eyebrow: "САЙТ ПОД КЛЮЧ · SEO · AEO · СКОРОСТЬ",
    offer_site_title: "Фирменный сайт, который находят",
    offer_site_desc:
      "Создан для поиска и AI-ассистентов, с высокой скоростью загрузки. Без шаблонов.",
    offer_bio_eyebrow: "НЕ LINKTREE · ВАШ БРЕНД",
    offer_bio_title: "Хотите такую же страницу для ссылок?",
    offer_bio_desc:
      "Ваш дизайн, ваш домен и страница, которая превращает подписчиков в клиентов.",
    offer_ai_eyebrow: "AI-АВТОМАТИЗАЦИЯ · КОНСУЛЬТАЦИЯ",
    offer_ai_title: "Сайт устраивает, но рутина отнимает время?",
    offer_ai_desc:
      "Запишитесь на звонок: найдём, где AI-автоматизация снимет с вас рутину и ускорит работу бизнеса.",
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

/**
 * Lead events. Each tap is classified by its destination, so new links are
 * counted without extra markup. Events go to whichever analytics script the
 * page loads (Umami or Plausible); with none loaded this is a no-op.
 */
function leadEvent(href) {
  if (href.startsWith("mailto:") && /audit/i.test(href)) return "audit-request";
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "call";
  if (href.startsWith("sms:")) return "text";
  if (href.endsWith(".vcf")) return "save-contact";
  if (/cal\.com|calendly\.com/.test(href)) return "booking";
  return "link";
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  const name = leadEvent(href);
  const data = { href };
  if (window.umami) window.umami.track(name, data);
  else if (window.plausible) window.plausible(name, { props: data });
});

/**
 * Save contact. In Safari and Chrome a tap on the .vcf link (served as
 * text/vcard, inline, with no filename so Safari does not treat it as a
 * download) opens the phone's own Add Contact sheet.
 *
 * Instagram, Facebook, TikTok and similar in-app browsers either ignore the
 * card or offer it as a file download. There we reopen this page, not the
 * card, in the system browser (x-safari-https on iOS, a Chrome intent on
 * Android) with #save-contact. The page then opens the card from inside the
 * real browser, which is the same path as a normal tap and shows the sheet.
 * If the page is still in front a moment later, the hand-off failed and we
 * show how to open the page in the real browser instead.
 */
const UA = navigator.userAgent;
const IN_APP_BROWSER =
  /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Messenger|TikTok|musical_ly|BytedanceWebview|Snapchat|LinkedInApp|Threads|Line\//i.test(
    UA,
  );
const IS_IOS =
  /iPhone|iPad|iPod/.test(UA) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const IS_ANDROID = /Android/i.test(UA);
const SAVE_HASH = "#save-contact";

function showSaveHint() {
  const hint = document.getElementById("save-contact-hint");
  if (!hint) return;
  hint.hidden = false;
  hint.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function openInSystemBrowser(url) {
  if (IS_IOS) {
    window.location.href = url.replace(/^https?:/, "x-safari-https:");
  } else if (IS_ANDROID) {
    window.location.href =
      "intent://" +
      url.replace(/^https?:\/\//, "") +
      "#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=" +
      encodeURIComponent(url) +
      ";end";
  } else {
    showSaveHint();
    return;
  }
  setTimeout(() => {
    if (document.visibilityState === "visible") showSaveHint();
  }, 1600);
}

if (IN_APP_BROWSER) {
  document.addEventListener("click", (event) => {
    if (!event.target.closest('a[href$=".vcf"]')) return;
    event.preventDefault();
    const page = new URL(window.location.href);
    page.hash = SAVE_HASH;
    openInSystemBrowser(page.href);
  });
} else if (window.location.hash === SAVE_HASH) {
  // Arrived from an in-app browser hand-off: open the card here.
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search,
  );
  const card = document.querySelector('a[href$=".vcf"]');
  if (card) window.location.assign(card.href);
}
