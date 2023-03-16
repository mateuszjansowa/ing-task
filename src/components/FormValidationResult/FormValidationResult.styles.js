import {css} from '@lion/core'
import {colors} from '../../constants'

export default css`
    .form-validation-result {
        background-color: ${colors.errorLight};
        padding: 20px 30px;
        margin: 10px 0;
        border-radius: 5px;
    }

    .form-validation-result__heading {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 400;
    }

    .form-validation-result__button {
        background-color: transparent;
        display: grid;
        place-content: center;
        border: 1px solid ${colors.primary};
        font-weight: 400;
        font-size: 1.2rem;
        padding: 5px 15px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
        margin-right: 20px;
        position: relative;
        transition: all 0.2s ease-in-out;
    }

    .form-validation-result__button[selected] {
        background-color: ${colors.primary};
        color: white;
    }

    .form-validation-result__button__count {
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: ${colors.danger};
        color: white;
        border-radius: 50%;
        font-size: 1rem;
        width: 25px;
        height: 25px;
        display: grid;
        place-content: center;
    }

    .form-validation-result__list {
        list-style: none;
        margin: 10px 0;
        padding: 0;
    }

    .form-validation-result__list-item {
        padding: 20px 5px;
        position: relative;
        font-weight: 400;
    }

    .form-validation-result__list-item::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -10px;
        transform: translateY(-50%);
        width: 5px;
        height: 60%;
        background-color: ${colors.danger};
        border-radius: 2px;
    }
`
