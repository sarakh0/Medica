// Function to change language
async function changeLanguage(lang) {
  setLanguagePreference(lang);
  const langData = await fetchLanguageData(lang);
  updateContent(langData);
}

// Function to set the language preference
function setLanguagePreference(lang) {
  localStorage.setItem("language", lang);
  updateSelectedLang(lang);
  location.reload();
}

// Function to fetch language data
async function fetchLanguageData(lang) {
  const response = await fetch(`languages/${lang}.json`);
  return response.json();
}

// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (element.tagName === "INPUT" && key === "placeholder_text") {
      // If the element is an input with placeholder_text attribute, set placeholder
      element.placeholder = langData[key];
    } else {
      // For other elements, set text content
      //element.textContent = langData[key];
      element.innerHTML = langData[key];
    }
  });
}

// Call updateContent() on page load
window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
  updateSelectedLang(userPreferredLanguage);

});


const langLabels = {
  en: "English",
  fr: "Français",
  it: "Italien",
  ar: "العربية"
};

const langFlags = {
  en: "https://flagsapi.com/CA/flat/32.png",
  fr: "https://flagsapi.com/FR/flat/32.png",
  it: "https://flagsapi.com/IT/flat/32.png",
  ar: "https://flagsapi.com/AE/flat/32.png"
};


function updateSelectedLang(lang) {
  // update label
  document.getElementById("selected-lang-label").textContent = langLabels[lang] ?? lang;
  // update flag
  document.getElementById("selected-flag").src = langFlags[lang] ?? langFlags["en"];
  document.getElementById("selected-flag").alt = langLabels[lang] ?? lang;
}

/* appear on click - lang menu */

function toggleElement() {
  var x = document.querySelector(".lang-menu");
  x.classList.toggle("open");
}

document.addEventListener("click", function (event) {
  var menu = document.querySelector(".lang-menu");
  if (!menu.contains(event.target)) {
    menu.classList.remove("open");
  }
});