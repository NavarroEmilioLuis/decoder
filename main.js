module.exports = {
  isValidGame,
  getCode,
  getCodeProps,
  compareCodes,
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

  attempts: int (1 to Infinity)
  size: int (1 to 16)
  colors: Array<string>

  Return value: boolean
*/
function isValidGame(attempts, size, colors) {
  // Early bail if conditions aren't met
  // Ensure attempts is a number from 1 to Infinity
  if (typeof attempts !== 'number' || attempts < 1)
    return false;

  // Ensure size is a number from 1 to 16
  if (!Number.isFinite(size) || size < 1 || size > 16)
    return false;

  // Ensure colors is an array with length
  if (!Array.isArray(colors) || colors.length === 0)
    return false;
  
  // Ensure all colors are strings
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];

    if (typeof color !== 'string')
      return false;
  }

  // All arguments are valid
  return true;
}

/*
  Returns a random code with specified size,
  containing only specified colors. Colors may repeat.

  size: int
  colors: Array<string>
  canRepeat: boolean

  Return value: Array<string>
*/
function getCode(size, colors, canRepeat = true) {
  const code = [];

  while (code.length !== size) {
    // Get random float, get first decimal as integer, convert to valid index number
    const randomIndex = Math.floor(Math.random() * 10) % colors.length;
    const color = colors[randomIndex];

    if (canRepeat)
      code.push(color);
    // Don't allow duplicates
    else if (code.indexOf(color) === -1)
      code.push(color);
  }

  return code;
}

/*
  Helper function for compareCodes.
  Returns properties of the colors contained
  inside a code. The shape of the properties
  are the colors as keys and the number of appearances 
  as values.

  code: Array<string>

  Return value: Object {}
*/
function getCodeProps(code) {
  const props = {};

  code.forEach(color => {
    if (props[color])
      props[color]++;
    else
      props[color] = 1;
  });

  return props;
}

/*
  Returns the result of comparing two
  codes (a, b). Includes the number of
  color matches and the number of
  position matches.

  a, b: Array<string>

  Return value: Object {}
*/
function compareCodes(a, b) {
  const propsA = getCodeProps(a);
  const propsB = getCodeProps(b);

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

  const codeOne = getCode(size, colors);
  const codeTwo = getCode(size, colors);

  const comparison = compareCodes(codeOne, codeTwo);
  console.log(codeOne);
  console.log(codeTwo);
  console.log(comparison);
}

// Only run if it's called directly
if (require.main === module) {
  playGame();
}
