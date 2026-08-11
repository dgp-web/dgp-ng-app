export const matrixToMany = <T>(prev: readonly T[], current: readonly T[]): T[] => {
    if (!prev) prev = [];
    prev = prev.concat(current);
    return prev as T[];
};
