const locales = navigator.language || navigator.userLanguage

export const getVisibility = (rule = '', options = '') => {
    const rules = {
        nationality: locales.includes(options.trim()),
        always: true,
    }

    if (!(rule in rules)) {
        throw new Error('Invalid visibility rule')
    }

    return rules[rule]
}
