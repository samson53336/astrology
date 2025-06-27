function calculateLifePathNumber(name) {
  const numberMap = {
    A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
    J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
    S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
  };

  const letters = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
  const digits = letters.map(c => numberMap[c] || 0);
  let total = digits.reduce((sum, n) => sum + n, 0);

  const masterNumbers = [11, 22, 33];
  while (total > 9 && !masterNumbers.includes(total)) {
    total = total.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }

  return total;
}

export function getNumerologyStone(name, gemstoneMap = {}) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return {
      sign: "Unknown",
      stone: "Clear Quartz",
      mantra: "Your energy awaits your name.",
      image: "clear_quartz.jpg"
    };
  }

  const pathNumber = calculateLifePathNumber(name);
  const key = `Path ${pathNumber}`;

  const data = gemstoneMap[key] || {
    sign: `Path ${pathNumber}`,
    stone: "Clear Quartz",
    mantra: "Infinite paths unfold before you.",
    image: "clear_quartz.jpg"
  };

  return {
    sign: data.sign || key,
    stone: data.stone,
    mantra: data.mantra,
    image: data.image || ""
  };
}
