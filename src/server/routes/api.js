const userController = require('../controllers/user.controller');
const documentController = require('../controllers/document.controller');

const router = require('express').Router();

router
    .route('/test')
    .get((req, res)=>{
        res.send('test');
    })

router
    .route('/users')
        .get(userController.findAll)
        .post(userController.create);

router
    .route('/users/:id')
        .get(userController.findById)
        .put(userController.update)
        .delete(userController.delete);

module.exports = router;

router
    .route('/documents')
        .get(documentController.findAll)
        .post(documentController.create);

router
    .route('/documents/:id')
        .get(documentController.findById)
        .delete(documentController.delete);

module.exports = router;