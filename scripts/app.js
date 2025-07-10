// Import astrology systems
import { getWesternAstrology } from './western.js';
import { getChineseZodiac } from './chinese.js';
import { getVedicAstrology } from './vedic.js';
import { getNumerologyStone } from './numerology.js';

// Load gemstone data
let gemstoneMap = {};

fetch("data/gemstones.json")
  .then(response => response.json())
  .then(data => {
    gemstoneMap = data;
    console.log("Gemstones loaded:", gemstoneMap);
  })
  .catch(err => console.error("Could not load gemstones:", err));

// Intention message logic
function getIntentionAdvice(intent) {
  const map = {
    love: "Let your heart guide your path.",
    clarity: "See through illusions with focus.",
    prosperity: "Abundance flows where attention goes.",
    protection: "You are shielded by light and strength."
  };
  return map[intent] || "";
}

// Result renderer
function displayResult(data) {
  const output = document.getElementById("result");
  output.innerHTML = `
    <div class="fortune-card">
      <h2>Hello, ${data.name}!</h2>
      <p><strong>Nakshatra:</strong> ${data.sign}</p>
      ${data.sunSign ? `<p><strong>Sun Sign:</strong> ${data.sunSign}</p>` : ""}
      <p><strong>Lucky Stone:</strong> ${data.stone}</p>
      ${data.intention ? `<p><strong>For ${data.intention}:</strong> ${getIntentionAdvice(data.intention)}</p>` : ""}
      <p class="mantra">"${data.mantra}"</p>
      ${data.image ? `<img src="assets/images/gems/${data.image}" alt="${data.stone}" class="gem-image" />` : ""}
      <button onclick="window.print()" class="print-button">🖨️ Print or Save</button>
    </div>
  `;

  if (data.mantra) {
    const speak = new SpeechSynthesisUtterance(data.mantra);
    speechSynthesis.speak(speak);
  }
}

// Form handler
document.getElementById("astroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value.trim(); // 🆕 Added
  const system = document.getElementById("system").value;
  const intention = document.getElementById("intention").value;

  const loader = document.getElementById("loader");
  if (loader && loader.style) {
    loader.style.display = "none";
  }

  let result = {};

  switch (system) {
    case "western":
      result = getWesternAstrology(name, gemstoneMap);
      break;
    case "vedic":
      result = getVedicAstrology(name, dob, gemstoneMap); // ✅ Pass dob
      break;
    case "numerology":
      result = getNumerologyStone(name, gemstoneMap);
      break;
    case "chinese":
      result = getChineseZodiac(name, gemstoneMap);
      break;
    default:
      result = {
        sign: "Unknown",
        stone: "Mystery Crystal",
        mantra: "Trust the flow."
      };
  }

  displayResult({ ...result, name, intention });
});
