export function getLowerLogTickNotationBoundary(base: number) {
    return base === 10
        /**
         * For the decadic logarithm we display 0.1, 0.01, and 0.001
         */
        ? Math.pow(base, -3)
        /**
         * Else we immediately start with e-notation 1e-1, 1e-2, 1e-3
         */
        : 1;
}
