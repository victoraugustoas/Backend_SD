const multer = require('multer')
const path = require('path')

module.exports = {
    dest: path.join(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, res, callback) => {
            callback(null, path.join(__dirname, '..', '..', 'uploads'))
        },
        filename(req, res, cb) {
            cb(null, `${Date.now()}-${res.originalname}`)
        }
    })
}