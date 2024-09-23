function fib_forloop(n) {
    // TODO: implement fibonacci
    // for loop
    if (n === 0) {
        console.log(0);
        return 0;
        }
    if (n === 1) {
        console.log(1);
        return 1;
        }
    let a = 0;
    let b = 1;
    let c = 0;
    for (let i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    console.log(c);
    return c;
  }

function fib_recursive(n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fib_recursive(n - 1) + fib_recursive(n - 2);
}
fib_forloop(0); // 0
fib_forloop(1); // 1
fib_forloop(5); // 5
fib_forloop(10); // 55

console.log(fib_recursive(0)); // 0
console.log(fib_recursive(1)); // 1
console.log(fib_recursive(5)); // 5
console.log(fib_recursive(10)); // 55