export function preventDefault(handler) {
    return e => {
        e.preventDefault();
        handler();
    };
}
