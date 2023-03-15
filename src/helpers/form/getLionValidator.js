import {
    Required,
    MinLength,
    MaxLength,
    EqualsLength,
    MinNumber,
    MaxNumber,
} from '@lion/ui/form-core.js'

export const getLionValidator = (rule = '', options = 0) =>
    ({
        required: new Required(),
        'min-len': new MinLength(+options),
        'max-len': new MaxLength(+options),
        len: new EqualsLength(+options),
        'min-number': new MinNumber(+options),
        'max-number': new MaxNumber(+options),
    }[rule])