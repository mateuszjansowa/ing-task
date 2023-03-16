import {css} from '@lion/core'
import {colors} from '../../constants'

export default css`
    .form__header {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-direction: column;
        margin: 20px 0;
    }

    .form__title {
        font-weight: 400;
        color: hsl(0, 0%, 0%);
        margin: 10px;
        padding: 0;
        text-transform: uppercase;
    }

    .form__subtitle {
        margin: 5px;
        padding: 0;
    }

    .form__fields {
        border: 1px solid hsl(0, 0%, 80%);
        border-radius: 5px;
        padding: 40px;
        box-shadow: 0px 1px 2px -1px hsl(0, 0%, 49%);
        display: flex;
        flex-direction: column;
        row-gap: 40px;
    }

    .form__field {
        display: grid;
        grid-template-columns: 35% auto;
        align-items: center;
        position: relative;
    }

    .form__field input,
    .form__field select {
        padding: 10px 5px;
        border-radius: 5px;
        background-color: transparent;
        border: 0;
        outline: 1px solid ${colors.secondary};
    }

    .form__field input:focus-visible,
    .form__field select:focus-visible {
        border: 0;
        outline: 1px solid ${colors.primary};
    }

    lion-validation-feedback {
        position: absolute;
        font-size: 0.9rem;
        color: ${colors.danger};
        padding-top: 5px;
    }
`
