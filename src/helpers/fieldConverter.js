import {getLionValidator} from './getLionValidator'

export const fieldConverter = field => {
    return Object.entries(field).reduce((acc, [key, value]) => {
        if (value.validators) {
            value.validators = value.validators.map(validator =>
                getLionValidator(validator)
            )
        }

        return [...acc, {...value, label: key}]
    }, [])
}
