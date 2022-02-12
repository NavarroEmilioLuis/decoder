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

/*
  Validates all 3 params used to create a game
  are valid.

  attempts: int
  size: int
  colors: Array<string>

  Return value: boolean
*/
function isValidGame(attempts, size, colors) {
  return true;
}

/*
  Returns a random combination with specified size,
  containing only specified colors. Colors may repeat.

  size: int
  colors: Array<string>

  Return value: Array<string>
*/
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

/*
  Helper function for compareCombinations.
  Returns properties of the colors contained
  inside a combination. The shape of the properties
  are the colors as keys and the number of appearances 
  as values.

  combination: Array<string>

  Return value: Object {}
*/
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

/*
  Returns the result of comparing two
  combinations (a, b). Includes the number of
  color matches and the number of
  position matches.

  a, b: Array<string>

  Return value: Object {}
*/
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

// Main function to start a new game
function playGame(attempts = ATTEMPTS, size = SIZE, colors = COLORS) {

  // Validate params
  if (!isValidGame(attempts, size, colors)) {
    console.log('Game is not valid.');
    return 1;
  }

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
