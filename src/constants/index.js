import {css} from '@lion/core'

export const language = {
    pl: 'pl-PL',
    en: 'en-GB',
}

export const serverState = {
    success: {
        status: 'success',
        message: 'Form has been submitted, thank you!',
    },
    error: {
        status: 'error',
        message: 'Something went wrong, please try again later.',
    },
}

export const colors = {
    primary: css`hsl(23, 100%, 50%)`,
    secondary: css`hsl(0, 0%, 80%)`,
    font: css`hsl(0, 0%, 40%)`,
    danger: css`hsl(0, 100%, 50%)`,
}
