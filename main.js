// 1:25 PC clock

// Game default parameters
const ATTEMPTS = 12;
const SIZE = 4;
const COLORS = [
  'Blue',
  'Green',
  'Yellow',
  'Red',
  'Purple',
  'Brown',
  'Orange',
  'Pink',
  'White',
  'Black',
];

function getCombination(size, colors) {
  const combination = [];

  while (combination.length !== size) {
    // Get random float, get first decimal as integer, convert to valid index number
    const randomIndex = Math.floor(Math.random() * 10) % colors.length;
    const color = colors[randomIndex];

    if (combination.indexOf(color) === -1)
      combination.push(color);
  }

  return combination;
}

function playGame(attempts = ATTEMPTS, size = SIZE, colors = COLORS) {
  const combination = getCombination(size, colors);
  console.log(combination);
}

playGame();
