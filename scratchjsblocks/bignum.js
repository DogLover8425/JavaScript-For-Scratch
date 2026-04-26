window.sjs_bignum = [
    Block(BlockType.REPORTER, "parseAsBignum", "Convert to big number [num]", {
        num: Argument("number", "123")
    }, ({ num }) => {
        return BigInt(num);
    }),
    Block(BlockType.BOOLEAN, "isBignum", "Is [num] a big number?", {
        num: Argument("number", "123")
    }, ({ num }) => {
        return typeof num === "bigint";
    }),
    Block(BlockType.REPORTER, "bignumToString", "Big number [num] to string", {
        num: Argument("number", "123n")
    }, ({ num }) => {
        return num.toString();
    })
]