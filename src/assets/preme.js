// /*判断一个数字是否是质数：
// 质数（prime number）又称素数，有无限个。除了1和它本身以外不再被其他的除数整除。*/
// function isPrime(number) {
// //判断输入是否为number类型，是否为整数
//     if(typeof number !== 'number' || !Number.isInteger(number)) {
//         return false;
//     }
//     ;
// //小于2都不是素数
//     if(number < 2) {
//         return false
//     }
//     ;
// //2是素数，被2整除的都不是素数
//     if(number === 2) {
//         return true
//     } else if(number % 2 === 0) {
//         return false;
//     }
//     ;
// //依次判断是否能被奇数整除，最大循环为数值的开方
//     var squareRoot = Math.sqrt(number);
//     for(var i = 3; i <= squareRoot; i += 2) {
//         if(number % i === 0) {
//             return false;
//         }
//         ;
//     }
//     return true;
// }

// process.stdin.resume();
// process.stdin.setEncoding("utf8");
// process.stdin.on('data', function (chunk) {
//     let datas = chunk.trim().split("\n");
//     let rst = datas.filter((v) => {
//         return parseInt(v) < 4;
//     });
//     console.log(rst.length);
// });

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on('data', function(chunk) {

    let isPrime = function(number) {
        if(number < 2) {
            return false
        }

        if(number === 2) {
            return true;
        } else if(number % 2 === 0) {
            return false;
        }

        let squareRoot = Math.sqrt(number);
        for(let i = 3; i <= squareRoot; i += 2) {
            if(number % i === 0) {
                return false;
            }
        }
        return true;
    };

    let data = parseInt(chunk.trim());
    let datas = [];

    for(let i = 1; i <= data; i++) {
        isPrime(i) && datas.push(i);
    }

    console.log(datas.length)
});




