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

function getMatch(size, colors) {
  const match = [];

  while (match.length !== size) {
    // Get random float, get first decimal as integer, convert to valid index number
    const randomIndex = Math.floor(Math.random() * 10) % colors.length;
    const color = colors[randomIndex];

    if (match.indexOf(color) === -1)
      match.push(color);
  }

  return match;
}

function playGame(attempts = ATTEMPTS, size = SIZE, colors = COLORS) {
  const match = getMatch(size, colors);
  console.log(match);
}

playGame();
