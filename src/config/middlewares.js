const bodyParser = require('body-parser')

module.exports = (app) => {
    // faz o parser dos objetos json
    app.use(bodyParser.json())
}