import { createEllipsis, createPage } from '../compositionItem.js';
function* narrowToWidePaginationItemRanges(start, end, collapsePos) {
    for (const range of narrowToWideNumberRanges(start, end, collapsePos)) {
        yield range.map(item => item === '…' ? createEllipsis(collapsePos) : createPage(item));
    }
}
export { narrowToWidePaginationItemRanges as narrowToWideRanges };
function* narrowToWideNumberRanges(first, last, collapsePos) {
    const fullWidth = last - first + 1;
    for (let iterationWidth = 1; iterationWidth < fullWidth; iterationWidth++) {
        const range = getCollapsedRange(first, last, iterationWidth, collapsePos);
        if (range)
            yield range;
    }
    yield getFullRange(first, last);
}
function getCollapsedRange(first, last, requiredWidth, collapsePos) {
    if (requiredWidth < 3)
        return;
    const widthOfRange = requiredWidth - 2;
    return collapsePos === 'L'
        ? [first, '…', ...getFullRange(last - (widthOfRange - 1), last)]
        : [...getFullRange(first, first + (widthOfRange - 1)), '…', last];
}
function getFullRange(start, end) {
    if (end < start)
        return [];
    return Array.from(Array(end - start + 1).keys(), i => i + start);
}
