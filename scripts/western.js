export function getWesternAstrology(name, gemstoneMap) {
  const firstLetter = name.trim().charAt(0).toUpperCase();

  const nameToSign = {
    A: "Aries", B: "Taurus", C: "Gemini", D: "Cancer", E: "Leo", F: "Virgo",
    G: "Libra", H: "Scorpio", I: "Sagittarius", J: "Capricorn", K: "Aquarius", L: "Pisces",
    M: "Aries", N: "Taurus", O: "Gemini", P: "Cancer", Q: "Leo", R: "Virgo",
    S: "Libra", T: "Scorpio", U: "Sagittarius", V: "Capricorn", W: "Aquarius", X: "Pisces",
    Y: "Aries", Z: "Taurus"
  };

  const sign = nameToSign[firstLetter] || "Pisces";
  const data = gemstoneMap[sign] || { stone: "Mystic Quartz", mantra: "Trust the unknown." };

  return {
    sign,
    stone: data.stone,
    mantra: data.mantra,
    image: data.image || ""
  };
}
