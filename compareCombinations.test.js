const { compareCombinations } = require('./main');

console.log('Test compareCombinations function');
const testCases = [
  // Correctly handles color and position matches 0-2
  {
    a: ['Red', 'Blue', 'Green', 'Yellow'],
    b: ['Red', 'Blue', 'Green', 'Yellow'],
    expected: { colorMatches: 4, positionMatches: 4 },
  },
  {
    a: ['Red', 'Blue', 'Green', 'Yellow'],
    b: ['Blue', 'Green', 'Yellow', 'Red'],
    expected: { colorMatches: 4, positionMatches: 0 },
  },
  {
    a: ['Red', 'Blue', 'Green', 'Yellow'],
    b: ['Purple', 'Black', 'White', 'Pink'],
    expected: { colorMatches: 0, positionMatches: 0 },
  },
  // Handles duplicates 3-4
  {
    a: ['Red', 'Red', 'Green', 'Yellow'],
    b: ['Red', 'Blue', 'Green', 'Yellow'],
    expected: { colorMatches: 3, positionMatches: 3 },
  },
  {
    a: ['Red', 'Blue', 'Green', 'Yellow'],
    b: ['Red', 'Red', 'Green', 'Yellow'],
    expected: { colorMatches: 3, positionMatches: 3 },
  },
  // Handles various combination sizes 5-6
  {
    a: ['Red', 'Blue', 'Green', 'Yellow', 'Pink'],
    b: ['Blue', 'Red', 'Green', 'Yellow', 'Purple'],
    expected: { colorMatches: 4, positionMatches: 2 },
  },
  {
    a: ['Red', 'Yellow', 'Green'],
    b: ['Blue', 'Red', 'Green'],
    expected: { colorMatches: 2, positionMatches: 1 },
  },
];

testCases.forEach(({ a, b, expected }, i) => {
  const result = compareCombinations(a, b);
  const colorErrorMsg = `Test case ${i} color match failed.`;
  const positionErrorMsg = `Test case ${i} position match failed.`;
  console.assert(result.colorMatches === expected.colorMatches, colorErrorMsg);
  console.assert(result.positionMatches === expected.positionMatches, positionErrorMsg);
});
