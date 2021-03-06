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
            const user = await Model.getOne(req.body.email);
            if (user) {
                return res.status(409).send({
                    status: 409,
                    message: 'user already exists',
                });
            }

            const isAdmin = req.body.isadmin === process.env.ADMIN_KEY;

            const newUser = await Model.create(
                req.body.firstname,
                req.body.lastname,
                req.body.username,
                req.body.othernames,
                req.body.email,
                password,
                req.body.phone,
                isAdmin,
            );
            const userToken = Helper.generateToken(newUser.id, newUser.isadmin);
            return res.status(201).send({
                status: 201,
                data: [{
                    token: userToken,
                    user: {
                        id: newUser.id,
                        firstname: newUser.firstname,
                        lastname: newUser.lastname,
                        username: newUser.username,
                    },
                }],
            });
        } catch (error) {
            return res.status(500).send({
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

            if (!user) {
                return res.status(404).send({
                    status: 404,
                    message: 'incorrect credentials',
                });
            }

            const match = await Helper.compare(req.body.password, user.password);
            if (!match) {
                return res.status(400).send({ message: 'incorrect crdentials' });
            }
            const userToken = Helper.generateToken(user.id, user.isadmin);
            return res.status(200).send({
                status: 200,
                data: [{
                    token: userToken,
                    // eslint-disable-next-line object-shorthand
                    user: {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                    },
                }],
            });
        } catch (error) {
            return res.status(500).send({
                message: error,
            });
        }
    }

    static async getUser(req, res) {
        try {
            const id = req.userId;
            const user = await Model.getById(id);

            return res.status(200).send({
                status: 200,
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    status: user.isadmin,
                },
            });
        } catch (error) {
            return res.status(500).send({
                message: error,
            });
        }
    }
}

export default User;
