const validator = require('validator')
const moment = require('moment')
module.exports = {
    validateNotExistFieldOrError(field, msg, status) {
        // se o campo n estiver setado, lança um erro
        if (!(typeof field === 'number') && !field) {
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
    },
    validateEmail(email, msg, status) {
        if (!validator.isEmail(email)) {
            throw {
                msg, status
            }
        }
    },
    validateDateBirth(date, msg, status) {
        let validLength = date.length >= 8
        let validDate = moment(date, "DD MM YYYY").isValid()
        if (!validLength || !validDate) {
            throw {
                msg,
                status
            }
        }
    }
}