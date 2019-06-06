const express = require('express')
const router = express.Router()

module.exports = (app) => {

    /**
     * @apiName User
     */

    /**
     * 
     * @api {post} /user/ Cadastro de usuário
     * @apiGroup User
     * 
     * 
     * @apiParam (BodyParams) {String} name Nome do usuário
     * @apiParam (BodyParams) {String} email Email do usuário
     * @apiParam (BodyParams) {Boolean} gender Sexo do usuário
     * @apiParam (BodyParams) {Boolean} gender Sexo do usuário
     * @apiParam (BodyParams) {String} password Senha do usuário
     * @apiParam (BodyParams) {String} dateOfBirth Data de aniversário do usuário
     * @apiParam (BodyParams) {String} [urlImg] Imagem do usuário
     * @apiParam (BodyParams) {String} isPremium=false Imagem do usuário
     * 
     * @apiSuccess (Sucess 201) {json} msg Mensagem de criado com sucesso
     * 
     * @apiParamExample {json} {BodyParams} Request-Example:
    * {
    "name": "Victor Augusto",
    "email": "victoraugusto@hotmail.com",
    "gender": "false",
    "password": "1234",
    "dateOfBirth": "14/03/1998",
    "isPremium": "true"
}
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "msg": "Usuário cadastrado com sucesso!"
     * }
     * 
     * 
     */
    router.post('/', app.user.save)
    router.get('/:id', app.user.getByID)
    router.put('/:id', app.user.edit)
    router.delete('/:id', app.user.erase)

    router.post('/auth', app.auth.signin)
    router.post('/auth/validateToken', app.auth.validateToken)

    app.use('/user', router)
} 