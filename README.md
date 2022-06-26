# DECODER

Decoder is a 1 player game based on the 'mastermind' board game, recreated in JS as a CLI program.

## Requirements

- Node.js version 12 and above.

## How to run the game

Run `node main.js` inside the directory.

## How to play

The goal of the game is to guess the code within a specified number of attempts. A code is a sequence of elements that needs to be cracked.

In this version, the default match gives the player 12 attempts to crack the code. The code will contain 4 colors from a list of 10 colors.

When you run the game, a match will be created and you'll be prompted to type in a combination (one color at a time) to guess.

After that, you'll get information about how many colors were matched and how many were on the right position.

## Default rules

- Attempts to crack the code: 12
- Code size: 4
- Colors: 10 (see list below)
- Code can contain duplicate colors: true
- Code can contain blanks: false

### Colors

- Blue
- Green
- Yellow
- Red
- Purple
- Brown
- Orange
- Pink
- White
- Black
