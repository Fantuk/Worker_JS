/*function createFn(name)
{
    const message = "hello" + name;

    function greeting()
    {
        console.log(message);
    }

    return greeting;
}

const helloUser1 = createFn("Kirill");
const helloUser2 = createFn("Mishka");

helloUser1();
helloUser2();*/


/*function createConter(start)
{
    let counter = start ? start : 0;
    function increaseCounter()
    {
        return counter++;
    }

    return increaseCounter;
}

const c1 = createConter(2);
const c2 = createConter(0);

console.log(c1());
console.log(c2());

console.log(c1());
console.log(c2());*/


/*function fibonacci(n)
{
    if (n <= 1)
    {
        return n;
    }

    else 
    {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}



function createCatcheFunc(originalFunction)
{
    const cache = new Map();

    return function(...args) {
        const cacheKey = JSON.stringify(args);

        if (cache.has(cacheKey))
        {
            console.log("Result fetched from cache");
            return cache.get(cacheKey);
        }

        const result = originalFunction(...args);
        cache.set(cacheKey, result);
        console.log("Result calculated and cached");

        return result;
    }
}

const cachedFibonacci = createCatcheFunc(fibonacci);

const calcBtn = document.getElementById("calcBtn");
const resField = document.getElementById("result");

calcBtn.addEventListener('click', () =>
{
    const n = parseInt(document.getElementById("findNumber").value);

    result = cachedFibonacci(n);

    resField.innerHTML = result;
})*/


const result = document.getElementById("result");
const quickBtn = document.getElementById("quickBtn");
const slowBtn = document.getElementById("slowBtn");

const worker = new Worker("./Fibonacci_worker.js")

const getFiboNumber = (n) =>
{
    return new Promise(resolve => 
    {
        worker.postMessage(n);
        worker.onmessage = (event) =>
        {
            resolve(event.data)
        }
    })
}

quickBtn.addEventListener('click', () => 
{
    const message = document.createElement("div");
    message.innerHTML = "Quick messege";
    result.appendChild(message);
});

slowBtn.addEventListener("click", async () =>
{
    const fibo = await getFiboNumber(41);

    const block = document.createElement("div");

    block.style.backgroundColor = "yellowgreen";
    block.innerHTML = fibo;

    result.appendChild(block);
});

