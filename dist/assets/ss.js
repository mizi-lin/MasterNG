const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const map = {}

const oriLines = [];
rl.on('line', (line) => {
    const [userId, geoId, action, time] = line.split(',');
    // if (!userId || !geoId || !action || !time) return;
    oriLines.push({userId, geoId, action, time});
});

rl.on('close', () => {
    oriLines.sort((a, b) => {return a.time - b.time});
    let invalidClick = 0;
    oriLines.forEach((item) => {
        const {userId, geoId, action, time} = item;
        if (!map[userId]) map[userId] = {};
        if (!map[userId][geoId]) map[userId][geoId] = [];
        if (action === 'see') {
            map[userId][geoId].push(1);
        } else if (action === 'click') {
            if (map[userId][geoId].length <= 0) {
                invalidClick++;
            } else {
                map[userId][geoId].pop();
            }
        }
    });
    console.log(invalidClick);
    process.exit();
})
