export function getElementWidth(element) {
    const style = getComputedStyle(element);
    return (styleMetricToInt(style.marginLeft) +
        getWidth(element) +
        styleMetricToInt(style.marginRight));
}
export function getContentWidth(element) {
    const style = getComputedStyle(element);
    return (element.getBoundingClientRect().width -
        styleMetricToInt(style.borderLeftWidth) -
        styleMetricToInt(style.paddingLeft) -
        styleMetricToInt(style.paddingRight) -
        styleMetricToInt(style.borderRightWidth));
}
export function getNonContentWidth(element) {
    const style = getComputedStyle(element);
    return (styleMetricToInt(style.marginLeft) +
        styleMetricToInt(style.borderLeftWidth) +
        styleMetricToInt(style.paddingLeft) +
        styleMetricToInt(style.paddingRight) +
        styleMetricToInt(style.borderRightWidth) +
        styleMetricToInt(style.marginRight));
}
export function getWidth(element) {
    return element.getBoundingClientRect().width;
}
function styleMetricToInt(styleAttribute) {
    return styleAttribute ? parseInt(styleAttribute) : 0;
}
