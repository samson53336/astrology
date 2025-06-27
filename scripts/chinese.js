export function getChineseZodiac(name, gemstoneMap = {}) {
  const yearInput = document.getElementById("birthYear")?.value || "2000";
  const year = parseInt(yearInput, 10);

  if (!year || isNaN(year)) {
    return {
      sign: "Unknown",
      stone: "Nephrite Jade",
      mantra: "Your spirit defies time.",
      image: "nephrite_jade.jpg"
    };
  }

  const animals = [
    "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
    "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
  ];

  const index = (year - 1900) % 12;
  const sign = animals[index];

  const data = gemstoneMap[sign] || {
    stone: "Nephrite Jade",
    mantra: "Timeless resilience.",
    image: "nephrite_jade.jpg"
  };

  return {
    sign,
    stone: data.stone,
    mantra: data.mantra,
    image: data.image || ""
  };
}