const questionsAndAnswers = [
  {
    question: "How many unique positions are possible in a 3x3x3 Rubik's Cube?",
    options: ["43 quintillion", "1 billion", "100 million", "10 trillion"],
    correctOptionIndex: 0,
  },
  {
    question: "What is the world record for solving a 3x3x3 Rubik's Cube?",
    options: ["3.47 seconds", "4.22 seconds", "5.55 seconds", "6.99 seconds"],
    correctOptionIndex: 0,
  },
  {
    question: "Who invented the Rubik's Cube?",
    options: ["Ernő Rubik", "David Singmaster", "Tomas Rohlik", "Dan Brown"],
    correctOptionIndex: 0,
  },
  {
    question: "In which year was the Rubik's Cube invented?",
    options: ["1974", "1980", "1969", "1990"],
    correctOptionIndex: 0,
  },
  {
    question: "What is the standard color scheme of a Rubik's Cube?",
    options: [
      "Red, Green, Blue, Yellow, White, Orange",
      "Blue, Green, Red, White, Yellow, Black",
      "Yellow, White, Blue, Red, Green, Orange",
      "Green, Blue, Yellow, White, Red, Black",
    ],
    correctOptionIndex: 0,
  },
  {
    question: "Which company manufactures Rubik's Cube?",
    options: ["Rubik's Brand Ltd.", "Hasbro", "Mattel", "Spin Master"],
    correctOptionIndex: 0,
  },
  {
    question: "What is the size of a standard Rubik's Cube?",
    options: ["5.7 cm", "6 cm", "6.5 cm", "7 cm"],
    correctOptionIndex: 1,
  },
  {
    question: "What was the original name of the Rubik's Cube?",
    options: ["Magic Cube", "Puzzle Cube", "Brain Cube", "Color Cube"],
    correctOptionIndex: 0,
  },
  {
    question: "What is the main goal when solving a Rubik's Cube?",
    options: [
      "To arrange colors in a single pattern",
      "To make each side the same color",
      "To solve in the shortest time",
      "To make it look aesthetically pleasing",
    ],
    correctOptionIndex: 1,
  },
  {
    question:
      "How many moves does it typically take to solve a Rubik's Cube using beginner's method?",
    options: ["50 moves", "100 moves", "20 moves", "40 moves"],
    correctOptionIndex: 0,
  },
  {
    question: "Which algorithm is commonly used to solve the Rubik's Cube?",
    options: ["CFOP", "FURU", "XYZ", "L2R"],
    correctOptionIndex: 0,
  },
  {
    question:
      "What is the name of the pattern when the Rubik's Cube is solved, but the colors are in a checkerboard pattern?",
    options: [
      "Checkerboard Pattern",
      "Cross Pattern",
      "Fractal Pattern",
      "Striped Pattern",
    ],
    correctOptionIndex: 0,
  },
  {
    question: "How many smaller cubes make up a standard 3x3x3 Rubik's Cube?",
    options: ["27", "24", "32", "25"],
    correctOptionIndex: 0,
  },
  {
    question:
      "Which of these is NOT a popular method for solving the Rubik's Cube?",
    options: ["CFOP", "Roux", "Petrus", "Delta Method"],
    correctOptionIndex: 3,
  },
  {
    question:
      "Which world record does Feliks Zemdegs hold in Rubik's Cube solving?",
    options: ["3.47 seconds", "5.55 seconds", "6.99 seconds", "4.22 seconds"],
    correctOptionIndex: 0,
  },
  {
    question:
      "What is the term for rotating a Rubik's Cube with one of its faces staying stationary?",
    options: ["Turn", "Twist", "Spin", "Flip"],
    correctOptionIndex: 1,
  },
  {
    question: "How many colors are there on a standard Rubik's Cube?",
    options: ["6", "7", "5", "4"],
    correctOptionIndex: 0,
  },
  {
    question: "Which of these is a Rubik's Cube speedcubing event?",
    options: ["3x3x3", "4x4x4", "2x2x2", "All of the above"],
    correctOptionIndex: 3,
  },
  {
    question:
      "What is the maximum possible number of moves needed to solve a Rubik's Cube from any configuration?",
    options: ["20", "30", "25", "15"],
    correctOptionIndex: 0,
  },
  {
    question: "Who is considered the father of speedcubing?",
    options: [
      "Tomas Rokicki",
      "Feliks Zemdegs",
      "David Singmaster",
      "Ernő Rubik",
    ],
    correctOptionIndex: 1,
  },
  {
    question:
      "Which of these terms refers to a Rubik's Cube move where two opposite sides are turned?",
    options: [
      "180-degree turn",
      "90-degree turn",
      "U-turn",
      "180-degree twist",
    ],
    correctOptionIndex: 0,
  },
  {
    question: "What does 'F2L' stand for in the CFOP method?",
    options: [
      "First Two Layers",
      "Final Two Layers",
      "Front to Left",
      "First to Left",
    ],
    correctOptionIndex: 0,
  },
  {
    question:
      "Which of the following Rubik's Cube variants has 4 squares on each side?",
    options: ["4x4x4", "5x5x5", "2x2x2", "6x6x6"],
    correctOptionIndex: 0,
  },
  {
    question:
      "In what year did the Rubik's Cube become a worldwide phenomenon?",
    options: ["1980", "1990", "1974", "2000"],
    correctOptionIndex: 0,
  },
  {
    question: "What is the fastest method for solving the Rubik's Cube?",
    options: ["CFOP", "Fridrich Method", "Roux Method", "Beginner's Method"],
    correctOptionIndex: 1,
  },
  {
    question: "Which event was the first Rubik's Cube competition held?",
    options: [
      "World Rubik's Cube Championship",
      "US Nationals",
      "Czech Open",
      "Asian Championships",
    ],
    correctOptionIndex: 0,
  },
  {
    question:
      "What is the term for when a Rubik's Cube has no more legal moves?",
    options: ["Cube Lock", "Cube Parity", "Cube Error", "Cube Deadlock"],
    correctOptionIndex: 1,
  },
  {
    question: "Which of the following is a popular Rubik's Cube brand?",
    options: ["Gan", "Rubik's Brand", "MoYu", "All of the above"],
    correctOptionIndex: 3,
  },
  {
    question:
      "What is the name of the algorithm used to solve the last layer of a Rubik's Cube in the CFOP method?",
    options: ["OLL", "PLL", "F2L", "EOL"],
    correctOptionIndex: 0,
  },
  {
    question: "Which is the fastest 3x3x3 Rubik's Cube world record?",
    options: ["3.47 seconds", "4.22 seconds", "5.55 seconds", "6.99 seconds"],
    correctOptionIndex: 0,
  },
  {
    question:
      "Which of these is the fastest solving method used by top speedcubers?",
    options: ["CFOP", "Beginner's Method", "Petrus", "Roux"],
    correctOptionIndex: 0,
  },
  {
    question: "What does 'PLL' stand for in Rubik's Cube solving?",
    options: [
      "Permutation of the Last Layer",
      "Position of the Last Layer",
      "Parallel of the Last Layer",
      "Place the Last Layer",
    ],
    correctOptionIndex: 0,
  },
  {
    question: "Which Rubik's Cube variant has 2 squares per side?",
    options: ["2x2x2", "4x4x4", "3x3x3", "6x6x6"],
    correctOptionIndex: 0,
  },
  {
    question: "What is the name of the 5x5x5 Rubik's Cube solving method?",
    options: [
      "Big Cube Method",
      "Reduction Method",
      "Fridrich Method",
      "Beginner's Method",
    ],
    correctOptionIndex: 1,
  },
  {
    question:
      "Which color is located directly opposite the white side on a standard Rubik's Cube?",
    options: ["Yellow", "Blue", "Red", "Green"],
    correctOptionIndex: 0,
  },
  {
    question: "How long is a typical speedcubing competition?",
    options: ["1-3 days", "1 week", "3-5 hours", "2 hours"],
    correctOptionIndex: 0,
  },
  {
    question: "Which Rubik's Cube variant has 6 squares per side?",
    options: ["6x6x6", "5x5x5", "4x4x4", "3x3x3"],
    correctOptionIndex: 0,
  },
  {
    question:
      "Which of the following is a technique used to manipulate a Rubik's Cube?",
    options: [
      "Finger tricks",
      "Twist moves",
      "Rotate moves",
      "Spinning tricks",
    ],
    correctOptionIndex: 0,
  },
  {
    question: "Who holds the current Rubik's Cube 3x3 world record?",
    options: ["Yusheng Du", "Feliks Zemdegs", "Max Park", "Seung-Jo Kim"],
    correctOptionIndex: 0,
  },
  {
    question: "Which is the most difficult Rubik's Cube variant to solve?",
    options: ["17x17x17", "9x9x9", "5x5x5", "4x4x4"],
    correctOptionIndex: 0,
  },
  {
    question: "Which country has the most Rubik's Cube world champions?",
    options: ["China", "United States", "Australia", "Germany"],
    correctOptionIndex: 0,
  },
  {
    question: "How many different types of moves are there in the CFOP method?",
    options: ["4", "6", "3", "5"],
    correctOptionIndex: 0,
  },
  {
    question: "Which Rubik's Cube variant is also called the 'pyraminx'?",
    options: ["Pyraminx", "Skewb", "Megaminx", "Gear Cube"],
    correctOptionIndex: 0,
  },
  {
    question:
      "How many different colored stickers are on a standard Rubik's Cube?",
    options: ["6", "8", "4", "10"],
    correctOptionIndex: 0,
  },
  {
    question: "What is the first step in solving a Rubik's Cube?",
    options: [
      "Make a white cross",
      "Solve the last layer",
      "Solve F2L",
      "Position edges",
    ],
    correctOptionIndex: 0,
  },
  {
    question: "Who developed the Fridrich Method for solving the Rubik's Cube?",
    options: [
      "Jessica Fridrich",
      "Dan Brown",
      "David Singmaster",
      "Ernő Rubik",
    ],
    correctOptionIndex: 0,
  },
  {
    question:
      "What year was the Rubik's Cube inducted into the Toy Hall of Fame?",
    options: ["2004", "2011", "1999", "2009"],
    correctOptionIndex: 0,
  },
  {
    question:
      "What is the name of the pattern where all 6 sides are identical?",
    options: ["Solved Cube", "Super Cube", "Complete Cube", "Mini Cube"],
    correctOptionIndex: 0,
  },
];

export default questionsAndAnswers;
