import fs from 'fs';

const count = {
    'red': 12,
    'green': 13,
    'blue': 14,
} as any;

let powerSum = 0;

fs.readFileSync('day-02/input.txt', 'utf8')
    .split('\n')
    .map(x => x.split(':')[1].split(';').map(x => x.split(',').map(x => x.trimStart().split(' '))))
    .forEach((rolls, index) => {
        const maxes = {
            red: 0,
            green: 0,
            blue: 0,
        } as any;

        rolls.forEach(roll => {
            roll.forEach(colour => {
                const count = parseInt(colour[0]);
                maxes[colour[1]] = Math.max(maxes[colour[1]], count);
            });
        });

        const power = maxes.red * maxes.green * maxes.blue;
        powerSum += power;
    });

console.log(powerSum);