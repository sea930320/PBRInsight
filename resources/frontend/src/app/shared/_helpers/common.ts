/**
 * Formats a label given a date, number or string.
 * 
 * @export
 * @param {*} label
 * @returns {string}
 */
export function formatLabel(label: any): string {
    if (label instanceof Date) {
        label = label.toLocaleDateString();
    } else {
        label = label.toLocaleString();
    }

    return label;
}

/**
 * @param number startYear
 * @param number endYear
 * @param number initialStartYear
 * @return []
 */
export function _getYears(startYear, endYear = null, initialStartYear = null) {
    var years = [];
    endYear = endYear ? endYear : new Date().getFullYear()
    startYear = startYear != 0 ? startYear : (initialStartYear || 1980);
    while (startYear <= endYear) {
        years.push(startYear++);
    }
    return years;
}