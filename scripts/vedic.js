export function getVedicAstrology(name, gemstoneMap = {}) {
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

  const data = vedicGemMap[nakshatra] || { stone: "Clear Quartz", mantra: "You are guided by light.", image: "clear_quartz.jpg" };

  return {
    sign: nakshatra,
    stone: data.stone,
    mantra: data.mantra,
    image: data.image
  };
}
