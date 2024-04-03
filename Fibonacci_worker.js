function fibonacci(n)
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

onmessage = function(event) 
{
    const result = cachedFibonacci(event.data);
    postMessage(result);
}