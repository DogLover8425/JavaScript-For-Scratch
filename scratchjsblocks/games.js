window.sjs_games = [
  Block(BlockType.BUTTON, "gamesCategory", "Games"),
  Block(BlockType.REPORTER, "rollDice", "roll [sides] sided dice", {
    sides: ArgumentWithMenu("number", "6", "diceSidesMenu"),
  }, ({ sides }) => {
    return Math.floor(Math.random() * parseInt(sides)) + 1;
  }),
  
  Block(BlockType.REPORTER, "randomChoice", "random choice from [choices]", {
    choices: Argument("string", '["rock","paper","scissors"]'),
  }, ({ choices }) => {
    try {
      const array = JSON.parse(choices);
      if (Array.isArray(array) && array.length > 0) {
        return array[Math.floor(Math.random() * array.length)];
      }
      return "";
    } catch (e) {
      return "";
    }
  }),
  
  Block(BlockType.REPORTER, "shuffleArray", "shuffle [array]", {
    array: Argument("string", '["A","B","C","D"]'),
  }, ({ array }) => {
    try {
      const arr = JSON.parse(array);
      if (!Array.isArray(arr)) return "[]";
      
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return JSON.stringify(shuffled);
    } catch (e) {
      return "[]";
    }
  }),
  
  Block(BlockType.REPORTER, "dealCards", "deal [count] cards from [deck]", {
    count: Argument("number", 5),
    deck: Argument("string", '["A♠","K♠","Q♠","J♠","10♠"]'),
  }, ({ count, deck }) => {
    try {
      const cards = JSON.parse(deck);
      if (!Array.isArray(cards)) return "[]";
      
      const shuffled = [...cards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      const dealt = shuffled.slice(0, parseInt(count));
      return JSON.stringify(dealt);
    } catch (e) {
      return "[]";
    }
  }),
  
  Block(BlockType.REPORTER, "generatePassword", "generate password length [length] with [options]", {
    length: Argument("number", 12),
    options: ArgumentWithMenu("string", "letters+numbers", "passwordOptionsMenu"),
  }, ({ length, options }) => {
    let chars = "";
    switch (options) {
      case "letters":
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;
      case "numbers":
        chars = "0123456789";
        break;
      case "letters+numbers":
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        break;
      case "all":
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        break;
      default:
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    }
    
    let password = "";
    for (let i = 0; i < parseInt(length); i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }),
  
  Block(BlockType.BOOLEAN, "isRockPaperScissorsWin", "did [player] beat [opponent]?", {
    player: ArgumentWithMenu("string", "rock", "rpsMenu"),
    opponent: ArgumentWithMenu("string", "scissors", "rpsMenu"),
  }, ({ player, opponent }) => {
    const winConditions = {
      "rock": "scissors",
      "paper": "rock", 
      "scissors": "paper"
    };
    return winConditions[player] === opponent;
  }),
  
  Block(BlockType.BOOLEAN, "chance", "[percent]% chance", {
    percent: Argument("number", 50),
  }, ({ percent }) => {
    return Math.random() * 100 < parseInt(percent);
  }),
  
  Block(BlockType.REPORTER, "weightedRandom", "weighted random from [choices] with [weights]", {
    choices: Argument("string", '["common","rare","epic"]'),
    weights: Argument("string", '[70,20,10]'),
  }, ({ choices, weights }) => {
    try {
      const items = JSON.parse(choices);
      const weightArray = JSON.parse(weights);
      
      if (!Array.isArray(items) || !Array.isArray(weightArray) || items.length !== weightArray.length) {
        return "";
      }
      
      const totalWeight = weightArray.reduce((sum, w) => sum + parseInt(w), 0);
      let random = Math.random() * totalWeight;
      
      for (let i = 0; i < items.length; i++) {
        random -= parseInt(weightArray[i]);
        if (random <= 0) {
          return items[i];
        }
      }
      
      return items[items.length - 1];
    } catch (e) {
      return "";
    }
  }),
  
  Block(BlockType.REPORTER, "diceRollSum", "roll [dice]d[sides] dice", {
    dice: Argument("number", 2),
    sides: ArgumentWithMenu("number", "6", "diceSidesMenu"),
  }, ({ dice, sides }) => {
    const numDice = parseInt(dice);
    const numSides = parseInt(sides);
    let sum = 0;
    
    for (let i = 0; i < numDice; i++) {
      sum += Math.floor(Math.random() * numSides) + 1;
    }
    
    return sum;
  }),
];
