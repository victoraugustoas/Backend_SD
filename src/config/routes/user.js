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
    /**
     * 
     * @api {get} /user/:id Recupera dados do usuário
     * @apiGroup User
     * 
     * @apiHeader  (HeaderParams) {Token} Authorization Token de autenticação
     * @apiParam (URLParams) {ObjectID} ID ID do usuário
     * 
     * @apiSuccess (Sucess 200) {json} data Dados do usuário
     * 
     * @apiParamExample  {type} Request-Example:
     * /user/5cf83fa7fe5e9e281e21b7b2
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
    "urlImg": "",
    "_id": "5cf83fa7fe5e9e281e21b7b2",
    "name": "Victor Augusto2",
    "email": "victoraugustoandradesilva2@hotmail.com",
    "gender": false,
    "dateOfBirth": "14/03/1998"
}
     * 
     * 
     */
    router.get('/:id', app.user.getByID)
    /**
     * 
     * @api {put} /user/:id Altera os dados do usuário
     * @apiGroup User
     * 
     * @apiHeader  (HeaderParams) {Token} Authorization Token de autenticação
     * @apiParam (URLParams) {ObjectID} ID ID do usuário que será alterado
     * @apiParam (BodyParams) {String} name Nome do usuário
     * @apiParam (BodyParams) {String} email Email do usuário
     * @apiParam (BodyParams) {Boolean} gender Sexo do usuário
     * @apiParam (BodyParams) {Boolean} gender Sexo do usuário
     * @apiParam (BodyParams) {String} password Senha do usuário
     * @apiParam (BodyParams) {String} dateOfBirth Data de aniversário do usuário
     * @apiParam (BodyParams) {String} [urlImg] Imagem do usuário
     * @apiParam (BodyParams) {String} isPremium=false Imagem do usuário
     *
     * 
     * 
     * @apiSuccess (Sucess 200) {json} msg Mensagem de confirmação de alteração
     * 
     * @apiParamExample  {json} {BodyParams} Request-Example:
     * {
    "urlImg": "",
    "name": "Victor Augusto",
    "email": "victoraugustoandradesilva@hotmail.com",
}
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "msg" : "Usuário alterado com sucesso."
     * }
     * 
     * 
     */
    router.put('/:id', app.user.edit)
    /**
     * 
     * @api {delete} /user/:id Apaga o usuário do sistema
     * @apiGroup User
     * 
     * @apiHeader  (HeaderParams) {Token} Authorization Token de autenticação
     * @apiParam (URLParams) {ObjectID} ID ID do usuário
     * 
     * @apiSuccess (Sucess 200) {json} msg Mensagem de sucesso
     * 
     * @apiParamExample  {URLParams} Request-Example:
     * /user/5cf83fa7fe5e9e281e21b7b2
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "msg" : "Usuário deletado com sucesso."
     * }
     * 
     * 
     */
    router.delete('/:id', app.user.erase)

    /**
     * 
     * @api {post} /user/auth Autentica o usuário no sistema
     * @apiGroup Auth
     * 
     * 
     * @apiParam (BodyParams) {String} email Email do usuário
     * @apiParam (BodyParams) {String} password Senha do usuário
     * 
     * @apiSuccess (Sucess 200) {ObjectID} _id ID do usuário
     * @apiSuccess (Sucess 200) {String} name Nome do usuário
     * @apiSuccess (Sucess 200) {String} email Email do usuário
     * @apiSuccess (Sucess 200) {Boolean} isPremium Informa se o usuário é premium
     * @apiSuccess (Sucess 200) {String} urlImg Url da imagem do usuário
     * @apiSuccess (Sucess 200) {Boolean} gender Sexo do usuário
     * @apiSuccess (Sucess 200) {Int} iat Token emitido na data iat, definido em segundos
     * @apiSuccess (Sucess 200) {Int} exp Data de expiração do token em segundos
     * @apiSuccess (Sucess 200) {String} token Token de autenticação
     * 
     * @apiParamExample  {json} {BodyParams} Request-Example:
     * {
     *     "email" : "alguem@email.com",
     *     "password": "123"
     * }
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
    "_id": "5cf72b58b83ba43f21078914",
    "name": "Victor Augusto",
    "email": "alguem@email.com",
    "isPremium": false,
    "urlImg": "",
    "gender": false,
    "iat": 1559703596,
    "exp": 1559962796,
    "token": "eyJ0eXAiOiJKV1QiLCJhbxciOiJIUzI1NiJ9.eyJfaWQiOiI1Y2Y3MmI1OGI4M2JhNzNmMjEwNzg5MTQiLCJuYW1lIjoiVmljdG9yIEF1Z3VzdG8iLCJlbWFpbCI6InZpY3RvcmF1Z3VzdG9hbmRyYWRlc2lsdmFAaG90bWFpbC5jb20iLCJpc1ByZW1pdW0iOmZhbHNlLCJ1cmxJbWciOiIiLCJnZW5kZXIiOmZhbHNlLCJpYXQiOjE1NTk3MDM1OTYsImV4cCI6MTU1OTk2Mjc5Nn0.HOs5ZSV6ILimD3lGUv7wLkFHYPjyNWrnIzsW2vTjES8"
}
     * 
     * 
     */
    router.post('/auth', app.auth.signin)
    router.post('/auth/validateToken', app.auth.validateToken)

    app.use('/user', router)
} 