// Enhanced Vedic Astrology Module with Full Nakshatra Stone Mapping

export function getVedicAstrology(name, dob, gemstoneMap = {}) {
  const firstLetter = name.trim().charAt(0).toUpperCase();

  // Full Nakshatra Map by first letter
  const nakshatraMap = {
    A: "Ashwini", B: "Bharani", C: "Krittika", D: "Rohini", E: "Mrigashira",
    F: "Ardra", G: "Punarvasu", H: "Pushya", I: "Ashlesha", J: "Magha",
    K: "Purva Phalguni", L: "Uttara Phalguni", M: "Hasta", N: "Chitra", O: "Swati",
    P: "Vishakha", Q: "Anuradha", R: "Jyeshtha", S: "Mula", T: "Purva Ashadha",
    U: "Uttara Ashadha", V: "Shravana", W: "Dhanishta", X: "Shatabhisha",
    Y: "Purva Bhadrapada", Z: "Uttara Bhadrapada"
  };

  const rulingPlanetMap = {
    "Ashwini": "Ketu", "Bharani": "Venus", "Krittika": "Sun", "Rohini": "Moon",
    "Mrigashira": "Mars", "Ardra": "Rahu", "Punarvasu": "Jupiter", "Pushya": "Saturn",
    "Ashlesha": "Mercury", "Magha": "Ketu", "Purva Phalguni": "Venus", "Uttara Phalguni": "Sun",
    "Hasta": "Moon", "Chitra": "Mars", "Swati": "Rahu", "Vishakha": "Jupiter",
    "Anuradha": "Saturn", "Jyeshtha": "Mercury", "Mula": "Ketu", "Purva Ashadha": "Venus",
    "Uttara Ashadha": "Sun", "Shravana": "Moon", "Dhanishta": "Mars", "Shatabhisha": "Rahu",
    "Purva Bhadrapada": "Jupiter", "Uttara Bhadrapada": "Saturn", "Revati": "Mercury"
  };

  const gemstoneByPlanet = {
    Sun: "Ruby",
    Moon: "Pearl",
    Mars: "Red Coral",
    Mercury: "Emerald",
    Jupiter: "Yellow Sapphire",
    Venus: "Diamond",
    Saturn: "Blue Sapphire",
    Rahu: "Hessonite (Gomed)",
    Ketu: "Cat’s Eye"
  };

  const nakshatra = nakshatraMap[firstLetter] || "Revati";
  const rulingPlanet = rulingPlanetMap[nakshatra];
  const nakshatraStone = gemstoneByPlanet[rulingPlanet] || "Clear Quartz";

  const vedicGemMap = {
    "Ashwini": { mantra: "Act with divine speed.", image: "cats_eye.jpg" },
    "Bharani": { mantra: "Transform with courage.", image: "diamond.jpg" },
    "Krittika": { mantra: "Burn bright with purpose.", image: "ruby.jpg" },
    "Rohini": { mantra: "Nurture beauty and grace.", image: "pearl.jpg" },
    "Mrigashira": { mantra: "Seek with curiosity.", image: "red_coral.jpg" },
    "Ardra": { mantra: "Awaken inner power.", image: "gomed.jpg" },
    "Punarvasu": { mantra: "Return to your truth.", image: "yellow_sapphire.jpg" },
    "Pushya": { mantra: "Support with discipline.", image: "blue_sapphire.jpg" },
    "Ashlesha": { mantra: "Master your mind.", image: "emerald.jpg" },
    "Magha": { mantra: "Lead with legacy.", image: "cats_eye.jpg" },
    "Purva Phalguni": { mantra: "Express love creatively.", image: "diamond.jpg" },
    "Uttara Phalguni": { mantra: "Shine with service.", image: "ruby.jpg" },
    "Hasta": { mantra: "Work with skill and grace.", image: "pearl.jpg" },
    "Chitra": { mantra: "Design your destiny.", image: "red_coral.jpg" },
    "Swati": { mantra: "Embrace independence.", image: "gomed.jpg" },
    "Vishakha": { mantra: "Conquer with focus.", image: "yellow_sapphire.jpg" },
    "Anuradha": { mantra: "Commit with devotion.", image: "blue_sapphire.jpg" },
    "Jyeshtha": { mantra: "Lead through wisdom.", image: "emerald.jpg" },
    "Mula": { mantra: "Uproot the false.", image: "cats_eye.jpg" },
    "Purva Ashadha": { mantra: "Win with confidence.", image: "diamond.jpg" },
    "Uttara Ashadha": { mantra: "Achieve with honor.", image: "ruby.jpg" },
    "Shravana": { mantra: "Listen for truth.", image: "pearl.jpg" },
    "Dhanishta": { mantra: "Celebrate your rhythm.", image: "red_coral.jpg" },
    "Shatabhisha": { mantra: "Heal with detachment.", image: "gomed.jpg" },
    "Purva Bhadrapada": { mantra: "Unveil mystery.", image: "yellow_sapphire.jpg" },
    "Uttara Bhadrapada": { mantra: "Stand strong with patience.", image: "blue_sapphire.jpg" },
    "Revati": { mantra: "Complete your journey with wisdom.", image: "emerald.jpg" }
  };

  const defaultMantra = "You are guided by light.";
  const gemData = vedicGemMap[nakshatra] || {};

  const result = {
    sign: nakshatra,
    stone: nakshatraStone,
    rulingPlanet: rulingPlanet,
    mantra: gemData.mantra || defaultMantra,
    image: gemData.image || "clear_quartz.jpg"
  };

  const sunSign = getSunSignFromDOB(dob || "01/01/2000");
  result.sunSign = sunSign;

  const chart = dob ? generateDummyChart(dob) : [];
  const recommendations = suggestGemstonesFromChart(chart, gemstoneMap);
  if (chart.length) result.chart = chart;
  if (recommendations.length) result.recommendations = recommendations;

  return result;
}

