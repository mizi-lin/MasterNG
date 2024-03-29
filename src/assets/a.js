let upper = (num) => {

    let _upper = {
        0: '零',
        1: '壹',
        2: '贰',
        3: '叁',
        4: '肆',
        5: '伍',
        6: '陆',
        7: '柒',
        8: '捌',
        9: '玖'
    };

    let upperInteger = (num) => {
        let _unit = {
            0: '元',
            1: '拾',
            2: '佰',
            3: '仟',
            4: '万',
            5: '拾',
            6: '佰',
            7: '仟',
            8: '亿',
            9: '拾',
            10: '佰'
        };

        let s = (num || '').split('');

        // 数字匹配
        s = s.map((v, i) => {
            return _upper[v];
        });

        // 单位匹配
        s = s.reverse().map((v, i) => {
            let aa = v + _unit[i];
            aa = aa.replace(/零仟|零佰|零拾|零元/gi, '零');
            return aa;
        });

        s.reverse();

        let ss = s.join('');
        ss = ss.replace(/零{4,}万/gi, '');
        ss = ss.replace(/零{1,}/gi, '零');
        ss = ss.replace(/零元$/gi, '零');
        ss = ss.replace(/零$/gi, '');
        ss = ss.replace(/佰零万/gi, '佰万');
        ss = ss.replace(/佰零亿/gi, '佰亿');
        ss = ss.replace(/仟零万/gi, '仟万');
        ss = ss.replace(/拾零/gi, '拾');
        ss = ss.replace(/壹拾/gi, '拾');
        // 补元去元
        ss = (ss + '元').replace(/元{1,}/gi, '元');
        ss = ss.replace(/^元$/gi, '');

        return ss;
    };

    let upperDecimal = (num) => {
        let _unit = {
            0: '角',
            1: '分',
        };

        let s = (num || '').split('');

        // 数字匹配
        s = s.map((v, i) => {
            return _upper[v];
        });

        // 单位匹配
        s = s.map((v, i) => {
            let aa = v + _unit[i];
            aa = aa.replace(/零角|零分/gi, '零');
            return aa;
        });

        s = s.join('');
        return s;
    };
    let [_ui, _ud] = (num + '').split('.');
    let rst = upperInteger(_ui) + (upperDecimal(_ud) || '整');
    return  rst.replace(/^零{1,}/, '');
};

console.log(10000001, upper(10000001));
console.log(100, upper(100));
console.log(1000, upper(1000));
console.log(10000, upper(10000));
console.log(100000, upper(100000));
console.log(1000000, upper(1000000));
console.log(10000000, upper(10000000));
console.log(100000000, upper(100000000));
console.log(1000000000, upper(1000000000));
console.log(10000000000, upper(10000000000));
console.log(1870147654, upper(1870147654));
console.log(4.5, upper(4.5));
console.log(10, upper(10));
console.log(101, upper(101));
console.log(101.01, upper(101.01));
console.log(123, upper(123));
console.log(0.07, upper(0.07));
console.log(0.5, upper(0.5));