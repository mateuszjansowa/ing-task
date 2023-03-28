export const getErrors = elements => elements.filter(el => el.hasFeedbackFor.includes('error'))