function generateDummyChart(dob) {
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  const houseSigns = [...zodiacSigns];

  return planets.map((p, i) => {
    const deg = Math.floor(Math.random() * 360);
    const signIndex = Math.floor(deg / 30);
    const sign = zodiacSigns[signIndex];
    const degree = deg % 30;
    const house = houseSigns.indexOf(sign) + 1;
    return {
      planet: p,
      degree,
      sign,
      house
    };
  });
}

function suggestGemstonesFromChart(chart, gemstoneMap) {
  const criticalHouses = [6, 8, 12];
  const malefics = ["Saturn", "Rahu", "Ketu", "Mars"];
  const gemstoneByPlanet = {
    Sun: "Ruby", Moon: "Pearl", Mars: "Red Coral", Mercury: "Emerald",
    Jupiter: "Yellow Sapphire", Venus: "Diamond", Saturn: "Blue Sapphire",
    Rahu: "Hessonite (Gomed)", Ketu: "Cat’s Eye"
  };

  return chart
    .filter(p => criticalHouses.includes(p.house) && malefics.includes(p.planet))
    .map(p => {
      const gem = gemstoneMap[p.planet] || gemstoneByPlanet[p.planet] || "Remedy Stone";
      return {
        planet: p.planet,
        gem,
        note: `Recommended for ${p.planet} in House ${p.house}`
      };
    });
}

function getSunSignFromDOB(dobString) {
  const [dd, mm] = dobString.split("/").map(Number);
  const day = dd, month = mm;

  const sunSigns = [
    { sign: "Capricorn", from: [12, 22], to: [1, 19] },
    { sign: "Aquarius", from: [1, 20], to: [2, 18] },
    { sign: "Pisces", from: [2, 19], to: [3, 20] },
    { sign: "Aries", from: [3, 21], to: [4, 19] },
    { sign: "Taurus", from: [4, 20], to: [5, 20] },
    { sign: "Gemini", from: [5, 21], to: [6, 20] },
    { sign: "Cancer", from: [6, 21], to: [7, 22] },
    { sign: "Leo", from: [7, 23], to: [8, 22] },
    { sign: "Virgo", from: [8, 23], to: [9, 22] },
    { sign: "Libra", from: [9, 23], to: [10, 22] },
    { sign: "Scorpio", from: [10, 23], to: [11, 21] },
    { sign: "Sagittarius", from: [11, 22], to: [12, 21] }
  ];

  for (const { sign, from, to } of sunSigns) {
    const [fromMonth, fromDay] = from;
    const [toMonth, toDay] = to;

    if ((month === fromMonth && day >= fromDay) || (month === toMonth && day <= toDay)) {
      return sign;
    }
  }

  return "Capricorn";
}
