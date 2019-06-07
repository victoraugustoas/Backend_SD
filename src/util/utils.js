module.exports = {
    validateNotExistFieldOrError(field, msg, status) {
        // se o campo n estiver setado, lança um erro
        if (!field) {
            throw {
                msg,
                status
            }
        }
    },
    validateExistFieldOrError(field, msg, status) {
        // se o campo estiver setado, lança um erro
        if (field.length >= 1) {
            throw {
                msg,
                status
            }
        }
        if (field && ![]) {
            throw {
                msg,
                status
            }
        }
    },
    validateUserNotPremium(user, msg, status) {
        if (!user.isPremium) {
            throw {
                msg,
                status
            }
        }
    }
}