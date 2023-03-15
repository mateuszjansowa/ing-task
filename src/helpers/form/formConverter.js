import {getLionValidator} from './getLionValidator'
import {normalizeString} from '../utils'

export const formConverter = (form = {}) => {
    return Object.entries(form).reduce((acc, [label, options]) => {
        if ('validators' in options) {
            options.validators = options.validators.map(validatorConfig => {
                const [validationRule = '', validationOptions = ''] = validatorConfig.split(':')

                return getLionValidator(
                    normalizeString(validationRule),
                    normalizeString(validationOptions)
                )
            })
        }

        return [...acc, {...options, label}]
    }, [])
}
