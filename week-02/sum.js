// ary: number array
function sum_reduce(ary) {
	// TODO: sum all elements in ary
    // 不能用for or while寫
    return ary.reduce((acc, current) => acc + current, 0);
}

function sum_eval(ary) {
    return eval(ary.map(x => x).join('+'));
}

function sum(n) {
    return (n * (n + 1)) / 2;
}

function sum_recursive(n) {
    if (n === 1) return 1;
    return n + sum_recursive(n - 1);
}

console.log(sum_reduce([1, 5, 3, 2])); // 11
console.log(sum_eval([1, 5, 3, 2])); // 11
console.log(sum(5)); // 15 (1 + 2 + 3 + 4 + 5)
console.log(sum_recursive(5)); // 15
