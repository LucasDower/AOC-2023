import fs from 'fs';

const contents = fs.readFileSync('day-01/input.txt', 'utf8');

const words = [
    { token: "one", value: 1 },
    { token: "two", value: 2 },
    { token: "three", value: 3 },
    { token: "four", value: 4 },
    { token: "five", value: 5 },
    { token: "six", value: 6 },
    { token: "seven", value: 7 },
    { token: "eight", value: 8 },
    { token: "nine", value: 9 },
    { token: "1", value: 1 },
    { token: "2", value: 2 },
    { token: "3", value: 3 },
    { token: "4", value: 4 },
    { token: "5", value: 5 },
    { token: "6", value: 6 },
    { token: "7", value: 7 },
    { token: "8", value: 8 },
    { token: "9", value: 9 },
];

const result = contents.split('\n')
    .reduce((res, curr) => {
        const finds = words.reduce((filtered, option) => {
            let i = -1;
            while ((i = curr.indexOf(option.token, i+1)) !== -1){
                filtered.push({
                    index: i,
                    value: option.value,
                });
            }
            return filtered;
        }, [] as any[])
        .sort((a, b) => a.index - b.index)
        .map((x) => x.value);

        const value = 10 * finds[0] + finds[finds.length - 1];
        return res + value;
    }, 0);

console.log(result);