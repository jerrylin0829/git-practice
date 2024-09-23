import Stack from './stack.js';

let stack = new Stack();

// 初始狀態測試
console.assert(stack.isEmpty() === true, "Test Failed: stack should be empty initially");
console.assert(stack.size() === 0, "Test Failed: stack size should be 0 initially");

// 測試 push 和 peek
stack.push(5);
console.assert(stack.peek() === 5, "Test Failed: top of stack should be 5 after push");
stack.push(8);
console.assert(stack.peek() === 8, "Test Failed: top of stack should be 8 after push");

// 測試 pop
console.assert(stack.pop() === 8, "Test Failed: pop should return 8");
console.assert(stack.peek() === 5, "Test Failed: top of stack should be 5 after pop");
console.assert(stack.size() === 1, "Test Failed: stack size should be 1 after one pop");

// 清空堆疊測試
stack.clear();
console.assert(stack.isEmpty() === true, "Test Failed: stack should be empty after clear");
console.assert(stack.size() === 0, "Test Failed: stack size should be 0 after clear");

// 空堆疊狀況測試
console.assert(stack.pop() === undefined, "Test Failed: pop on empty stack should return undefined");
console.assert(stack.peek() === undefined, "Test Failed: peek on empty stack sh ould return undefined");

console.log("All tests passed!");
