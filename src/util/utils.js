module.exports = {
    validateNotExistFieldOrError(field, msg) {
        // se o campo n estiver setado, lança um erro
        if (!field) {
            throw {
                msg
            }
        }
    },
    validateExistFieldOrError(field, msg) {
        // se o campo estiver setado, lança um erro
        if (field) {
            throw {
                msg
            }
        }
    }
}