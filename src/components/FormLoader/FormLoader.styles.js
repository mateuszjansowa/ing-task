import {css} from '@lion/core'
import {colors} from '../../constants'

export default css`
    .loader {
        position: relative;
        width: 80px;
        height: 80px;
    }

    .loader--small {
        width: 20px;
        height: 20px;
    }

    .loader__arc {
        position: absolute;
        width: 64px;
        height: 64px;
        border: 4px solid ${colors.primary};
        border-radius: 50%;
        animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${colors.primary} transparent transparent transparent;
    }

    .loader--small .loader__arc {
        width: 16px;
        height: 16px;
        border-width: 2px;
    }

    .loader__arc:nth-child(1) {
        animation-delay: -0.45s;
    }
    .loader__arc:nth-child(2) {
        animation-delay: -0.3s;
    }
    .loader__arc:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes loader {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`
