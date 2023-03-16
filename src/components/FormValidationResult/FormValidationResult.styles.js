import {css} from '@lion/core'
import {colors} from '../../constants'

export default css`
    .form-validation-result {
        background-color: ${colors.errorLight};
        padding: 10px 20px;
        margin: 10px 0;
        border-radius: 5px;
    }

    .form-validation-result__heading {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 400;
    }
`
