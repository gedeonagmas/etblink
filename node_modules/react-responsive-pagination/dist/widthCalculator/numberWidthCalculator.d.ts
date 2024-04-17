export declare function createNumberWidthCalculator(widths: Params): (label: string) => number;
type Params = {
    singleDigit: number;
    doubleDigit: number;
};
export type NumberWidthCalculator = ReturnType<typeof createNumberWidthCalculator>;
export {};
