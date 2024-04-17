export function* zipIterators(xs, ys) {
    while (true) {
        const xResult = xs.next();
        const yResult = ys.next();
        if (xResult.done && yResult.done)
            break;
        yield [xResult.value, yResult.value];
    }
}
export function lastWhere(xs, predicate) {
    let lastSoFar;
    for (const x of xs) {
        if (!predicate(x))
            break;
        lastSoFar = x;
    }
    return lastSoFar;
}
export function iteratorNext(xs) {
    const xResult = xs.next();
    return xResult.done ? undefined : xResult.value;
}
