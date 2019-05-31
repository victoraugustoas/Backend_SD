const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = (app) => {
    // habilita para uso externo
    app.use(cors())

    // faz o parser dos objetos json
    app.use(bodyParser.json())
}