export function getLogTickValues(base: number = 10) {
    return [
        Math.pow(base, -3),
        Math.pow(base, -2),
        Math.pow(base, -1),
        Math.pow(base, 0),
        Math.pow(base, 1),
        Math.pow(base, 2),
        Math.pow(base, 3),
        Math.pow(base, 4),
        Math.pow(base, 5),
        Math.pow(base, 7),
        Math.pow(base, 8),
        Math.pow(base, 9)
    ];

}
