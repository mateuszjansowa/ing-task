import {getLionValidator} from './getLionValidator'
import {getVisibility} from './getVisibility'
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

        if ('visibility' in options) {
            const [visibilityRule = '', visibilityOptions = ''] = options.visibility.split('===')

            options.visibility = getVisibility(
                normalizeString(visibilityRule),
                normalizeString(visibilityOptions)
            )
        }

        return [...acc, {...options, label}]
    }, [])
}
