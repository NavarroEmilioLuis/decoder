module.exports = {
  isValidGame,
  getCode,
  getCodeProps,
  compareCodes,
  playGame,
};

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

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

async function getInput(size, colors, promptFn) {
  const codeGuess = [];
  console.log('Guess code:');

  while (codeGuess.length < size) {
    const color = await promptFn(`${codeGuess.length + 1} - `);

    // Add color or log error
    if (colors.includes(color)) {
      codeGuess.push(color);
    } else {
      console.log('Invalid code item, please try again');
    }
  }

  return codeGuess;
}

// Main function to start a new game
async function playGame(attempts = ATTEMPTS, size = SIZE, colors = COLORS) {
  // Insert newline and current settings
  console.log('\nStarting game with properties:');
  console.log(`- Possible attempts: ${attempts}`);
  console.log(`- Code size: ${size}`);
  console.log(`- Possible colors: ${colors.join(', ')}`);

  // Validate params
  if (!isValidGame(attempts, size, colors)) {
    console.log('Game is not valid.');
    return 1;
  }

  // Create interface and helper function to read user input
  const readlineInterface = readline.createInterface({ input, output });

  // Avoid callback style for reading lines with a promise
  const promptFn = async question => new Promise(resolve => readlineInterface.question(question, resolve));

  // Get code to break and keep track of game
  let hasWon = false;
  const code = getCode(size, colors);

  // Guess the code within specified number of attempts
  for (let i = 0; i < attempts; i++) {
    console.log(`\nAttempt #${i + 1}`);

    // Get user guess
    readlineInterface.resume();
    const codeGuess = await getInput(size, colors, promptFn);
    readlineInterface.pause();

    // Compare and log results
    const { colorMatches, positionMatches} = compareCodes(code, codeGuess);
    console.log(`You matched ${colorMatches} colors and ${positionMatches} positions`);

    // Code has been guessed
    if (positionMatches === size) {
      console.log(`Cracked the code in ${i + 1} attempts`);
      hasWon = true;
      break;
    }
  }

  // Log results
  if (hasWon) {
    console.log('You won!');
  } else {
    console.log('You lose!');
    console.log(`Code was ${code.join(', ')}`);
  }

  // Game ended
  readlineInterface.close();
  return 0;
}

// Only run if it's called directly
if (require.main === module) {
  playGame();
}
