export const normalizeString = (str = '') => {
    if (str && typeof str === 'string') {
        return str.toLowerCase().trim()
    }
}
