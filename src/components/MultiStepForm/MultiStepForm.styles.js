import {css} from '@lion/core'
import {colors} from '../../constants'

export default css`
    .form {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        min-width: 600px;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        column-gap: 20px;
        margin-top: 20px;
    }

    .button {
        padding: 10px 20px;
        border-radius: 2px;
        border: 1px solid ${colors.primary};
        box-shadow: 0px 1px 2px -1px ${colors.secondary};
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        background-color: ${colors.primary};
        color: white;
    }

    .button:disabled {
        cursor: not-allowed;
        background-color: ${colors.secondary};
        border-color: ${colors.secondary};
        color: ${colors.font};
    }

    .button:hover {
        color: ${colors.font};
        background-color: transparent;
    }

    .button__prev {
        border: 0;
        background-color: transparent;
        color: ${colors.primary};
        box-shadow: none;
    }
`
