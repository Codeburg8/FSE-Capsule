const userService = require('../services/UserService');

class UserController {

    create(req, res, next) {
        const userDetails = req.body;
        if(userDetails && userDetails.id) {
            delete userDetails.id;
        }

        userService.create(UserController.convertToMongo(userDetails))
            .then(user => {
                res.json({
                    status: (user!==null)?"OK": "ERR",
                    user: UserController.convertFromMongo(user)
                });
                res.sendStatus = (user!==null)?200: 500;
            });
    }

    update(req, res, next) {
        const userDetails = req.body;
        const id = req.params.id;

        userService.update(id, UserController.convertToMongo(userDetails))
            .then(user => {
                if(user === null) {
                    res.json({
                        status: "ERR",
                        result: {}
                    });
                    res.sendStatus = 500;
                } else {
                    userService.findById(id)
                        .then(result => {
                            res.json({
                                status: (res!==null)?"OK": "ERR",
                                result: UserController.convertFromMongo(result)
                            });
                            res.sendStatus = (res!==null)?200: 500;
                        });
                }
            });
    }

    delete(req, res, next) {
        const id = req.params.id;

        userService.delete(id)
            .then(status => {
                res.json({
                    status: (status)?"OK": "ERR"
                });
                res.sendStatus = (status)?200: 500;
            });
    }

    findAll(req, res, next) {
        console.log('userController.findAll()');
        userService.findAll()
            .then(results => {
                res.json({
                    status: (results!==null)?"OK": "ERR",
                    results : UserController.mapResultsFromMongo(results)
                });
                res.sendStatus = (results!==null)?200: 500;
            });
    }

    findById(req, res, next) {
        const id = req.params.id;

        userService.findById(id)
            .then(result => {
                res.json({
                    status: (res!==null)?"OK": "ERR",
                    result: UserController.convertFromMongo(result)
                });
                res.sendStatus = (res!==null)?200: 500;
            });
    }

    static convertToMongo(user) {
        if(!user || user === null) {
            return {};
        }
        return {
            user_id: user.id,
            f_name: user.firstName,
            l_name: user.lastName,
            email: user.email,
            sso: user.sso
        }
    }

    static convertFromMongo(user) {
        if(!user || user === null) {
            return {};
        }
        return {
            id: user.user_id,
            firstName: user.f_name,
            lastName: user.l_name,
            email: user.email,
            sso: user.sso
        }
    }

    static mapResultsFromMongo(users) {
        if(!users || users === null || users.length<1) {
            return [];
        }
        return users.map(user=>this.convertFromMongo(user));
    }
}

module.exports = new UserController();