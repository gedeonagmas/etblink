export function compositionToPaginationItems(compositionItems, options) {
    const previousLabel = options?.previousLabel || '«';
    const a11yPreviousLabel = options?.ariaPreviousLabel || 'Previous';
    const nextLabel = options?.nextLabel || '»';
    const a11yNextLabel = options?.ariaNextLabel || 'Next';
    return compositionItems.map(({ type, page }) => {
        switch (type) {
            case '<':
                return {
                    type: 'previous',
                    key: `previous${page === undefined ? '_disabled' : ''}`,
                    label: previousLabel,
                    a11yLabel: previousLabel === a11yPreviousLabel ? undefined : a11yPreviousLabel,
                    gotoPage: page,
                };
            case '>':
                return {
                    type: 'next',
                    key: `next${page === undefined ? '_disabled' : ''}`,
                    label: nextLabel,
                    a11yLabel: nextLabel === a11yNextLabel ? undefined : a11yNextLabel,
                    gotoPage: page,
                };
            case '…L':
            case '…R':
                return {
                    type: 'ellipsis',
                    key: `ellipsis_${type === '…L' ? 'l' : 'r'}`,
                    label: '…',
                    a11yHidden: true,
                    gotoPage: undefined,
                };
            default:
                return {
                    type: 'page',
                    key: `${type}_${page}`,
                    label: page.toString(),
                    gotoPage: page,
                    active: type === 'active',
                };
        }
    });
}
