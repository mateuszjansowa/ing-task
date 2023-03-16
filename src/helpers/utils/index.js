export const toTitleCase = (str = '') => {
    if (str && typeof str === 'string') {
        const titleCased = str.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')
        return titleCased.charAt(0).toUpperCase() + titleCased.slice(1)
    }
}
