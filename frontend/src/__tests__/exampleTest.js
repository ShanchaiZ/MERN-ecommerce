const sum = require("../utils/exampleModule");

test("two plus two is four", () => {
    expect(2 + 2).toBe(4);
})

test("two plus four is six", () => {
    expect(sum(2, 4)).toBe(6);
})
