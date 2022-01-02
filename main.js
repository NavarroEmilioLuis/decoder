module.exports = {
  isValidGame,
  getCombination,
  getCombinationProps,
  compareCombinations,
  playGame,
};

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

function isValidGame(attempts, size, colors) {
  return true;
}

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

function getCombinationProps(combination) {
  const props = {};

  combination.forEach(color => {
    if (props[color])
      props[color]++;
    else
      props[color] = 1;
  });

  return props;
}

function compareCombinations(a, b) {
  const propsA = getCombinationProps(a);
  const propsB = getCombinationProps(b);

  let colorMatches = 0;
  let positionMatches = 0;

  // Check color matches
  Object.entries(propsA).forEach(([color, amount]) => {
    if (propsB[color]) {
      colorMatches += Math.min(amount, propsB[color]);
    }
  });

  // Check positional matches
  for (let i = 0; i < a.length; i++) {
    const colorA = a[i];
    const colorB = b[i];

    if (colorA === colorB)
      positionMatches++;
  }

  return { colorMatches, positionMatches };
}

function playGame(attempts = ATTEMPTS, size = SIZE, colors = COLORS) {

  if (!isValidGame(attempts, size, colors))
    return 1;

  const combinationOne = getCombination(size, colors);
  const combinationTwo = getCombination(size, colors);

  const comparison = compareCombinations(combinationOne, combinationTwo);
  console.log(combinationOne);
  console.log(combinationTwo);
  console.log(comparison);
}

// Only run if it's called directly
if (require.main === module) {
  playGame();
}
