import fs from 'fs';

const contents = fs.readFileSync('day-01/input.txt', 'utf8');

const result = contents.split('\n')
    .reduce((res, curr) => {
        const result = curr.split("").reduce((filtered, option) => {
            const num = parseInt(option);
            if (!Number.isNaN(num)) {
                filtered.push(num);
            }
            return filtered;
        }, [] as number[]);

        const value = 10 * result[0] + result[result.length - 1];
        return res + value;
    }, 0);

console.log(result);