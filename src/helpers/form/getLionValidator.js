import {
    Required,
    MinLength,
    MaxLength,
    EqualsLength,
    MinNumber,
    MaxNumber,
} from '@lion/ui/form-core.js'

export const getLionValidator = (rule = '', range = 0) => {
    const validators = {
        required: new Required(),
        'min-len': new MinLength(+range),
        'max-len': new MaxLength(+range),
        len: new EqualsLength(+range),
        'min-number': new MinNumber(+range),
        'max-number': new MaxNumber(+range),
    }

    if (!(rule in validators)) {
        throw new Error('No validator found')
    }

    return validators[rule]
}
