export const paginationFilter = (pageNumber: number, elsOnPage: number, dataArr: Array<JSX.Element>) => {
    const maxEl = pageNumber * elsOnPage;
    const minEl = (pageNumber - 1) * elsOnPage + 1
    return dataArr.filter((page, idx) => {
        if (idx + 1 >= minEl && idx + 1 <= maxEl) {
            return page;
        }
        return undefined;
    });
};