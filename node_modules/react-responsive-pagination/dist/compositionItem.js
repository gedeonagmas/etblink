import { UnsupportedValueError } from './helpers/util.js';
export function createActivePage(page) {
    return { type: 'active', page };
}
export function createPage(page) {
    return { type: 'page', page };
}
export function createNavPrevious(page) {
    return { type: '<', page };
}
export function createNavNext(page) {
    return { type: '>', page };
}
export function createEllipsis(ellipsisPos) {
    return { type: `…${ellipsisPos}`, page: undefined };
}
export function isNav(item) {
    return item.type === '<' || item.type === '>';
}
export function isEllipsis(item) {
    return item.type === '…L' || item.type === '…R';
}
export function containsEllipsis(composition) {
    return composition.some(isEllipsis);
}
export function isPageWithNumber(item, page) {
    return item.type === 'page' && item.page === page;
}
export function getLastPage(composition) {
    return Math.max(...composition
        .filter((item) => item.type === 'active' || item.type === 'page')
        .map(item => item.page));
}
export function compositionMatches(composition, startIndex, pattern) {
    if (startIndex < 0)
        return;
    return pattern.every((matchItem, patternIndex) => {
        if (!composition[startIndex + patternIndex])
            return false;
        const { type, page } = composition[startIndex + patternIndex];
        if (typeof matchItem === 'number') {
            return type === 'page' && page === matchItem;
        }
        else if (matchItem === '#') {
            return type === 'page';
        }
        else if (matchItem === '…') {
            return type === '…L' || type === '…R';
        }
        else if (matchItem === '*') {
            return type === 'active';
        }
        else {
            throw new UnsupportedValueError(matchItem);
        }
    });
}
export function compositionMatchesEnd(composition, endIndex, pattern) {
    return compositionMatches(composition, endIndex - pattern.length + 1, pattern);
}
