import {getLionValidator} from './getLionValidator'
import {toTitleCase} from '../utils'

const addLionValidators = validators =>
    validators.map(validatorConfig => {
        const [rule = '', range = 0] = validatorConfig.split(':')

        return getLionValidator(rule, range)
    })

export const prepareForm = (form = {}) => {
    return Object.entries(form).reduce((acc, [id, options]) => {
        if ('validators' in options) {
            options.validators = addLionValidators(options.validators)
        }

        return [...acc, {...options, label: toTitleCase(id), id}]
    }, [])
}
