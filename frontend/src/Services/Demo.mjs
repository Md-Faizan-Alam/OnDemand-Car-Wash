const sizes = [25, 50, 75];
let products = [];
let set = [];
for (const parent of sizes) {
    for (const child of sizes) {
        const result = (parent * child) / 100;
        if (products.includes(result)) continue;
        products.push(result);
        set.push({ parent, child, result: Math.floor(result) });
        // console.log(`${parent}% and ${child}% gives ${result}%`)
    }
}

set.sort((first,second)=>{
    switch (true) {
        case first.result > second.result:
            return 1;
        case first.result < second.result:
            return -1;
        default:
            return 0;
    }
})

set.forEach((element)=>{
    console.log(`${element.parent}% and ${element.child}% gives ${element.result}%`)
})
// Bootstrap width and height
// 25% and 25% gives 6%
// 25% and 50% gives 12%
// 25% and 75% gives 18%
// 50% and 75% gives 37%
// 75% and 75% gives 56%