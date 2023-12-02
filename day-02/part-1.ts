import fs from 'fs';

const count = {
    'red': 12,
    'green': 13,
    'blue': 14,
} as any;

let validGames = 0;

fs.readFileSync('day-02/input.txt', 'utf8')
    .split('\n')
    .map(x => x.split(':')[1].split(';').map(x => x.split(',').map(x => x.trimStart().split(' '))))
    .forEach((rolls, index) => {
        let isValid = true;

        rolls.forEach(roll => {
            roll.forEach(colour => {
                if (parseInt(colour[0]) > count[colour[1]]) {
                    isValid = false;
                }
            });
        });

        if (isValid) {
            validGames += index + 1;
        }
    });

console.log(validGames);