export const matrixToMany = <T>(prev: T[], current: T[]): T[] => {
    if (!prev) prev = [];
    prev = prev.concat(current);
    return prev;
};
