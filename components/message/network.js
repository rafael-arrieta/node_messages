const express = require('express');
const response = require('../../network/response');
const controller = require('./controller')
const router = express.Router();

router.get("/", (req, res) => {
    const filterMessages = req.query.user || null
    controller.getMessages(filterMessages)
        .then((messageList)=>{
            response.success(req, res, messageList,200)
        })   
        .catch((error)=>{
            response.error(req, res, 'Unexpected Error', 500, error)
        })
});

router.post("/", (req, res) => {
    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage)=>{
            response.success(req, res, fullMessage,201);
        })
        .catch(error => {
            response.error(req, res, 'Informacion inválida', 400,'error en el controlador');
        })
});

router.patch('/:id', (req, res) => {

    controller.updateMessage(req.params.id, req.body.message)
        .then((data)=>{
            response.success(req, res, data, 200);
        })
        .catch((error) => {
            response.error(req, res, 'Error interno', 500, error);
        })

    res.send('ok')
})

module.exports = router;