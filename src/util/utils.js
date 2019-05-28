module.exports = {
    validateFieldOrError(field, msg) {
        // se o campo n estiver setado, lança um erro
        if (!field) {
            throw {
                msg
            }
        }
    }
}