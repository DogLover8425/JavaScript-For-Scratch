window.sjs_bignum = [
    Block(BlockType.BUTTON, "bignumCategory", "Big Numbers", {}, () => "IMPORTANT: Make sure to stringify numbers BEFORE you put them in variables or lists, or the Scratch editor could crash!"),
    Block(BlockType.REPORTER, "parseAsBignum", "convert to big number [num]", {
        num: Argument("string", "123")
    }, ({ num }) => {
        return BigInt(num);
    }),
    Block(BlockType.BOOLEAN, "isBignum", "is [num] a big number?", {
        num: Argument("string", "123")
    }, ({ num }) => {
        try {
            return typeof BigInt(num) === "bigint";
        } catch {
            return false;
        }
    }),
    Block(BlockType.REPORTER, "bignumToString", "big number [num] to string", {
        num: Argument("string", "123n")
    }, ({ num }) => {
        try {
            return BigInt(num).toString();
        } catch {
            return num.toString();
        }
    }),
    
    Block(BlockType.REPORTER, "bignumAdd", "[num1] + [num2]", {
        num1: Argument("string", "100000000000000000000"),
        num2: Argument("string", "200000000000000000000")
    }, ({ num1, num2 }) => {
        return (BigInt(num1) + BigInt(num2));
    }),
    
    Block(BlockType.REPORTER, "bignumSubtract", "[num1] - [num2]", {
        num1: Argument("string", "300000000000000000000"),
        num2: Argument("string", "100000000000000000000")
    }, ({ num1, num2 }) => {
        return (BigInt(num1) - BigInt(num2));
    }),
    
    Block(BlockType.REPORTER, "bignumMultiply", "[num1] × [num2]", {
        num1: Argument("string", "100000000000000000000"),
        num2: Argument("string", "2")
    }, ({ num1, num2 }) => {
        return (BigInt(num1) * BigInt(num2));
    }),
    
    Block(BlockType.REPORTER, "bignumDivide", "[num1] ÷ [num2]", {
        num1: Argument("string", "200000000000000000000"),
        num2: Argument("string", "2")
    }, ({ num1, num2 }) => {
        if (BigInt(num2) === 0n) return "Error: Division by zero";
        return (BigInt(num1) / BigInt(num2));
    }),
    
    Block(BlockType.REPORTER, "bignumModulo", "[num1] mod [num2]", {
        num1: Argument("string", "100000000000000000001"),
        num2: Argument("string", "100000000000000000000")
    }, ({ num1, num2 }) => {
        if (BigInt(num2) === 0n) return "Error: Division by zero";
        return (BigInt(num1) % BigInt(num2));
    }),
    
    Block(BlockType.REPORTER, "bignumPower", "[num1] ^ [num2]", {
        num1: Argument("string", "2"),
        num2: Argument("number", 10)
    }, ({ num1, num2 }) => {
        return (BigInt(num1) ** BigInt(num2));
    }),
    
    Block(BlockType.BOOLEAN, "bignumEqual", "[num1] = [num2]", {
        num1: Argument("string", "100000000000000000000"),
        num2: Argument("string", "100000000000000000000")
    }, ({ num1, num2 }) => {
        return BigInt(num1) === BigInt(num2);
    }),
    
    Block(BlockType.BOOLEAN, "bignumNotEqual", "[num1] ≠ [num2]", {
        num1: Argument("string", "100000000000000000000"),
        num2: Argument("string", "200000000000000000000")
    }, ({ num1, num2 }) => {
        return BigInt(num1) !== BigInt(num2);
    }),
    
    Block(BlockType.BOOLEAN, "bignumGreater", "[num1] > [num2]", {
        num1: Argument("string", "200000000000000000000"),
        num2: Argument("string", "100000000000000000000")
    }, ({ num1, num2 }) => {
        return BigInt(num1) > BigInt(num2);
    }),
    
    Block(BlockType.BOOLEAN, "bignumLess", "[num1] < [num2]", {
        num1: Argument("string", "100000000000000000000"),
        num2: Argument("string", "200000000000000000000")
    }, ({ num1, num2 }) => {
        return BigInt(num1) < BigInt(num2);
    }),
    
    Block(BlockType.BOOLEAN, "bignumGreaterEqual", "[num1] ≥ [num2]", {
        num1: Argument("string", "200000000000000000000"),
        num2: Argument("string", "100000000000000000000")
    }, ({ num1, num2 }) => {
        return BigInt(num1) >= BigInt(num2);
    }),
    
    Block(BlockType.BOOLEAN, "bignumLessEqual", "[num1] ≤ [num2]", {
        num1: Argument("string", "100000000000000000000"),
        num2: Argument("string", "200000000000000000000")
    }, ({ num1, num2 }) => {
        return BigInt(num1) <= BigInt(num2);
    }),
    
    Block(BlockType.REPORTER, "bignumAbs", "absolute value of [num]", {
        num: Argument("string", "-100000000000000000000")
    }, ({ num }) => {
        return BigInt(num) < 0n ? -BigInt(num) : BigInt(num);
    }),
    
    Block(BlockType.REPORTER, "bignumNegate", "-[num]", {
        num: Argument("string", "100000000000000000000")
    }, ({ num }) => {
        return -BigInt(num);
    }),

    Block(BlockType.REPORTER, "bignumFactorial", "factorial of [num]", {
        num: Argument("string", "5")
    }, ({ num }) => {
        let n = BigInt(num);
        if (n < 0n) return "Error: Factorial of negative number";
        if (n === 0n || n === 1n) return 1n;
        let result = 1n;
        for (let i = 2n; i <= n; i++) {
            result *= i;
        }
        return result;
    })
]
