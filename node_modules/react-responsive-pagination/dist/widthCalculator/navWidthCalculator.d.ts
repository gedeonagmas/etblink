export declare function createNavWidthCalculator(widths: Params): (type: '<' | '>', enabled: boolean) => number;
type Params = {
    '<': {
        enabled: number;
        disabled: number;
    };
    '>': {
        enabled: number;
        disabled: number;
    };
};
export type GetNavWidth = ReturnType<typeof createNavWidthCalculator>;
export {};
