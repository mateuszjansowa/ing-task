import {css} from 'lit'
import {colors} from '../../constants'

export default css`
    .status-box {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 20px;
        border-radius: 5px;
    }
    .status-box__heading {
        display: flex;
        align-items: center;
        column-gap: 10px;
    }
    .status-box--success {
        background-color: ${colors.successLight};
        color: ${colors.success};
    }
    .status-box--error {
        background-color: ${colors.errorLight};
        color: ${colors.danger};
    }
`
