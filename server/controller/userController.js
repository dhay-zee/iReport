// User controller

import Model from '../model/userModel';
import * as Helper from './helper';


/**
 * @class User
 */
class User {
    /**
     * @async createUser
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async createUser(req, res) {
        const password = Helper.encryptedPassword(req.body.password);
        try {
            const newUser = await Model.create(
                req.body.firstname,
                req.body.lasttname,
                req.body.othernames,
                req.body.email,
                password,
                req.body.phone,
            );
            const userToken = Helper.generateToken(newUser.id);
            return res.status(201).send({
                status: 201,
                data: [{
                    token: userToken,
                    user: newUser,
                }],
            });
        } catch (error) {
            return res.status(404).send({
                message: error,
            });
        }
    }

    /**
     * @async login
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async login(req, res) {
        try {
            const user = await Model.getOne(req.body.email);
            const match = await Helper.compare(req.body.password, user.password);
            if (!match) {
                return res.status(400).send({ message: 'incorrect crdentials' });
            }
            const userToken = Helper.generateToken(user.id);
            return res.status(200).send({
                status: 200,
                data: [{
                    token: userToken,
                    // eslint-disable-next-line object-shorthand
                    user: user,
                }],
            });
        } catch (error) {
            return res.status(404).send({
                message: error,
            });
        }
    }
}

export default User;