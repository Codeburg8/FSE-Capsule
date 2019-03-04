const User = require('../Models/User');

class UserService {

    async create(userDetails) {
        try {
            const user =  await  User.create(userDetails);
            return user;
        } catch(err) {
            console.log(`UserService.create(${JSON.stringify(userDetails)}): err`, {err});
            return null;
        }
    }

    async update(id, userDetails) {
        try {
            const tmp = Object.assign({}, userDetails);
            delete tmp.user_id;
            const user = await User.findOneAndUpdate({user_id: id}, tmp);
            return user;
        } catch(err) {
            console.log(`UserService.delete(${id}, ${JSON.stringify(userDetails)}): err`, {err});
            return null;
        }
    }

    async delete(id) {
        try {
            const res = await User.deleteOne({user_id: id});
            return true;
        } catch(err) {
            console.log(`UserService.delete(${id}): err`, {err});
            return false;
        }
    }

    async findAll() {
        try {
            const res = await User.find();
            return res;
        } catch(err) {
            console.log(`UserService.findAll(): err`, {err});
            return null;
        }
    }

    async findById(id) {
        try {
            const res = await User.findOne({user_id: id});
            return res;
        } catch(err) {
            console.log(`UserService.findAll(${id}): err`, {err});
            return null;
        }
    }
}

module.exports = new UserService();
