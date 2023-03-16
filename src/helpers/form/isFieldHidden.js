export const isFieldHidden = (field = {}, state = {}) => {
    if (!field.visibility) {
        return false
    }

    const [key, value] = field.visibility.split(' === ')
    return state[key] !== value
}
