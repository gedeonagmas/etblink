import { CompositionItem } from '../compositionItem.js';
import { NarrowBehaviour } from '../narrowBehaviour.js';
export declare function narrowToWideCompositions({ current, total, narrowBehaviour, renderNav, }: {
    current: number;
    total: number;
    narrowBehaviour: NarrowBehaviour | undefined;
    renderNav: boolean;
}): Generator<CompositionItem[], void, unknown>;
export declare function narrowToWideCompositionsUnfiltered(current: number, total: number, renderNav: boolean): Generator<CompositionItem[]>;
