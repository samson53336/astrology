export function getVedicAstrology(name, dob, gemstoneMap = {}) {
  const firstLetter = name.trim().charAt(0).toUpperCase();

  const nakshatraMap = {
    A: "Ashwini", B: "Bharani", C: "Krittika", D: "Rohini",
    E: "Mrigashira", F: "Ardra", G: "Punarvasu", H: "Pushya",
    I: "Ashlesha", J: "Magha", K: "Purva Phalguni", L: "Uttara Phalguni",
    M: "Hasta", N: "Chitra", O: "Swati", P: "Vishakha",
    Q: "Anuradha", R: "Jyeshtha", S: "Mula", T: "Purva Ashadha",
    U: "Uttara Ashadha", V: "Shravana", W: "Dhanishta", X: "Shatabhisha",
    Y: "Purva Bhadrapada", Z: "Uttara Bhadrapada"
  };

  const nakshatra = nakshatraMap[firstLetter] || "Revati";

  const vedicGemMap = {
    "Ashwini": { stone: "Gomed", mantra: "Act with divine speed.", image: "gomed.jpg" },
    "Bharani": { stone: "Red Coral", mantra: "Transform with courage.", image: "red_coral.jpg" },
    "Krittika": { stone: "Ruby", mantra: "Burn bright with purpose.", image: "ruby.jpg" },
    "Rohini": { stone: "Pearl", mantra: "Nurture beauty and grace.", image: "pearl.jpg" },
    "Mrigashira": { stone: "Moonstone", mantra: "Seek with curiosity.", image: "moonstone.jpg" },
    "Revati": { stone: "Cat’s Eye", mantra: "Complete your journey with wisdom.", image: "cats_eye.jpg" }
  };

  const data = vedicGemMap[nakshatra] || {
    stone: "Clear Quartz",
    mantra: "You are guided by light.",
    image: "clear_quartz.jpg"
  };

  // Sun sign logic
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

  const sunSign = getSunSignFromDOB(dob || "01/01/2000");

  // Simple planetary positions
  const planets = [
    { name: "Sun", degree: 106 },
    { name: "Moon", degree: 225 },
    { name: "Mars", degree: 355 },
    { name: "Mercury", degree: 88 },
    { name: "Jupiter", degree: 60 },
    { name: "Venus", degree: 143 },
    { name: "Saturn", degree: 297 },
    { name: "Rahu", degree: 128 },
    { name: "Ketu", degree: 308 }
  ];

  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const houseSigns = [...zodiacSigns]; // Aries rising

  const chart = planets.map(p => {
    const signIndex = Math.floor(p.degree / 30);
    const sign = zodiacSigns[signIndex];
    const degree = p.degree % 30;
    const houseIndex = houseSigns.indexOf(sign);
    const house = houseIndex >= 0 ? houseIndex + 1 : "-";

    return {
      planet: p.name,
      degree,
      sign,
      house
    };
  });

  // Additional gemstone recommendations
  const gemMap = {
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

  const maleficHouses = [6, 8, 12];
  const recommendations = chart
    .filter(p => maleficHouses.includes(p.house))
    .map(p => ({
      planet: p.name,
      gem: gemMap[p.name],
      note: `Keep ${gemMap[p.name]} in your home to balance the energy of ${p.name} in house ${p.house}.`
    }));

  return {
    sign: nakshatra,
    sunSign,
    stone: data.stone,
    mantra: data.mantra,
    image: data.image,
    chart,
    recommendations // ✅ For gemstone suggestions
  };
}
