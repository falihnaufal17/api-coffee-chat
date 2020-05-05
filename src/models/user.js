const connection = require('../configs/db');

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO users SET ? `, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    login: (username) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE username = ?`, username, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    updateToken: (username, token) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE users SET token = ? WHERE username = ?`, [token, username], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    logout: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE users SET token = '' WHERE id = ?`, id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
}