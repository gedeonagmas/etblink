export declare function getViewMetricsFromContainer<ItemKey extends string>(containerElement: HTMLElement, itemKeys: ItemKey[]): ViewMetrics<ItemKey>;
export type ViewMetrics<ItemKey extends string> = {
    outerFrameWidth: number;
    itemWidths: {
        [key in ItemKey]: number;
    };
};
