import {getLionValidator} from './getLionValidator'
import {trimString, toTitleCase} from '../utils'

export const formConverter = (form = {}) => {
    return Object.entries(form).reduce((acc, [label, options]) => {
        if ('validators' in options) {
            options.validators = options.validators.map(validatorConfig => {
                const [validationRule = '', validationOptions = ''] = validatorConfig.split(':')

                return getLionValidator(trimString(validationRule), trimString(validationOptions))
            })
        }

        return [...acc, {...options, label: toTitleCase(label)}]
    }, [])
}
