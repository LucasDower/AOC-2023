import fs from 'fs';

const lines = fs.readFileSync('day-03/input.txt', 'utf8').split('\n');

const tokens: { line: number, number: string, start: number, end: number }[] = [];

lines.forEach((line, lineNum) => {
    let start = 0;
    let isReadingNumber = false;
    for (let i = 0; i < line.length; ++i) {
        const char = line[i];
        if (!Number.isNaN(parseInt(char))) {
            if (!isReadingNumber) {
                isReadingNumber = true;
                start = i;
            }
        } else {
            if (isReadingNumber) {
                tokens.push({ line: lineNum, number: line.substring(start, i), start: start, end: i-1 });
            }
            isReadingNumber = false;
        }
    }
    if (isReadingNumber) {
        tokens.push({ line: lineNum, number: line.substring(start, line.length), start: start, end: line.length-1 });
    }
});

let gears = new Map<string, number[]>();

tokens.forEach((token) => {
    const toCheck: { line: number, index: number }[] = [];
    
    // Check TL, L, BL
    toCheck.push({ line: token.line - 1, index: token.start - 1 });
    toCheck.push({ line: token.line,     index: token.start - 1 });
    toCheck.push({ line: token.line + 1, index: token.start - 1 });

    // Check TR, R, BL
    toCheck.push({ line: token.line - 1, index: token.end + 1 });
    toCheck.push({ line: token.line,     index: token.end + 1 });
    toCheck.push({ line: token.line + 1, index: token.end + 1 });

    // Check above & below
    for (let i = 0; i < token.number.length; ++i) {
        toCheck.push({ line: token.line - 1, index: token.start + i });
        toCheck.push({ line: token.line + 1, index: token.start + i });
    }

    for (const entry of toCheck) {
        const char = lines[entry.line]?.charAt(entry.index);

        if (char && char === '*') {
            const key = entry.line + ' ' + entry.index;
            const value = gears.get(key);
            if (value === undefined) {
                gears.set(key, [ parseInt(token.number) ]);
            } else {
                value.push(parseInt(token.number));
            }
            break;
        }
    }
});

let sum = 0;
for (const gear of gears.values()) {
    if (gear.length === 2) {
        sum += gear[0] * gear[1];
    }
}

console.log(sum);