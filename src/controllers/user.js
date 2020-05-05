const userModel = require('../models/user');
const miscHelper = require('../helpers/helpers');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        let input = req.body;
        const salt = miscHelper.generateSalt(18)
        const passwordHash = miscHelper.setPassword(input.password, salt);
        console.log(input.password);
        const data = {
            fullname: input.fullname,
            phone: input.phone,
            username: input.username,
            password: passwordHash.passwordHash,
            salt: passwordHash.salt,
            token: '',
            email: input.email,
            alamat: input.alamat,
            gender: input.gender,
            birth_place: input.birth_place,
            birth_date: input.birth_date,
            age: input.age,
            created_at: new Date(),
            updated_at: new Date()
        }

        userModel.register(data)
            .then(() => {
                console.log(data)
                miscHelper.response(res, data, 201)
            })
            .catch((error) => {
                console.log(error)
                miscHelper.response(res, error, 400)
            })
    },
    login: (req, res) => {
        const input = req.body;
        const username = input.username;
        const password = input.password;

        if (username === '' || password === '') {
            miscHelper.response(res, 'username and password must filled!', 400, 'validation error')
        } else {
            userModel.login(username)
                .then((result) => {
                    const dataUser = result[0];
                    const usePassword = miscHelper.setPassword(password, dataUser.salt).passwordHash

                    if (usePassword === dataUser.password) {
                        dataUser.token = jwt.sign({
                            id: dataUser.id,
                            fullname: dataUser.fullname,
                            phone: dataUser.phone,
                            username: dataUser.username,
                            email: dataUser.email,
                            alamat: dataUser.alamat,
                            gender: dataUser.gender,
                            birth_place: dataUser.birth_place,
                            birth_date: dataUser.birth_date,
                            age: dataUser.age,
                            created_at: dataUser.created_at,
                            updated_at: dataUser.updated_at
                        }, process.env.SECRET_KEY, { expiresIn: '30d' })

                        const token = dataUser.token;
                        delete dataUser.salt;
                        delete dataUser.password

                        userModel.updateToken(username, token)
                            .then((resultToken) => {
                                return miscHelper.response(res, resultToken, 200)
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                        return miscHelper.response(res, dataUser, 200)
                    } else {
                        return miscHelper.response(res, null, 403, 'Wrong Password!')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    logout: (req, res) => {
        const id = req.params.id

        userModel.logout(id)
            .then(() => {
                miscHelper.response(res, 'anda sudah logout', 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}